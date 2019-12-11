const Joi = require("@hapi/joi");

const ProductSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required()
}).required();

module.exports = { ProductSchema };
