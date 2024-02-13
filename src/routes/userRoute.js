import express from "express";
import { UserController } from "../controllers/index.js";
import { userValidation } from "../validations/index.js";
import validate from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router
  .post(
    "/create",
    upload.fields([{ name: "profile_photo", maxCount: 1 }]),
    validate(userValidation.createUser),
    UserController.createUser
  )
  .post("/login", validate(userValidation.loginUser), UserController.loginUser)
  .get("/", auth(), UserController.getUser)
  .patch(
    "/",
    auth(),
    upload.fields([{ name: "profile_photo", maxCount: 1 }]),
    validate(userValidation.updateUser),
    UserController.updateUser
  )
  .delete(`/:id`, UserController.deleteUser)
  .get("/details", UserController.getUserDetails)
  .get("/:id/organization", UserController.getUserWithOrganizations);

export default router;
