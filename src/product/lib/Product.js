// const Utils = require('../../common/utils/Utils');
const _ = require("lodash");
const uuid = require("uuid");
const logger = require("../../common/utils/Logger");
const { ProductSchema } = require("../model/ProductSchema");
const { createProduct } = require("../service/ProductService");
const {
  validatePayloadAgainstSchema
} = require("../../common/utils/Validator");

//Get Products
const get = async event => {
  logger.info(event);

  return {
    statusCode: 200,
    body: "test"
  };
};

// Create Product
const create = async event => {
  logger.info(event);
  try {
    const payload = JSON.parse(event.body);

    validatePayloadAgainstSchema({ payload, schema: ProductSchema });

    const productPayload = _constructProduct({ payload });
    await createProduct({ productPayload });

    return {
      statusCode: 200,
      body: JSON.stringify(productPayload)
    };
  } catch (error) {
    logger.error(error);
    // TODO better error/ app level handling.
    return {
      statusCode: 500,
      body: "error occurred"
    };
  }
};

const _constructProduct = ({ payload }) => {
  return _.assign({}, { Id: uuid() }, payload);
};
module.exports = {
  get,
  create
};
