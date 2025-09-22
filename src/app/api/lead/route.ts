// store lead
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { property_id, name, email, phone, message } = body;

    // Validate required fields
    if (!property_id || !name || !email || !phone) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields",
          data: null,
        }),
        { status: 400 }
      );
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        property_id: Number(property_id),
        name,
        email,
        phone,
        message: message || null,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead submitted successfully",
        data: lead,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
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
