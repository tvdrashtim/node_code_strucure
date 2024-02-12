import { OrganizationService, StatusCode } from "../services/index.js";

//create organization
const createOrganization = async (req, res) => {
  try {
    let organizationData = req.body;

    const existingOganization = await OrganizationService.getOrganization(
      res,
      organizationData.organization_name
    );

    if (!existingOganization) {
      const data = await OrganizationService.createOrganization(
        res,
        organizationData
      );

      const message = "Organization created successfully.";
      return StatusCode.sendCreateResponse(res, message, data);
    } else {
      const message = "Organization already exists with this name.";
      return StatusCode.sendBadRequestResponse(res, message);
    }
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization by id
const getOrganizationById = async (req, res) => {
  try {
    const organization_id = req.params.id;
    const data = await OrganizationService.getOrganizationById(
      res,
      organization_id
    );

    const message = "Organization retrieved successfully.";
    return StatusCode.sendCreateResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const OrganizationController = {
  createOrganization,
  getOrganizationById,
};
