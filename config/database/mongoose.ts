import mongoose, { Mongoose } from "mongoose";

const connectionString = process.env.MONGO_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!connectionString) throw new Error("Missing MongoDB Url");

  cached.promise =
    cached.promise ||
    mongoose.connect(connectionString, {
      dbName: "LoopSocial",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  console.log("Database connected");

  return cached.conn;
};
