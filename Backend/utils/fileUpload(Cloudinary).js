import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
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
    console.log(error);
    fs.unlinkSync(localFilePath);
  }
};
