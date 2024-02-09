import Joi from "joi";
import { EmailId, Password } from "./custom.js";

export const createUser = {
  files: Joi.object().keys({
    profile_photo: Joi.string().allow(null),
  }),
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required().custom(Password),
    email: Joi.string().required().custom(EmailId),
    phone_number: Joi.string().custom((value, helpers) => {
      if (
        value === "" ||
        (value.length >= 10 && /^\d{10}$/.test(value.slice(value.length - 10)))
      ) {
        return value;
      } else {
        return helpers.message("Please enter a valid number");
      }
    }),
  }),
};

export const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required().custom(EmailId),
    password: Joi.string().required().custom(Password),
  }),
};

export const updateUser = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string().custom(Password),
    email: Joi.string().custom(EmailId),
    phone_number: Joi.custom((value, helpers) => {
      if (
        value === "" ||
        (value.length >= 10 && /^\d{10}$/.test(value.slice(value.length - 10)))
      ) {
        return value;
      } else {
        return helpers.message("Please enter a valid number");
      }
    }),
  }),
};

export const userValidation = {
  createUser,
  loginUser,
  updateUser,
};
