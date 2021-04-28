const Joi = require('joi');


const validateRegister = (body) => {

  const schema = Joi.object({
    firstname: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(2).max(512).email().required(),
    password: Joi.string().min(6).max(512).required(),
    about: Joi.string().min(1).max(160).default('.').optional()
  });

  return schema.validate(body);
}


const validateLogin = (body) => {

  const schema = Joi.object({
    email: Joi.string().min(2).max(512).email().required(),
    password: Joi.string().min(6).max(512).required()
  });

  return schema.validate(body);
}


const validateProfileUpdate = (body) => {

  const schema = Joi.object({
    firstname: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
    about: Joi.string().min(1).max(160).default('.').optional()
  });

  return schema.validate(body);
}


module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.validateProfileUpdate = validateProfileUpdate;