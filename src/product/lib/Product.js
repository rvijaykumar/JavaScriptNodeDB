const _ = require("lodash");
const uuid = require("uuid");
const {
  GenericInternalError,
  ValidationError
} = require("../../common/utils/Errors");
const logger = require("../../common/utils/Logger");
const { ProductSchema } = require("../model/ProductSchema");
const {
  upsertProduct,
  getProductById,
  getProductByName,
  deleteProduct,
  getAllProducts
} = require("../service/ProductService");
const {
  validatePayloadAgainstSchema,
  validateProductUpdatePayload
} = require("../../common/utils/Validator");
const {
  getByProductId,
  deleteByProductIdAndOptionId
} = require("../../productOption/lib/ProductOption");

const getAll = async () => {
  try {
    const productDocuments = await getAllProducts();

    if (_.isUndefined(productDocuments) || _.isEmpty(productDocuments)) {
      throw new ValidationError(
        `No Product Found`
      );
    }

    return productDocuments;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getById = async ({ productId }) => {
  if (_.isUndefined(productId))
    throw new ValidationError(`Product id is Invalid: ${productId}`);

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
    throw new ValidationError(`Product name is Invalid: ${productName}`);

  try {
    const productDocuments = await getProductByName({ productName });

    if (_.isUndefined(productDocuments) || _.isEmpty(productDocuments)) {
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
    throw new GenericInternalError();
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
    throw new GenericInternalError();
  }
};

const deleteById = async ({ productId }) => {
  try {
    // Delete Product Options First // TODO improve using BATCH API of Dynamo
    const productOptionDocuments = await getByProductId({ productId });
    await Promise.all(
      _.map(productOptionDocuments, productOptionDocument => {
        return deleteByProductIdAndOptionId({
          productId,
          optionId: productOptionDocument.optionId
        });
      })
    );

    // Delete the Product
    await deleteProduct({ productId });

    logger.info(`Deleted all Product Options for the Product Id: ${productId} and the Product`);
    return;
  } catch (error) {
    logger.error(error);

    if (error instanceof ValidationError) {
      throw error;
    }

    // Suppress all other internal errors and dont show to consumers
    throw new GenericInternalError();
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
  update,
  deleteById
};
