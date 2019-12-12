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

const getAll = async event => {
  logger.info(event);

  // TODO
  return {
    statusCode: 200,
    body: "Work in progress"
  };
};

const getById = async ({ id }) => {
  if (_.isUndefined(id))
    throw new RefactorError(`Product id is Invalid: ${id}`);

  try {
    const productDocument = await getProductById({ id });

    if (_.isUndefined(productDocument)) {
      throw new ValidationError(
        `No Product Found for the given Identifier: ${id}`
      );
    }

    return productDocument;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async ({ productPayload }) => {
  try {
    const productDocument = _constructProductDocument({ productPayload });

    validatePayloadAgainstSchema({
      payload: productDocument,
      schema: ProductSchema
    });

    await createProduct({ productDocument });

    return productDocument;
  } catch (error) {
    logger.error(error);

    if (error instanceof ValidationError) {
      throw error;
    }

    // Suppress all other internal errors and dont show to consumers
    throw new RefactorError();
  }
};

const _constructProductDocument = ({ productPayload }) => {
  return _.assign({}, { id: uuid() }, productPayload);
};

module.exports = {
  getAll,
  getById,
  create
};
