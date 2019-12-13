const { ValidationError } = require("./RefactorError");

const logger = require('../utils/Logger');

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


module.exports = {
  validatePayloadAgainstSchema
};
