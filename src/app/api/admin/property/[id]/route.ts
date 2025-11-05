// update property
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "node:stream";
import { IncomingMessage } from "http";
import { getUploadDir } from "@/lib/getUploadDir";

export const config = {
  api: {
    bodyParser: false,
  },
};

// const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");
const UPLOAD_ROOT = getUploadDir();
if (!fs.existsSync(UPLOAD_ROOT)) fs.mkdirSync(UPLOAD_ROOT, { recursive: true });

/** Convert Next.js Request -> IncomingMessage for formidable */
async function toNodeRequest(req: Request): Promise<IncomingMessage> {
  const buffer = Buffer.from(await req.arrayBuffer());
  const stream = Readable.from(buffer);
  const nodeReq = Object.assign(stream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
  });
  return nodeReq as unknown as IncomingMessage;
}

/** Parse multipart form with formidable */
function parseForm(req: IncomingMessage): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    multiples: true,
    uploadDir: UPLOAD_ROOT,
    keepExtensions: true,
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

/** Parse amenities (array or JSON string) */
function parseAmenityField(field: any): number[] {
  if (!field) return [];
  try {
    if (Array.isArray(field)) {
      return field.flatMap((val) => {
        if (typeof val === "string" && val.startsWith("[")) {
          return JSON.parse(val).map((id: any) => Number(id));
        }
        return [Number(val)];
      }).filter((n) => !isNaN(n));
    }
    if (typeof field === "string") {
      if (field.startsWith("[")) return JSON.parse(field).map((id: any) => Number(id));
      if (field.includes(",")) return field.split(",").map((x) => Number(x.trim()));
      const n = Number(field);
      return !isNaN(n) ? [n] : [];
    }
    const n = Number(field);
    return !isNaN(n) ? [n] : [];
  } catch {
    return [];
  }
}

/** Parse removedImages (stringified array or CSV) */
function parseRemovedImagesField(field: any): string[] {
  if (!field) return [];
  try {
    if (Array.isArray(field)) return field.flat();
    if (typeof field === "string") {
      if (field.startsWith("[")) return JSON.parse(field);
      if (field.includes(",")) return field.split(",").map((x) => x.trim());
      return [field];
    }
    return [];
  } catch {
    return [];
  }
}

/** Slug helpers */
function generateSlug(text?: string) {
  if (!text) return "";
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function ensureUniqueSlug(desiredSlug: string, propertyId: number) {
  let slug = desiredSlug;
  let counter = 0;
  while (true) {
    const existing = await prisma.property.findFirst({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === propertyId) return slug;
    counter++;
    slug = `${desiredSlug}-${counter}`;
  }
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const propertyId = Number(params.id);
    if (isNaN(propertyId))
      return new Response(JSON.stringify({ success: false, message: "Invalid property ID" }), { status: 400 });

    const existingProperty = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!existingProperty)
      return new Response(JSON.stringify({ success: false, message: "Property not found" }), { status: 404 });

    const nodeReq = await toNodeRequest(req);
    const { fields, files } = await parseForm(nodeReq);

    const {
      title,
      slug,
      property_catg_id,
      type,
      price,
      location,
      address,
      bedrooms,
      bathrooms,
      area_sqft,
      description,
      featured,
      status,
      amenities,
      removedImages,
    } = fields;

    // Slug logic
    let finalSlug = existingProperty.slug;
    if (slug || title) {
      const baseSlug = slug ? String(slug) : generateSlug(String(title));
      finalSlug = await ensureUniqueSlug(baseSlug, propertyId);
    }

    // Update main property record
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        title: title ? String(title) : existingProperty.title,
        slug: finalSlug,
        property_catg_id: property_catg_id ? Number(property_catg_id) : existingProperty.property_catg_id,
        type: type ? String(type) : existingProperty.type,
        price: price ? Number(price) : existingProperty.price,
        location: location ? String(location) : existingProperty.location,
        address: address ? String(address) : existingProperty.address,
        bedrooms: bedrooms ? Number(bedrooms) : existingProperty.bedrooms,
        bathrooms: bathrooms ? Number(bathrooms) : existingProperty.bathrooms,
        area_sqft: area_sqft ? Number(area_sqft) : existingProperty.area_sqft,
        description: description ? String(description) : existingProperty.description,
        featured: featured === "true" || featured === true ? true : existingProperty.featured,
        status: status === "ACTIVE" || status === "INACTIVE" ? (status as "ACTIVE" | "INACTIVE") : existingProperty.status,
      },
    });

    // --- Handle amenities
    if (amenities) {
      const amenityIds = parseAmenityField(amenities);
      await prisma.property_Amenities.deleteMany({ where: { property_id: propertyId } });
      if (amenityIds.length) {
        await prisma.property_Amenities.createMany({
          data: amenityIds.map((id) => ({ property_id: propertyId, amenity_id: id })),
        });
      }
    }

    // --- Handle removed images
    const removed = parseRemovedImagesField(removedImages);
    if (removed.length) {
      await prisma.property_Image.deleteMany({
        where: { property_id: propertyId, image_url: { in: removed } },
      });

      removed.forEach((url) => {
        try {
          const relPath = url.startsWith("/") ? url.slice(1) : url;
          const absPath = path.join(process.cwd(), relPath);
          if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
        } catch (err) {
          console.error("Image delete error:", err);
        }
      });
    }

    // --- Handle new uploaded images
    if (files?.images) {
      const propertyDir = path.join(UPLOAD_ROOT, "properties", String(propertyId));
      if (!fs.existsSync(propertyDir)) fs.mkdirSync(propertyDir, { recursive: true });

      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];

      // Check how many images currently exist in DB (after deletions)
      const existingImagesCount = await prisma.property_Image.count({
        where: { property_id: propertyId },
      });

      const imageData = imageFiles.map((file: any, index: number) => {
        const original = file.originalFilename || "image.jpg";
        const ext = path.extname(original);
        const fileName = `${Date.now()}_${index}${ext}`;
        const dest = path.join(propertyDir, fileName);
        try {
          fs.renameSync(file.filepath, dest);
          return {
            property_id: propertyId,
            image_url: `/uploads/properties/${propertyId}/${fileName}`,
            // If no existing images, first new one becomes primary
            is_primary: existingImagesCount === 0 && index === 0,
          };
        } catch (err) {
          console.error("File move error:", err);
          return null;
        }
      }).filter(Boolean);

      if (imageData.length) await prisma.property_Image.createMany({ data: imageData });
    }

    // --- Return updated property
    const propertyWithRelations = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
        property_category: true,
        admin: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Property updated successfully",
        data: propertyWithRelations,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Property update error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error", data: null }),
      { status: 500 }
    );
  }
};
