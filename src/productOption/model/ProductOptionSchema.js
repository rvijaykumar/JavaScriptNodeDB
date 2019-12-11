const Joi = require("@hapi/joi");

const ProductOptionSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required()
}).required();

module.exports = { ProductOptionSchema };
