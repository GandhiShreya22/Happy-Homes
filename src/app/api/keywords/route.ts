import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const keywords = await prisma.keyword.findMany({
      orderBy: { created_at: "desc" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Keywords fetched successfully",
        data: keywords,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Get keywords error:", error);
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
