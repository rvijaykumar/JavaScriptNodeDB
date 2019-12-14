const _ = require("lodash");
const uuid = require("uuid");
const {
  RefactorError,
  ValidationError
} = require("../../common/utils/RefactorError");
const logger = require("../../common/utils/Logger");
const { ProductSchema } = require("../model/ProductSchema");
const {
  upsertProduct,
  getProductById,
  getProductByName
} = require("../service/ProductService");
const {
  validatePayloadAgainstSchema,
  validateProductUpdatePayload
} = require("../../common/utils/Validator");

const getAll = async event => {
  logger.info(event);

  // TODO
  return {
    statusCode: 200,
    body: "Work in progress"
  };
};

const getById = async ({ productId }) => {
  if (_.isUndefined(productId))
    throw new RefactorError(`Product id is Invalid: ${productId}`);

  try {
    const productDocument = await getProductById({ productId });

    if (_.isUndefined(productDocument)) {
      throw new ValidationError(
        `No Product Found for the given Identifier: ${productId}`
      );
    }

    return productDocument;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getByName = async ({ productName }) => {
  if (_.isUndefined(productName))
    throw new RefactorError(`Product name is Invalid: ${productName}`);

  try {
    const productDocuments = await getProductByName({ productName });

    if (_.isUndefined(productDocuments) || _.size(productDocuments) === 0) {
      throw new ValidationError(
        `No Product Found for the given Identifier: ${productName}`
      );
    }

    return productDocuments;
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

    await upsertProduct({ productDocument });

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

const update = async ({ productId, productPayload }) => {
  try {
    validateProductUpdatePayload({ productPayload });

    const productDocumentToUpdate = await getById({ productId });


    _.forIn(productPayload, (value, key) => {
      productDocumentToUpdate[key] = value;
    });

    await upsertProduct({ productDocument: productDocumentToUpdate });

    return productDocumentToUpdate;
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
  return _.assign({}, { productId: uuid() }, productPayload);
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update
};
