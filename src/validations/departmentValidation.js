import Joi from "joi";

export const createdepartment = {
  body: Joi.object().keys({
    department_name: Joi.string().required(),
    organization: Joi.string().required(),
  }),
};

export const departmentValidation = {
  createdepartment,
};
