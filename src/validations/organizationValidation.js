import Joi from "joi";

export const createOrganization = {
  body: Joi.object().keys({
    organization_name: Joi.string().required(),
    strength: Joi.number().required(),
    departments: Joi.array().items(Joi.string()),
  }),
};

export const organizationValidation = {
  createOrganization,
};
