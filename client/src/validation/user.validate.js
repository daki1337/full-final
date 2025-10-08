import * as yup from "yup";

const nameSchema = yup.string().trim().min(5).max(255);
const emailSchema = yup.string().trim().email();
const passwordSchema = yup.string().trim().min(5);
export const loginValidateSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerValidateSchema = yup.object({
  name: yup.string().trim().min(5).max(255).required(),
  email: emailSchema.required(),
  password: passwordSchema.required("Пароль обов'язковий"),
});

export const updateValidateSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
