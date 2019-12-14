const _ = require("lodash");
const uuid = require("uuid");

const logger = require("../../common/utils/Logger");
const { getById } = require("../../product");

const { ProductOptionSchema } = require("../model/ProductOptionSchema");
const {
  upsertProductOption,
  getProductOptionByProductId,
  getProductOptionByProductIdAndOptionId
} = require("../service/ProductOptionService");
const {
  validatePayloadAgainstSchema
} = require("../../common/utils/Validator");
const {
  RefactorError,
  ValidationError
} = require("../../common/utils/RefactorError");

const getByProductId = async ({ productId }) => {
  if (_.isUndefined(productId))
    throw new RefactorError(`Product id is Invalid: ${productId}`);

  try {
    const productOptionDocuments = await getProductOptionByProductId({
      productId
    });

    if (
      _.isUndefined(productOptionDocuments) ||
      _.size(productOptionDocuments) === 0
    ) {
      throw new RefactorError(
        `No Product Option Found for the given Product Identifier: ${productId}`
      );
    }

    return productOptionDocuments;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getByProductIdAndOptionId = async ({ productId, id }) => {
  if (_.isUndefined(productId))
    throw new RefactorError(`Product id is Invalid: ${productId}`);
  if (_.isUndefined(id)) throw new RefactorError(`Option id is Invalid: ${id}`);

  try {
    const productOptionDocument = await getProductOptionByProductIdAndOptionId({
      productId,
      id
    });

    if (_.isUndefined(productOptionDocument)) {
      throw new RefactorError(
        `No Product Option Found for the given Product Id: ${productId} and Option Id:${id}`
      );
    }

    return productOptionDocument;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const update = async ({ productId, id, productOptionPayload }) => {
  try {
    // validateProductOptionUpdatePayload({ productOptionPayload });
    const productOptionDocumentToUpdate = await getByProductIdAndOptionId({
      productId,
      id
    });

    _.forIn(productOptionPayload, (value, key) => {
      productOptionDocumentToUpdate[key] = value;
    });
    console.log("####################");
    console.log(productOptionDocumentToUpdate);

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
    throw new RefactorError();
  }
};

const create = async ({ productId, productOptionPayload }) => {
  try {
    // validate the Product id is valid
    await getById({ id: productId });

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
    throw new RefactorError();
  }
};

const _constructProductOption = ({ productOptionPayload, productId }) => {
  return _.assign({}, { id: uuid() }, { productId }, productOptionPayload);
};

module.exports = {
  getByProductIdAndOptionId,
  getByProductId,
  create,
  update
};
