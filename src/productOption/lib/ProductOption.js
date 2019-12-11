const _ = require("lodash");
const uuid = require("uuid");

const logger = require("../../common/utils/Logger");
const { ProductOptionSchema } = require("../model/ProductOptionSchema");
const {
  createProductOption,
  getProductOption
} = require("../service/ProductOptionService");
const {
  validatePayloadAgainstSchema
} = require("../../common/utils/Validator");
const {
  RefactorError,
  ValidationError
} = require("../../common/utils/RefactorError");

const getByProductId = async ({ id }) => {
  if (_.isUndefined(id))
    throw new RefactorError(`Product id is Invalid: ${id}`);

  try {
    const productOptionDocument = await getProductOption({ id });

    if (_.isUndefined(productOptionDocument)) {
      throw new RefactorError(
        `No Product Option Found for the given Product Identifier: ${id}`
      );
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const create = async ({ productId, productOptionPayload }) => {
  try {
    const productOptionDocument = _constructProductOption({
      productOptionPayload,
      productId
    });

    validatePayloadAgainstSchema({
      payload: productOptionDocument,
      schema: ProductOptionSchema
    });

    // validate the Product id is valid

    await createProductOption({ productOptionDocument });
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
  return _.assign({}, { id: uuid() }, {productId}, productOptionPayload);
};

module.exports = {
  getByProductId,
  create
};
