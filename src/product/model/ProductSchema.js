const Joi = require("@hapi/joi");

const ProductSchema = Joi.object({
  productId: Joi.string().required(),
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required()
}).required();

module.exports = { ProductSchema };
