import mongoose, { Connection } from "mongoose";

const MongoDB_URI = process.env.MONGODB_URI!;

if (!MongoDB_URI) {
  throw new Error("Please define MONGODB uri in the env file");
}

let cached: {
  conn: Connection | null;
  promise: Promise<Connection> | null;
} = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MongoDB_URI, opts)
      .then((m) => m.connection);
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Database connection error:", error);
    cached.promise = null;
    throw new Error("Check database file");
  }

  return cached.conn;
}

//This is mongoose file
