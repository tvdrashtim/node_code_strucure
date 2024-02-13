import Joi from "joi";

export const createDepartment = {
  body: Joi.object().keys({
    department_name: Joi.string().required(),
    organization: Joi.string().required(),
  }),
};

export const createDepartmentUser = {
  body: Joi.object().keys({
    user_id: Joi.string().required(),
    department_id: Joi.string().required(),
  }),
};

export const departmentValidation = {
  createDepartment,
  createDepartmentUser,
};
