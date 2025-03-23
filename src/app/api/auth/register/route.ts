import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../../models/User";
import { connectDB } from "../../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password and store user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
