import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const Response = await cloudinary.uploader.upload(localFilePath, {
      type: "asset",
    });
    if (Response) {
      console.log("File Uploaded At : ", Response.url);
      fs.unlinkSync(localFilePath);
      return Response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
  }
};
