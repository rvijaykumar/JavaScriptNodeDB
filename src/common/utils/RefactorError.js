class RefactorError extends Error {
  constructor({args}) {
    const message = args || 'Generic Internal Error';
    super(message);
  }
}

module.exports = {RefactorError}
;
