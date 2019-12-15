const {
  getByProductIdAndOptionId,
  getByProductId,
  create,
  update,
  deleteByProductIdAndOptionId
} = require("./lib/ProductOption");

module.exports = { getByProductIdAndOptionId, getByProductId, create, update, deleteByProductIdAndOptionId };
