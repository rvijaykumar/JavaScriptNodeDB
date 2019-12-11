const Joi = require("@hapi/joi");

const ProductOptionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
}).required();

module.exports = { ProductOptionSchema };
