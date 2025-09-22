// All Property listing for admin panne;
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const status = searchParams.get("status"); // optional filter
    const propertyType = searchParams.get("type"); // optional filter
    const categoryId = searchParams.get("categoryId"); // optional
    const q = searchParams.get("q"); // search query
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};

    if (status) where.status = status as "ACTIVE" | "INACTIVE";
    if (propertyType) where.type = propertyType;
    if (categoryId) where.property_catg_id = Number(categoryId);

    // Search filter
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
        { address: { contains: q, mode: "insensitive" } },
        { slug: { contains: q, mode: "insensitive" } },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    // Fetch properties
    const properties = await prisma.property.findMany({
      where,
      include: {
        images: true,
        property_category: true,
        admin: { select: { id: true, email: true } },
        amenities: { include: { amenity: true } }
      },
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Count for pagination
    const total = await prisma.property.count({ where });

    return new Response(JSON.stringify({
      success: true,
      message: "Admin properties fetched successfully",
      data: {
        properties,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
      }
    }), { status: 200 });

  } catch (error) {
    console.error("Admin property list error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
      data: null
    }), { status: 500 });
  }
}
