import mongoose from "mongoose";

export const connectDB = async (DBName) => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DBName}`
    );

    if (connection)
      console.log("DB Connected at : ", connectionInstance.connection.host);
  } catch (error) {
    console.error("Error : ", error, message);
  }
};
