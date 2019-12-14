const _ = require("lodash");
const { API_PATH_PARAM_PRODUCT_ID, API_PATH_PARAM_OPTION_ID } = require("../../common/utils/Constants");
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
    // We could do it directly like this
    const { productId, optionId } = getPathParameters(event);

    const response = await getByProductIdAndOptionId({ productId, optionId });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const updateHandler = async event => {
  logger.info(event);
  try {
    const { productId, optionId } = getPathParameters(event);
    const payload = parseApiBody(event);

    const response = await update({
      productId,
      optionId,
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
