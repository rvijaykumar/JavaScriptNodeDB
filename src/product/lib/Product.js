const _ = require("lodash");
const uuid = require("uuid");
const {
  RefactorError,
  ValidationError
} = require("../../common/utils/RefactorError");

const logger = require("../../common/utils/Logger");
const { ProductSchema } = require("../model/ProductSchema");
const { createProduct, getProductById } = require("../service/ProductService");
const {
  validatePayloadAgainstSchema
} = require("../../common/utils/Validator");

// Get all Products
const getAll = async event => {
  logger.info(event);

  // TODO
  return {
    statusCode: 200,
    body: "Work in progress"
  };
};

// Get Product by Product Id
const getById = async ({ Id }) => {
  try {
    if (_.isUndefined(Id))
      throw new RefactorError(`Product Id is Invalid: ${Id}`);

    const productDocument = await getProductById({ Id });

    if (_.isUndefined(productDocument)) {
      throw new RefactorError(
        `No Product Found for the given Identifier: ${Id}`
      );
    }

    return productDocument;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Create Product
const create = async ({ productPayload }) => {
  try {
    validatePayloadAgainstSchema({
      payload: productPayload,
      schema: ProductSchema
    });

    const productDocument = _constructProductDocument({ productPayload });
    await createProduct({ productDocument });

    return productDocument;
  } catch (error) {
    logger.error(error);

    if (error instanceof ValidationError) {
      throw error;
    }

    // Suppress all other internal errors
    throw new RefactorError();
  }
};

const _constructProductDocument = ({ productPayload }) => {
  return _.assign({}, { Id: uuid() }, productPayload);
};

module.exports = {
  getAll,
  getById,
  create
};
