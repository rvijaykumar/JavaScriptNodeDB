const _ = require("lodash");
const uuid = require("uuid");

const logger = require("../../common/utils/Logger");
const { getById } = require("../../product");

const { ProductOptionSchema } = require("../model/ProductOptionSchema");
const {
  upsertProductOption,
  getProductOptionByProductId,
  getProductOptionByProductIdAndOptionId,
  deleteProductOption
} = require("../service/ProductOptionService");
const {
  validatePayloadAgainstSchema
} = require("../../common/utils/Validator");
const {
  GenericInternalError,
  ValidationError
} = require("../../common/utils/Errors");

const getByProductId = async ({ productId }) => {
  if (_.isUndefined(productId))
    throw new ValidationError(`Product id is Invalid: ${productId}`);

  try {
    const productOptionDocuments = await getProductOptionByProductId({
      productId
    });

    if (
      _.isUndefined(productOptionDocuments) ||
      _.size(productOptionDocuments) === 0
    ) {
      throw new ValidationError(
        `No Product Option Found for the given Product Identifier: ${productId}`
      );
    }

    return productOptionDocuments;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getByProductIdAndOptionId = async ({ productId, optionId }) => {
  if (_.isUndefined(productId))
    throw new ValidationError(`Product id is Invalid: ${productId}`);
  if (_.isUndefined(optionId))
    throw new ValidationError(`Option id is Invalid: ${optionId}`);

  try {
    const productOptionDocument = await getProductOptionByProductIdAndOptionId({
      productId,
      optionId
    });

    if (_.isUndefined(productOptionDocument)) {
      throw new ValidationError(
        `No Product Option Found for the given Product Id: ${productId} and Option Id:${optionId}`
      );
    }

    return productOptionDocument;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const update = async ({ productId, optionId, productOptionPayload }) => {
  try {
    // validateProductOptionUpdatePayload({ productOptionPayload });
    const productOptionDocumentToUpdate = await getByProductIdAndOptionId({
      productId,
      optionId
    });

    _.forIn(productOptionPayload, (value, key) => {
      productOptionDocumentToUpdate[key] = value;
    });

    await upsertProductOption({
      productOptionDocument: productOptionDocumentToUpdate
    });

    return productOptionDocumentToUpdate;
  } catch (error) {
    logger.error(error);

    if (error instanceof ValidationError) {
      throw error;
    }

    // Suppress all other internal errors and dont show to consumers
    throw new GenericInternalError();
  }
};

const create = async ({ productId, productOptionPayload }) => {
  try {
    // validate the Product id is valid
    await getById({ productId });

    const productOptionDocument = _constructProductOption({
      productOptionPayload,
      productId
    });

    validatePayloadAgainstSchema({
      payload: productOptionDocument,
      schema: ProductOptionSchema
    });

    await upsertProductOption({ productOptionDocument });
    return productOptionDocument;
  } catch (error) {
    logger.error(error);

    if (error instanceof ValidationError) {
      throw error;
    }

    // Suppress all other internal errors
    throw new GenericInternalError();
  }
};

const deleteByProductIdAndOptionId = async ({ productId, optionId }) => {
  try {
    await deleteProductOption({ productId, optionId });

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

const _constructProductOption = ({ productOptionPayload, productId }) => {
  return _.assign(
    {},
    { optionId: uuid() },
    { productId },
    productOptionPayload
  );
};

module.exports = {
  getByProductIdAndOptionId,
  getByProductId,
  create,
  update,
  deleteByProductIdAndOptionId
};
