// List leads
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const property_id = url.searchParams.get("property_id");
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "20");

    const where: any = {};
    if (property_id) where.property_id = Number(property_id);

    // Fetch leads
    const leads = await prisma.lead.findMany({
      where,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { submitted_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Total count
    const total = await prisma.lead.count({ where });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Leads fetched successfully",
        data: {
          leads,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch leads error:", error);
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
