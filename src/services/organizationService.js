import { Organization, OrganizationUsers } from "../models/index.js";
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
    if (organization) {
      const message = "Organization already exists.";
      return StatusCode.sendBadRequestResponse(res, message);
    }

    return organization;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization by id
const getOrganizationById = async (res, id) => {
  try {
    const organization = await Organization.findById({ _id: id }).populate({
      path: "departments",
      select: "_id department_name",
    });
    if (!organization) {
      const message = "Organization not found.";
      return StatusCode.sendBadRequestResponse(res, message);
    }

    return organization;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update organization by id
const updateOrganizationById = async (res, id, updatedData) => {
  try {
    const organization = await Organization.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!organization) {
      const message = "Organization not found.";
      return StatusCode.sendBadRequestResponse(res, message);
    }

    return organization;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//create organization user
const createOrganizationUser = async (res, organizationData) => {
  try {
    const organization = new OrganizationUsers(organizationData);
    const savedOrganizationUser = await organization.save();

    return { organizationUser: savedOrganizationUser };
  } catch (error) {
    const message = "Error creating organization user";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization user
const getOrganizationUser = async (res, organizationData) => {
  try {
    const organization = await OrganizationUsers.findOne({
      user_id: organizationData.user_id,
      organization_id: organizationData.organization_id,
    });

    return organization;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get organization users
const getDepartmentUsers = async (res) => {
  try {
    const data = await OrganizationUsers.find()
      .populate({
        path: "organization_id",
        model: "organizations",
        select: "_id organization_name strength",
      })
      .populate({
        path: "user_id",
        model: "users",
        select: "_id first_name last_name email",
      });

    return data;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const OrganizationService = {
  createOrganization,
  getOrganization,
  getOrganizationById,
  updateOrganizationById,
  createOrganizationUser,
  getOrganizationUser,
  getDepartmentUsers,
};
