const {
  DocumentClient,
  getTableName
} = require("../../common/repository/Repository");

const logger = require("../../common/utils/Logger");

const modelName = "ProductOption";

const upsertProductOption = async ({ productOptionDocument }) => {
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

const getProductOptionByProductId = async ({ productId }) => {
  try {
    const response = await DocumentClient.query({
      TableName: getTableName({ modelName }),
      KeyConditionExpression: "productId = :productId",
      ExpressionAttributeValues: {
        ":productId": productId
      }
    }).promise();

    return response.Items;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getProductOptionByProductIdAndOptionId = async ({ productId, id }) => {
  try {
    const response = await DocumentClient.get({
      // TableName: getTableName({ modelName }),
      // KeyConditionExpression: "productId = :productId, id = :id",
      // ExpressionAttributeValues: {
      //   ":productId": productId,
      //   ":id": id
      // }
      TableName: getTableName({ modelName }),
      Key: {
        productId,
        id
      }
    }).promise();

    return response.Item;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  upsertProductOption,
  getProductOptionByProductId,
  getProductOptionByProductIdAndOptionId
};
