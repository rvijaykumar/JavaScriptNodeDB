const _ = require("lodash");
const { API_PATH_PARAM_ID } = require("../../common/utils/Constants");
const {
  getPathParameters,
  parseApiBody,
  buildSuccessCreateResponse,
  buildInternalErrorFailureResponse
} = require("../../common/utils/Utils");
const logger = require("../../common/utils/Logger");

const { getById, create } = require("..");

// Get Product
const getByIdHandler = async event => {
  logger.info(event);
  try {
    const Id = _.get(getPathParameters(event), API_PATH_PARAM_ID);

    const response = await getById({ Id });

    return buildSuccessCreateResponse(response);
  } catch (error) {
    logger.error(error);
    return buildInternalErrorFailureResponse(error.message);
  }
};

// Create Product
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

module.exports = { getByIdHandler, createHandler };
