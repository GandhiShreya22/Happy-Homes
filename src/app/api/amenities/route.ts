import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { created_at: "desc" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Amenities fetched successfully",
        data: amenities,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Get amenities error:", error);
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
