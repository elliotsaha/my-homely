// VALIDATION
const Joi = require("@hapi/joi");
const PhoneJoi = Joi.extend(require("joi-phone-number"));

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name Required",
      "string.required": "Name Required",
    }),
    phone: PhoneJoi.string().required().phoneNumber().messages({
      "string.empty": "Phone Number Required",
      "phoneNumber.invalid": "Invalid Phone Number",
    }),

    email: Joi.string().required().email().messages({
      "string.empty": `Invalid Email`,
      "string.required": `Invalid Email`,
      "string.email": "Invalid Email",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Invalid Password",
      "string.required": "Invalid Password",
      "string.min": "Password Must Be Atleast 6 Characters Long",
    }),
    confirmPassword: Joi.string().required().messages({
      "string.empty": "Confirm Password Does Not Match Password",
      "string.required": "Confirm Password Does Not Match Password",
    }),
    icon: Joi.string().required().messages({
      "string.empty": "Please Select Icon",
      "string.required": "Please Select Icon",
    }),
  });

  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": `Invalid Email`,
      "string.required": `Invalid Email`,
      "string.email": "Invalid Email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Invalid Password",
      "string.required": "Invalid Password",
    }),
  });

  return schema.validate(data);
};

// Password Validation
const passwordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.passwordValidation = passwordValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
