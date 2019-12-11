const Validator = require("swagger-model-validator");
const path = require("path");
const fs = require("fs");
const { safeLoad } = require("js-yaml");
const { ValidationError, SwaggerValidationError } = require("./RefactorError");

const logger = require('../utils/Logger');

// TODO
const specsFolder = path.join(__dirname, "../swagger/config/");
const specsFile = safeLoad(
  fs.readFileSync(`${specsFolder}/swagger-spec.yml`),
  "utf8"
);
const validator = new Validator(specsFile);

const validatePayloadAgainstSchema = ({ payload, schema }) => {
  const response = schema.validate(payload);

  const { error } = response;

  if (error) {
    logger.error(error);
    throw new ValidationError(`Input validation failed: ${error.message}`);
  }

  return true;
};

const validatePayloadAgainstSwagger = ({ data, swaggerRefName }) => {
  const response = validator.validate(
    data,
    specsFile.definitions[`${swaggerRefName}`],
    specsFile.definitions
  );

  const { valid, errors, errorCount } = response;

  if (!valid || errorCount > 0) {
    throw new SwaggerValidationError(errors);
  }

  return true;
};

module.exports = {
  validatePayloadAgainstSchema,
  validatePayloadAgainstSwagger
};
