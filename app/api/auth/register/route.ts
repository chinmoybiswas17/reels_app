import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}

// const res = fetch("/api/auth/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ email, password }),
// });

// res.json();
