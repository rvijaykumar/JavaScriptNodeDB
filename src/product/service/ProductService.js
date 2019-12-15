const {
  DocumentClient,
  getTableName
} = require("../../common/repository/Repository");
const { GenericInternalError } = require("../../common/utils/Errors");

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
    throw new GenericInternalError();
  }
};

// TODO either query with limit for pagination
// or scan with last key for next sets with limit
const getAllProducts = async () => {
  try {
    const response = await DocumentClient.scan({
      TableName: getTableName({ modelName })
    }).promise();

    return response.Items;
  } catch (error) {
    logger.error(error);
    throw new GenericInternalError();
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
    throw new GenericInternalError();
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
    throw new GenericInternalError();
  }
};

const deleteProduct = async ({ productId }) => {
  try {
    await DocumentClient.delete({
      TableName: getTableName({ modelName }),
      Key: {
        productId
      }
    }).promise();
  } catch (error) {
    logger.error(error);
    throw new GenericInternalError();
  }
};

module.exports = {
  upsertProduct,
  getProductById,
  getProductByName,
  deleteProduct,
  getAllProducts
};
