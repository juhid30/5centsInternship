import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
