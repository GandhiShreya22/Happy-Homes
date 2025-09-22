import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({
        success: false,
        message: "Category name is required",
        data: null
      }), { status: 400 });
    }

    // Check if category already exists
    const existing = await prisma.property_Category.findUnique({
      where: {
        name: name.toLowerCase(), // This ensures case-insensitive lookup.
      },
    });

    if (existing) {
      return new Response(JSON.stringify({
        success: true,
        message: "Category already exists",
        data: existing
      }), { status: 200 });
    }

    const newCategory = await prisma.property_Category.create({
      data: { name }
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Category created successfully",
      data: newCategory
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
