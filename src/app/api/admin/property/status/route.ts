// Update property status
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { property_id, status } = body;

    // Validate input
    if (!property_id || !status || !["ACTIVE", "INACTIVE"].includes(status)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid property_id or status",
          data: null,
        }),
        { status: 400 }
      );
    }

    // Update property status
    const updatedProperty = await prisma.property.update({
      where: { id: Number(property_id) },
      data: { status: status as "ACTIVE" | "INACTIVE" },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
        property_type: true,
        admin: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Property status updated to ${status}`,
        data: updatedProperty,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Update property status error:", error);
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
