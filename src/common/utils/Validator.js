const Validator = require('swagger-model-validator');
const path = require('path');
const fs = require('fs');
const { safeLoad } = require('js-yaml');

const specsFolder = path.join(__dirname, './swagger/config/');
const specsFile = safeLoad(
  fs.readFileSync(`${specsFolder}/swagger-spec.yml`),
  'utf8'
);
const validator = new Validator(specsFile);

const validatePayloadAgainstSchema = ({
    payload,
    schema
  }) => {
return schema.validate(payload);
};

const validatePayloadAgainstSwagger = ({data, swaggerRefName, }) => {
  const response = validator.validate(
    data,
    specsFile.definitions[`${swaggerRefName}`],
    specsFile.definitions
  );

  const { valid, errors, errorCount } = response;

  if (!valid || errorCount > 0) {
    // TODO proper or applicaiton error handling framework
    throw Error(`Swagger validation failed, ${errors}`);
  }

  return true;
};


module.exports = {validatePayloadAgainstSchema, validatePayloadAgainstSwagger};

