// app/api/admin/amenities/route.ts
import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({
        success: false,
        message: "Amenity name is required",
        data: null
      }), { status: 400 });
    }

    // Check if amenity already exists
    const existing = await prisma.amenity.findUnique({
      where: {
        name: name.toLowerCase(), // This ensures case-insensitive lookup.
      },
    });

    if (existing) {
      return new Response(JSON.stringify({
        success: true,
        message: "Amenity already exists",
        data: existing
      }), { status: 200 });
    }

    const newAmenity = await prisma.amenity.create({
      data: { name }
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Amenity created successfully",
      data: newAmenity
    }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
      data: null
    }), { status: 500 });
  }
};
