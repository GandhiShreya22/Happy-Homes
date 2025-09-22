import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: messages,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch contact messages error:", error);
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
