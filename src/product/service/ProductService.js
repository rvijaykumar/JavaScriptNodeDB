const {
  DocumentClient,
  getTableName
} = require("../../common/repository/Repository");
const { RefactorError } = require("../../common/utils/RefactorError");

const logger = require("../../common/utils/Logger");

const modelName = "Product";

const upsertProduct = async ({ productDocument }) => {
  try {
    await DocumentClient.put({
      TableName: getTableName({ modelName }),
      Item: productDocument
    }).promise();
  } catch (error) {
    logger.error(error);
    throw new RefactorError();
  }
};

const getProductById = async ({ productId }) => {
  try {
    const response = await DocumentClient.get({
      TableName: getTableName({ modelName }),
      Key: {
        productId
      }
    }).promise();

    return response.Item;
  } catch (error) {
    logger.error(error);
    throw new RefactorError();
  }
};

const getProductByName = async ({ productName }) => {
  try {
    const response = await DocumentClient.query({
      TableName: getTableName({ modelName }),
      IndexName: "ProuctNameGSI",
      KeyConditionExpression: "productName = :productName",
      ExpressionAttributeValues: {
        ":productName": productName
      }
    }).promise();

    return response.Items;
  } catch (error) {
    logger.error(error);
    throw new RefactorError();
  }
};

module.exports = { upsertProduct, getProductById, getProductByName };
