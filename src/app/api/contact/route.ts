import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, description } = body;

    // Validate required fields
    if (!name || !phone || !email || !subject || !description) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields",
          data: null,
        }),
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.create({
      data: { name, phone, email, subject, description },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message submitted successfully",
        data: message,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
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
