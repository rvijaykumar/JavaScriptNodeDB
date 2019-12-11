class RefactorError extends Error {
  constructor( errorDescription = undefined) {
    const message = errorDescription || "Generic Internal Error";
    super(message);
  }
}

class SwaggerValidationError extends Error {
  constructor( error) {
    super(error);
  }
}

class ValidationError extends Error {
  constructor( error) {
    super(error);
  }
}

module.exports = { SwaggerValidationError, RefactorError, ValidationError };
