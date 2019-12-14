const Joi = require("@hapi/joi");

const ProductOptionSchema = Joi.object({
  optionId: Joi.string().required(),
  productId: Joi.string().required(),
  productOptionName: Joi.string().required(),
  description: Joi.string().required()
}).required();

module.exports = { ProductOptionSchema };
