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
  .get(`/:id`, OrganizationController.getOrganizationById)
  .patch(
    `/:id`,
    validate(organizationValidation.updateOrganization),
    OrganizationController.updateOrganizationById
  )
  .post(
    "/user",
    validate(organizationValidation.createOrganizationUser),
    OrganizationController.createOrganizationUser
  )
  .get("/", OrganizationController.getOrganizationUsers);

export default router;
