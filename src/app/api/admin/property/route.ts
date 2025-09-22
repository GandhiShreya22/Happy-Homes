// Add new property
import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import { IncomingMessage } from "http";
import fs from "fs";
import path from "path";

// Important: disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "/public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Convert Next.js Request -> IncomingMessage for formidable
async function toNodeRequest(req: Request): Promise<IncomingMessage> {
  const { Readable } = await import("stream");
  const body = Readable.from(Buffer.from(await req.arrayBuffer()));
  const nodeReq = Object.assign(body, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
  });
  return nodeReq as unknown as IncomingMessage;
}

// Helper to parse FormData with formidable
function parseForm(req: IncomingMessage): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

// Utility: unwrap formidable field (handles string | string[])
function getField<T = string>(field: any, fallback: T | null = null): T | null {
  if (Array.isArray(field)) return (field[0] as T) ?? fallback;
  if (field !== undefined && field !== null) return field as T;
  return fallback;
}

export const POST = async (req: Request) => {
  try {
    // req is a Next.js Request object, not IncomingMessage
    // Convert it so formidable can read the stream
    const nodeReq = await toNodeRequest(req);
    const { fields, files } = await parseForm(nodeReq);

    // Extract + unwrap fields
    const title = getField<string>(fields.title);
    const slug = getField<string>(fields.slug);
    const property_catg_id = getField<string>(fields.property_catg_id);
    const type = getField<string>(fields.type);
    const price = getField<string>(fields.price);
    const location = getField<string>(fields.location);
    const address = getField<string>(fields.address);
    const bedrooms = getField<string>(fields.bedrooms);
    const bathrooms = getField<string>(fields.bathrooms);
    const area_sqft = getField<string>(fields.area_sqft);
    const description = getField<string>(fields.description);
    const featured = getField<string | boolean>(fields.featured);
    const status = getField<string>(fields.status);
    const admin_id = getField<string>(fields.admin_id);
    const amenities = fields.amenities;

    // Validation
    if (!title || !price || !location || !address) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields",
          data: null,
        }),
        { status: 400 }
      );
    }

    // Create property
    let newProperty;
    try {
      newProperty = await prisma.property.create({
        data: {
          title,
          slug,
          property_catg_id: property_catg_id ? Number(property_catg_id) : null,
          type,
          price: Number(price),
          location,
          address,
          bedrooms: bedrooms ? Number(bedrooms) : null,
          bathrooms: bathrooms ? Number(bathrooms) : null,
          area_sqft: area_sqft ? Number(area_sqft) : null,
          description: description ?? "",
          featured: featured === "true" || featured === true,
          status:
            status === "ACTIVE" || status === "INACTIVE"
              ? (status as "ACTIVE" | "INACTIVE")
              : "ACTIVE",
          admin_id: admin_id ? Number(admin_id) : null,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002" && err.meta?.target?.includes("slug")) {
        return new Response(JSON.stringify(
          { success: false, message: "Slug already exists. Please use a different title.", data: null }),
          { status: 400 }
        );
      }
      throw err; // rethrow other errors
    }

    // Save amenities
    if (amenities) {
      let amenityIds: number[] = [];

      try {
        if (typeof amenities === "string") {
          amenityIds = JSON.parse(amenities).map((id: any) => Number(id));
        } else if (Array.isArray(amenities)) {
          amenityIds = amenities.flatMap((val: any) => {
            if (typeof val === "string" && val.startsWith("[")) {
              return JSON.parse(val).map((id: any) => Number(id));
            }
            return Number(val);
          });
        }
      } catch (parseErr) {
        console.error("Error parsing amenities:", parseErr);
      }

      // Filter out NaN
      amenityIds = amenityIds.filter((id) => !isNaN(id));

      if (amenityIds.length > 0) {
        await prisma.property_Amenities.createMany({
          data: amenityIds.map((id) => ({
            property_id: newProperty.id,
            amenity_id: id,
          })),
        });
      }
    }

    // Handle images
    if (files.images) {
      const propertyDir = path.join(uploadDir, `properties/${newProperty.id}`);
      if (!fs.existsSync(propertyDir)) fs.mkdirSync(propertyDir, { recursive: true });

      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      const imageData = imageFiles.map((file: any, index: number) => {
        const fileExt = path.extname(file.originalFilename || file.filepath);
        const fileName = `${Date.now()}_${index}${fileExt}`;
        const destPath = path.join(propertyDir, fileName);
        try {
          fs.renameSync(file.filepath, destPath);
        } catch (moveErr) {
          console.error("File move error:", moveErr);
        }

        return {
          property_id: newProperty.id,
          image_url: `/uploads/properties/${newProperty.id}/${fileName}`,
          is_primary: index === 0
        };
      });

      if (imageData.length > 0) {
        await prisma.property_Image.createMany({ data: imageData });
      }
    }

    // Return property with relations
    const propertyWithRelations = await prisma.property.findUnique({
      where: { id: newProperty.id },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
        property_category: true,
      },
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Property added successfully",
      data: propertyWithRelations
    }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
      data: null
    }), { status: 500 });
  }
};
