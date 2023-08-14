import Joi from "joi";

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
});

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.string().min(3).required().valid(Joi.ref("password")),
});