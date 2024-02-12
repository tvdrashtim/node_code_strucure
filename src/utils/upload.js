import path from "path";
import { v4 as uuidv4 } from "uuid";
import { StatusCode } from "../services/index.js";
import Resize from "./fileResize.js";

export const ProfileImage = async (res, imageData, folder_name) => {
  try {
    const profileImage = `${uuidv4()}.${
      imageData[0]?.originalname?.split(".")[1]
    }`;

    const currentModuleUrl = import.meta.url;
    const __dirname = path.dirname(new URL(currentModuleUrl).pathname);

    const imagePath = path.join(__dirname, `../uploads/${folder_name}`);
    const imageThumbsPath = path.join(
      __dirname,
      `../uploads/${folder_name}/thumb`
    );

    const imageResizer = new Resize(imagePath);
    const thumbResizer = new Resize(imageThumbsPath);

    // Save thumbnail image
    await thumbResizer.saveThumbs(imageData[0].buffer, profileImage);

    // Save original image
    await imageResizer.save(imageData[0].buffer, profileImage);

    return profileImage;
  } catch (error) {
    const message = error.message;
    return StatusCode.sendBadRequestResponse(res, message);
  }
};
