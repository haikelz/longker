import * as Nope from "nope-validator";

export const loginSchema = Nope.object().shape({
  email: Nope.string().email().required(),
  password: Nope.string()
    .required()
    .atLeast(5, "Please enter the longer password")
    .atMost(20, "The password that you enter is too long"),
});

export const registerSchema = Nope.object().shape({
  name: Nope.string().required(),
  email: Nope.string().email().required(),
  password: Nope.string()
    .required()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/)
    .atLeast(5, "Please create a longer password")
    .atMost(20, "The password that you create is too long."),
});
