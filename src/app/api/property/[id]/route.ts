import { prisma } from "@/lib/prisma"; // Assuming you're using Prisma for database access

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Capture the dynamic `id` from the URL

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: Number(id), // Convert `id` to number for querying the database
      },
      include: {
        images: true,  // Include related images
        amenities: { include: { amenity: true } }, // Include amenities
        property_category: true, // Include property category
        admin: true, // Include admin who posted the property
      },
    });

    if (!property) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Property not found',
          data: null
        }),
        { status: 404 }
      );
    }

    // Extract only the `image_url` from each image object and return as an array
    const imageUrls = property.images.map((image) => image.image_url);

    // Extract only the `name` from each amenity and return as an array
    const amenityNames = property.amenities.map((amenityObj) => amenityObj.amenity.name);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...property,
          images: imageUrls,
          amenities: amenityNames,
        },
        message: "Fetched single property successfully"
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
        data: null
      }),
      { status: 500 }
    );
  }
}
