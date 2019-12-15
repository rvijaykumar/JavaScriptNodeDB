const _ = require("lodash");
const { ValidationError } = require("./Errors");
const logger = require("../utils/Logger");

// TODO
// SWAGGER validation

const validatePayloadAgainstSchema = ({ payload, schema }) => {
  const response = schema.validate(payload);

  const { error } = response;

  if (error) {
    logger.error(error);
    throw new ValidationError(`Input validation failed: ${error.message}`);
  }

  return true;
};

const validateProductUpdatePayload = ({ productPayload }) => {
  // TODO in a better way
  if (
    _.isUndefined(productPayload.productName) &&
    _.isUndefined(productPayload.description) &&
    _.isUndefined(productPayload.price) &&
    _.isUndefined(productPayload.deliveryPrice)
  ) {
    throw new ValidationError(
      "At least one Product property required in PUT operation"
    );
  }
};

module.exports = {
  validatePayloadAgainstSchema,
  validateProductUpdatePayload
};
