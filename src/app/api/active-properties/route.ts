// Show all active properties
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const property_type = url.searchParams.get("type");
    const property_catg_ids = url.searchParams.get("property_catg_ids");
    const keyword_id = url.searchParams.get("keyword");
    const amenitiesParam = url.searchParams.get("amenities");
    const location = url.searchParams.get("location");
    const bedrooms = url.searchParams.get("bedrooms");
    const bathrooms = url.searchParams.get("bathrooms");
    const minSqft = url.searchParams.get("minSqft");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const featured = url.searchParams.get("featured");

    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "10");
    const sortBy = url.searchParams.get("sortBy");
    const priceRange = url.searchParams.get("priceRange");

    const where: any = { status: "ACTIVE" }; // only active properties

    if (property_type) where.type = property_type;
    if (featured !== null) where.featured = featured === "true";
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }
    
    // Multi-category support
    if (property_catg_ids) {
      const ids = JSON.parse(property_catg_ids).map(Number);
      if (ids.length > 0) {
        where.property_catg_id = { in: ids };
      }
    }

    // Keyword filter - single keyword ID
    if (keyword_id) {
      where.keyword_id = Number(keyword_id);
    }

    // Location filter
    if (location) {
      where.location = { contains: location };
    }

    // Bedrooms & Bathrooms
    if (bedrooms) where.bedrooms = Number(bedrooms);
    if (bathrooms) where.bathrooms = Number(bathrooms);

    // Min Sqft - using area_sqft as per schema
    if (minSqft) where.area_sqft = { gte: Number(minSqft) };

    // Price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    // Determine orderBy based on sort parameters
    // Price range takes priority over sortBy
    let orderBy: any = { created_at: "desc" }; // default

    if (priceRange) {
      if (priceRange === "low-high") {
        orderBy = { price: "asc" };
      } else if (priceRange === "high-low") {
        orderBy = { price: "desc" };
      }
    } else if (sortBy) {
      switch (sortBy) {
        case "0": // Default - newest first
          orderBy = { created_at: "desc" };
          break;
        case "1": // A-Z
          orderBy = { title: "asc" };
          break;
        case "2": // Oldest
          orderBy = { created_at: "asc" };
          break;
        default:
          orderBy = { created_at: "desc" };
      }
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
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get the total number of properties to calculate the total pages
    const totalProperties = await prisma.property.count({
      where,
    });

    // Filter by amenities (all given IDs)
    if (amenitiesParam) {
      const amenityIds: number[] = JSON.parse(amenitiesParam);
      properties = properties.filter((property: { amenities: { amenity_id: number }[] }) => {
        const propertyAmenityIds: number[] = property.amenities.map((a: { amenity_id: number }) => a.amenity_id);
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
