import express from "express";
import { OrganizationController } from "../controllers/index.js";
import { organizationValidation } from "../validations/index.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router
  .post(
    "/",
    validate(organizationValidation.createOrganization),
    OrganizationController.createOrganization
  )
  .get(`/:id`, OrganizationController.getOrganizationById);

export default router;
