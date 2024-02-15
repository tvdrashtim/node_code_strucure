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
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update organization by id
const updateOrganizationById = async (req, res) => {
  try {
    const body = req.body;
    const organization_id = req.params.id;

    const data = await OrganizationService.updateOrganizationById(
      res,
      organization_id,
      body
    );

    const message = "Organization updated successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//create organization user
const createOrganizationUser = async (req, res) => {
  try {
    let organizationData = req.body;

    const existingOrganizationUser =
      await OrganizationService.getOrganizationUser(res, organizationData);

    if (!existingOrganizationUser) {
      const data = await OrganizationService.createOrganizationUser(
        res,
        organizationData
      );

      const message = "Organization user created successfully.";
      return StatusCode.sendCreateResponse(res, message, data);
    } else {
      const message = "Organization user already exists.";
      return StatusCode.sendBadRequestResponse(res, message);
    }
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization users
const getOrganizationUsers = async (req, res) => {
  try {
    const data = await OrganizationService.getDepartmentUsers(res);

    const message = "Organization users retrieved successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const OrganizationController = {
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  createOrganizationUser,
  getOrganizationUsers,
};
