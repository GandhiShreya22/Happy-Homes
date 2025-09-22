// Update property
import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const PATCH = async (req: Request) => {
  const uploadDir = path.join(process.cwd(), "/public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  return new Promise<Response>((resolve) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return resolve(
          new Response(
            JSON.stringify({
              success: false,
              message: "Error parsing form",
              data: null,
            }),
            { status: 500 }
          )
        );
      }

      try {
        const {
          property_id,
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
        } = fields;

        if (!property_id) {
          return resolve(
            new Response(
              JSON.stringify({
                success: false,
                message: "property_id is required",
                data: null,
              }),
              { status: 400 }
            )
          );
        }

        const existingProperty = await prisma.property.findUnique({
          where: { id: Number(property_id) },
        });

        if (!existingProperty) {
          return resolve(
            new Response(
              JSON.stringify({
                success: false,
                message: "Property not found",
                data: null,
              }),
              { status: 404 }
            )
          );
        }

        // Update main property details
        const updatedProperty = await prisma.property.update({
          where: { id: Number(property_id) },
          data: {
            title: (title as string) || existingProperty.title,
            slug: finalSlug,
            property_catg_id: property_catg_id
              ? Number(property_catg_id)
              : existingProperty.property_catg_id,
            type: (type as string) || existingProperty.type,
            price: price ? Number(price) : existingProperty.price,
            location: (location as string) || existingProperty.location,
            address: (address as string) || existingProperty.address,
            bedrooms: bedrooms
              ? Number(bedrooms)
              : existingProperty.bedrooms,
            bathrooms: bathrooms
              ? Number(bathrooms)
              : existingProperty.bathrooms,
            area_sqft: area_sqft
              ? Number(area_sqft)
              : existingProperty.area_sqft,
            description:
              (description as string) || existingProperty.description,
            featured: featured === "true" || featured === true,
            status:
              status === "ACTIVE" || status === "INACTIVE"
                ? (status as "ACTIVE" | "INACTIVE")
                : existingProperty.status,
          },
        });

        // Update amenities if provided
        if (amenities) {
          let amenityIds: number[] = [];

          try {
            if (typeof amenities === "string") {
              amenityIds = JSON.parse(amenities);
            } else if (Array.isArray(amenities)) {
              amenityIds = amenities.map((id: any) => Number(id));
            }
          } catch (parseErr) {
            console.error("Amenity parse error:", parseErr);
          }

          if (amenityIds.length > 0) {
            await prisma.property_Amenities.deleteMany({
              where: { property_id: updatedProperty.id },
            });

            const amenityData = amenityIds.map((id: number) => ({
              property_id: updatedProperty.id,
              amenity_id: id,
            }));
            await prisma.property_Amenities.createMany({ data: amenityData });
          }
        }

        // Update images only if new files are uploaded
        if (files.images) {
          const propertyDir = path.join(
            uploadDir,
            `properties/${updatedProperty.id}`
          );
          if (!fs.existsSync(propertyDir)) {
            fs.mkdirSync(propertyDir, { recursive: true });
          }

          const imageFiles = Array.isArray(files.images)
            ? files.images
            : [files.images];

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
              property_id: updatedProperty.id,
              image_url: `/uploads/properties/${updatedProperty.id}/${fileName}`,
              is_primary: index === 0,
            };
          });

          await prisma.property_Image.createMany({ data: imageData });
        }

        // Return property with relations
        const propertyWithRelations = await prisma.property.findUnique({
          where: { id: updatedProperty.id },
          include: {
            images: true,
            amenities: { include: { amenity: true } },
            property_category: true,
            admin: true,
          },
        });

        return resolve(
          new Response(
            JSON.stringify({
              success: true,
              message: "Property updated successfully",
              data: propertyWithRelations,
            }),
            { status: 200 }
          )
        );
      } catch (error) {
        console.error(error);
        return resolve(
          new Response(
            JSON.stringify({
              success: false,
              message: "Internal server error",
              data: null,
            }),
            { status: 500 }
          )
        );
      }
    });
  });
};
