const _ = require("lodash");
const uuid = require("uuid");
const { API_PATH_PARAM_ID_NAME } = require("../../common/utils/Constants");
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
  getPathParameters,
  parseApiBody,
  buildSuccessCreateResponse,
  buildInternalErrorFailureResponse
} = require("../../common/utils/Utils");

// Get Product Option by Product Id
const getByProductId = async event => {
  logger.info(event);
  try {
    const Id = _.get(getPathParameters(event), API_PATH_PARAM_ID_NAME);

    const product = await getProductOption({ Id });

    return buildSuccessCreateResponse(product);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse();
  }
};

// Create Product Option
const create = async event => {
  logger.info(event);
  try {
    const productId = _.get(getPathParameters(event), API_PATH_PARAM_ID_NAME);
    const payload = parseApiBody(event);
    const productOptionPayload = _constructProductOption({
      payload,
      productId
    });

    validatePayloadAgainstSchema({
      payload: productOptionPayload,
      schema: ProductOptionSchema
    });

    // validate the Product Id is valid


    await createProductOption({ productOptionPayload });

    return buildSuccessCreateResponse(productOptionPayload);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const _constructProductOption = ({ payload, productId }) => {
  return _.assign({}, { Id: uuid() }, productId, payload);
};

module.exports = {
  getByProductId,
  create
};
