const Joi = require("@hapi/joi");

const ProductOptionSchema = Joi.object({
  id: Joi.string().required(),
  productId: Joi.string().required(),
  productOptionName: Joi.string().required(),
  description: Joi.string().required()
}).required();

module.exports = { ProductOptionSchema };
