const _ = require("lodash");
const { API_PATH_PARAM_ID } = require("../../common/utils/Constants");
const {
  getPathParameters,
  parseApiBody,
  buildSuccessCreateResponse,
  buildSuccessOkResponse,
  buildInternalErrorFailureResponse
} = require("../../common/utils/Utils");
const logger = require("../../common/utils/Logger");

const { getById, create } = require("..");

const getByIdHandler = async event => {
  logger.info(event);
  try {
    const id = _.get(getPathParameters(event), API_PATH_PARAM_ID);

    const response = await getById({ id });

    return buildSuccessOkResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

const createHandler = async event => {
  logger.info(event);

  try {
    const productId = _.get(getPathParameters(event), API_PATH_PARAM_ID);
    const payload = parseApiBody(event);
    console.log(getPathParameters(event));

    const response = await create({ productId, productOptionPayload: payload });
    logger.info(response);
    return buildSuccessCreateResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

module.exports = { getByIdHandler, createHandler };
