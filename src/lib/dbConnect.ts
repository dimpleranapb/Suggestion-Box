import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return; // Early exit if already connected
  }

  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
      throw new Error("MONGODB_URI environment variable is missing");
    }

    const db = await mongoose.connect(dbURI, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
