const _ = require("lodash");
const { API_PATH_PARAM_PRODUCT_ID } = require("../../common/utils/Constants");
const {
  getPathParameters,
  parseApiBody,
  buildSuccessCreateResponse,
  buildSuccessOkResponse,
  buildInternalErrorFailureResponse
} = require("../../common/utils/Utils");
const logger = require("../../common/utils/Logger");

const {
  getByProductIdAndOptionId,
  getByProductId,
  create,
  update
} = require("..");

const getByProductIdHandler = async event => {
  logger.info(event);
  try {
    const productId = _.get(
      getPathParameters(event),
      API_PATH_PARAM_PRODUCT_ID
    );

    const response = await getByProductId({ productId });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const getByProductIdAndOptionIdHandler = async event => {
  logger.info(event);
  try {
    const { productId, id } = getPathParameters(event);

    const response = await getByProductIdAndOptionId({ productId, id });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const updateHandler = async event => {
  logger.info(event);
  try {
    const { productId, id } = getPathParameters(event);
    const payload = parseApiBody(event);

    const response = await update({
      productId,
      id,
      productOptionPayload: payload
    });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const createHandler = async event => {
  logger.info(event);

  try {
    const productId = _.get(
      getPathParameters(event),
      API_PATH_PARAM_PRODUCT_ID
    );
    const payload = parseApiBody(event);

    const response = await create({ productId, productOptionPayload: payload });
    logger.info(response);
    return buildSuccessCreateResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

module.exports = {
  getByProductIdAndOptionIdHandler,
  getByProductIdHandler,
  createHandler,
  updateHandler
};
