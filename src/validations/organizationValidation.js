import Joi from "joi";

export const createOrganization = {
  body: Joi.object().keys({
    organization_name: Joi.string().required(),
    strength: Joi.number().required(),
    departments: Joi.array().items(Joi.string()),
  }),
};

export const updateOrganization = {
  body: Joi.object().keys({
    organization_name: Joi.string(),
    strength: Joi.number(),
    departments: Joi.array().items(Joi.string()),
  }),
};

export const createOrganizationUser = {
  body: Joi.object().keys({
    user_id: Joi.string().required(),
    organization_id: Joi.string().required(),
  }),
};

export const organizationValidation = {
  createOrganization,
  updateOrganization,
  createOrganizationUser,
};
