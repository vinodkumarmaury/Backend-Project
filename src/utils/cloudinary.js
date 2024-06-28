import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Check if localFilePath exists
    if (!localFilePath) {
      throw new Error("Local file path is missing");
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Delete the locally saved temporary file
    fs.unlinkSync(localFilePath);

    console.log("File uploaded successfully:", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Handle specific errors or log them for further investigation
    if (error.message.includes("File not found")) {
      console.error("Local file not found:", localFilePath);
    }

    // Clean up the local file in case of upload failure
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
    }

    return null;
  }
};

export { uploadOnCloudinary };
