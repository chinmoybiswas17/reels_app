import { Connection } from "mongoose";

declare global {
  var mongoose: {
    // connect(
    //   MONGODB_URI: any,
    //   opts: { bufferCommands: boolean; maxPoolSize: number }
    // ): unknown;
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
export {};
