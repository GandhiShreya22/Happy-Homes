import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.property_Category.findMany({
      orderBy: { created_at: "desc" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Get categories error:", error);
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
