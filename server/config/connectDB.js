import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to the database");
  } catch (err) {
    console.log("Error connecting to the database: ", err.message);
  }
};
