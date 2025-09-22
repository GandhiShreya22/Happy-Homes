// Admin login
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    // Find admin
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid email or password",
        data: null
      }), { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password.trim(), admin.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid email or password",
        data: null
      }), { status: 401 });
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { last_login: new Date() },
    });

    // Generate token (for demo — replace with JWT for production)
    const token = `admin-${admin.id}-${Date.now()}`;

    // Set cookie
    const headers = new Headers();
    headers.append("Set-Cookie", `admin_token=${token}; HttpOnly; Path=/; Max-Age=${rememberMe ? 60*60*24*30 : 60*60*24}; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`);

    return new Response(JSON.stringify({
      success: true,
      message: "Admin logged in success",
      data: { adminId: admin.id, email: admin.email }
    }), { status: 200, headers });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
      data: null
    }), { status: 500 });
  }
}
