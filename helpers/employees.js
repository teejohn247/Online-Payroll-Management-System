const Joi = require ('joi');

const validateAddEmployees = {
    validation(employees) {
  const adminSchema = {
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      email: Joi.string().email().trim().required(),
      address: Joi.string().trim().required(),
      mobile: Joi.string().trim().required(),
      salary: Joi.number().required(),
      status: Joi.string().trim().required(),
      maritalStatus: Joi.string().trim().required(),
  };
  return Joi.validate(employees, adminSchema);
},
};
module.exports = validateAddEmployees;
