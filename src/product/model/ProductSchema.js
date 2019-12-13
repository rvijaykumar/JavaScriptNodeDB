const Joi = require("@hapi/joi");

const ProductSchema = Joi.object({
  id: Joi.string().required(),
  // 'name' is a reserved keyword in DynamoDB, so has to use a different word
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required()
}).required();

module.exports = { ProductSchema };
