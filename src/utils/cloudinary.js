import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
   try {
      if (!localFilePath) return null;

      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "image",
      });

      fs.unlinkSync(localFilePath);
      return response;
   } catch (error) {
      console.log(error);
      fs.unlinkSync(localFilePath);
      return null;
   }
};
const deleteCloudinaryImage = async (url) => {
   try {
      if (!url) return null;

      const id = getPublicId(url).replace("/undefined", "")
      const response = await cloudinary.uploader.destroy(id, {
         resource_type: "image",
      });

      return response;
   } catch (error) {
      console.log(error);
      return null;
   }
};

function getPublicId(secureUrl) {
   const pattern = /\/upload\/v\d+\/([^\/]+)\./;

   const match = secureUrl.match(pattern);

   if (match) {
      const publicId = match[1] + "/" + match[2];
      return publicId;
   } else {
      return null;
   }
}

export { uploadOnCloudinary, deleteCloudinaryImage };
