// Show all active properties
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const property_type = url.searchParams.get("type");
    const property_catg_ids = url.searchParams.get("property_catg_ids"); // <-- updated
    const amenitiesParam = url.searchParams.get("amenities");
    const location = url.searchParams.get("location");
    const bedrooms = url.searchParams.get("bedrooms");
    const bathrooms = url.searchParams.get("bathrooms");
    const minSqft = url.searchParams.get("minSqft");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");

    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "10");

    const where: any = { status: "ACTIVE" }; // only active properties

    if (property_type) where.type = property_type;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    
    // Multi-category support
    if (property_catg_ids) {
      const ids = JSON.parse(property_catg_ids).map(Number);
      if (ids.length > 0) {
        where.property_catg_id = { in: ids };
      }
    }

    // Location filter
    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    // Bedrooms & Bathrooms
    if (bedrooms) where.bedrooms = Number(bedrooms);
    if (bathrooms) where.bathrooms = Number(bathrooms);

    // Min Sqft
    if (minSqft) where.sqft = { gte: Number(minSqft) };

    // Price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    // Fetch properties
    let properties = await prisma.property.findMany({
      where,
      include: {
        images: true,
        amenities: { include: { amenity: true } },
        property_category: true,
        admin: true,
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get the total number of properties to calculate the total pages
    const totalProperties = await prisma.property.count({
      where,
    });

    // Filter by amenities (all given IDs)
    if (amenitiesParam) {
      const amenityIds = JSON.parse(amenitiesParam);
      properties = properties.filter((property) => {
        const propertyAmenityIds = property.amenities.map((a) => a.amenity_id);
        return amenityIds.every((id: number) => propertyAmenityIds.includes(id));
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Properties fetched successfully",
        data: {
          properties,
          pagination: {
            totalProperties,
            totalPages: Math.ceil(totalProperties / limit),
            currentPage: page,
            limit,
          },
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        data: null,
      }),
      { status: 500 }
    );
  }
}
