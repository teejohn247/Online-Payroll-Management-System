const Joi = require ('joi');

const validateAdminSignin = {
    validation(admin) {
  const adminSchema = {
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).max(12).trim()
        .required()
  };
  return Joi.validate(admin, adminSchema);
},
};
module.exports = validateAdminSignin;
