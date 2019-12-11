const {
  DocumentClient,
  getTableName
} = require("../../common/repository/Repository");

const logger = require("../../common/utils/Logger");

const modelName = "ProductOption";

const createProductOption = async ({ productOptionPayload }) => {
  try {
    await DocumentClient.put({
      TableName: getTableName({ modelName }),
      Item: productOptionPayload
    }).promise();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getProductOption = async ({ Id }) => {
  try {
    const response = await DocumentClient.get({
      TableName: getTableName({ modelName }),
      Key: {
        Id
      }
    }).promise();

    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { createProductOption, getProductOption };
