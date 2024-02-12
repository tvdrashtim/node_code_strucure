import { Organization } from "../models/index.js";
import { StatusCode } from "../services/index.js";

//create organization
const createOrganization = async (res, organizationData) => {
  try {
    const organization = new Organization(organizationData);
    const savedOrganization = await organization.save();

    return { organization: savedOrganization };
  } catch (error) {
    const message = "Error creating organization";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization
const getOrganization = async (res, organization_name) => {
  try {
    const organization = await Organization.findOne({ organization_name });
    return organization;
  } catch (error) {
    const message = "Organization not found.";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization by id
const getOrganizationById = async (res, id) => {
  try {
    const organization = await Organization.findById({ _id: id });
    return organization;
  } catch (error) {
    const message = "Organization not found.";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const OrganizationService = {
  createOrganization,
  getOrganization,
  getOrganizationById,
};
