const _ = require("lodash");
const uuid = require("uuid");
const { API_PATH_PARAM_ID_NAME } = require("../../common/utils/Constants");
const logger = require("../../common/utils/Logger");
const { ProductSchema } = require("../model/ProductSchema");
const { createProduct, getProduct } = require("../service/ProductOptionService");
const {
  validatePayloadAgainstSchema
} = require("../../common/utils/Validator");
const {
  getPathParameters,
  parseApiBody,
  buildSuccessCreateResponse,
  buildInternalErrorFailureResponse
} = require("../../common/utils/Utils");


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
const getById = async event => {
  logger.info(event);
  try {
    const Id = _.get(getPathParameters(event), API_PATH_PARAM_ID_NAME);

    const product = await getProduct({ Id });

    return buildSuccessCreateResponse(product);
  } catch (error) {
    logger.error(error);
    buildInternalErrorFailureResponse();
  }
};

// Create Product
const create = async event => {
  logger.info(event);
  try {
    const payload = parseApiBody(event);

    validatePayloadAgainstSchema({ payload, schema: ProductSchema });

    const productPayload = _constructProduct({ payload });
    await createProduct({ productPayload });

    return buildSuccessCreateResponse(productPayload);
  } catch (error) {
    logger.error(error);
    buildInternalErrorFailureResponse();
  }
};

const _constructProduct = ({ payload }) => {
  return _.assign({}, { Id: uuid() }, payload);
};

module.exports = {
  getAll,
  getById,
  create
};
