import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
