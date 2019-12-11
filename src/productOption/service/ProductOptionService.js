const {
  DocumentClient,
  getTableName
} = require("../../common/repository/Repository");

const logger = require("../../common/utils/Logger");

const modelName = "ProductOption";

const createProductOption = async ({ productOptionDocument }) => {
  try {
    await DocumentClient.put({
      TableName: getTableName({ modelName }),
      Item: productOptionDocument
    }).promise();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getProductOption = async ({ id }) => {
  try {
    const response = await DocumentClient.get({
      TableName: getTableName({ modelName }),
      Key: {
        id
      }
    }).promise();

    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { createProductOption, getProductOption };
