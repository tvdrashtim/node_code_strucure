import express from "express";
import { DepartmentController } from "../controllers/index.js";
import { departmentValidation } from "../validations/index.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router
  .post(
    "/",
    validate(departmentValidation.createdepartment),
    DepartmentController.createDepartment
  )
  .get(`/:id`, DepartmentController.getDepartmentById);

export default router;
