import { v2 as cloudinary } from "cloudinary";

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Failed to delete file from Cloudinary: ", error);
    throw error;
  }
};
