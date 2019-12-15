const _ = require("lodash");
const {
  API_PATH_PARAM_PRODUCT_ID,
  API_PATH_PARAM_PRODUCT_NAME
} = require("../../common/utils/Constants");
const {
  getPathParameters,
  getQueryStringParameters,
  parseApiBody,
  buildSuccessOkResponse,
  buildSuccessCreateResponse,
  buildInternalErrorFailureResponse
} = require("../../common/utils/Utils");
const logger = require("../../common/utils/Logger");

const {
  getById,
  getByName,
  getAll,
  create,
  update,
  deleteById
} = require("..");

const getByIdHandler = async event => {
  logger.info(event);
  try {
    const productId = _.get(
      getPathParameters(event),
      API_PATH_PARAM_PRODUCT_ID
    );

    const response = await getById({ productId });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const getHandler = async event => {
  logger.info(event);
  try {
    // TODO we should also validate the queryParm is of expected string
    const productName = _.get(
      getQueryStringParameters(event),
      API_PATH_PARAM_PRODUCT_NAME
    );

    const response = productName
      ? await getByName({ productName })
      : await getAll();

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const updateHandler = async event => {
  logger.info(event);
  try {
    const productId = _.get(
      getPathParameters(event),
      API_PATH_PARAM_PRODUCT_ID
    );
    const payload = parseApiBody(event);

    const response = await update({ productId, productPayload: payload });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const createHandler = async event => {
  logger.info(event);

  try {
    const payload = parseApiBody(event);

    const response = await create({ productPayload: payload });
    logger.info(response);
    return buildSuccessCreateResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const deleteHandler = async event => {
  logger.info(event);
  try {
    const productId = _.get(
      getPathParameters(event),
      API_PATH_PARAM_PRODUCT_ID
    );
    const payload = parseApiBody(event);

    await deleteById({ productId, productPayload: payload });

    return buildSuccessOkResponse();
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

module.exports = {
  getByIdHandler,
  getHandler,
  createHandler,
  updateHandler,
  deleteHandler
};
