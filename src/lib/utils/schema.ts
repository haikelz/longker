import * as Nope from "nope-validator";

export const loginSchema = Nope.object().shape({
  email: Nope.string().email().required(),
  password: Nope.string()
    .required()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "The password must containts alphabet, number, and special character"
    )
    .atLeast(5, "Please enter the longer password")
    .atMost(20, "The password that you enter is too long"),
});

export const registerSchema = Nope.object().shape({
  name: Nope.string().required(),
  email: Nope.string().email().required(),
  password: Nope.string()
    .required()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "The password must containts alphabet, number, and special character"
    )
    .atLeast(5, "Please create a longer password")
    .atMost(20, "The password that you create is too long."),
});

export const changePasswordSchema = Nope.object().shape({
  current_password: Nope.string()
    .required()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "The password must containts alphabet, number, and special character"
    )
    .atLeast(5, "Please enter a longer password")
    .atMost(20, "The password that you enter is too long."),
  new_password: Nope.string()
    .required()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "The password must containts alphabet, number, and special character"
    )
    .atLeast(5, "Please create a longer password")
    .atMost(20, "The password that you create is too long."),
  new_confirm_password: Nope.string()
    .required()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      "The password must containts alphabet, number, and special character"
    )
    .atLeast(5, "Please create a longer password")
    .atMost(20, "The password that you create is too long."),
});
