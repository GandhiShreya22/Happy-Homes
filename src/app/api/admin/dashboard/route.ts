// Dashboard stats and latest leads
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Count total properties
    const totalProperties = await prisma.property.count();

    // Count active properties (assuming `status: "active"`)
    const activeProperties = await prisma.property.count({
      where: { status: "ACTIVE" }
    })

    // Count total leads
    const totalLeads = await prisma.lead.count();

    // Fetch latest 5 leads
    const latestLeads = await prisma.lead.findMany({
      orderBy: { submitted_at: "desc" },
      take: 5,
      include: {
        property: {
          select: { id: true, title: true, slug: true }
        }
      }
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalProperties,
        activeProperties,
        totalLeads,
        latestLeads
      }
    }), { status: 200 });
    
  } catch (error) {
    console.error("Dashboard API error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
      data: null
    }), { status: 500 });
  }
}
