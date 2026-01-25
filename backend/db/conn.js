import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const DB = process.env.DB;

    if (!DB) {
      throw new Error("DB connection string is missing in environment variables");
    }

    await mongoose.connect(DB);

    console.log("✅ Database Connected Successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};
