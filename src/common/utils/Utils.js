const moment = require("moment");

module.exports = {
  getQueryStringParameters(event) {
    return event.queryStringParameters || {};
  },

  getHeaders(event) {
    return event.headers;
  },

  parseApiBody(event) {
    return JSON.parse(event.body);
  },

  getPathParameters(event) {
    return event.pathParameters;
  },

  buildSuccessOkResponse(body) {
    return _buildResponse("200", body);
  },

  buildSuccessCreateResponse(body) {
    return _buildResponse("201", body);
  },

  buildInternalErrorFailureResponse(message = undefined) {
    return _buildResponse("500", {
      message: message || "Internal Error Occurred",
      correlationId: moment().unix()
    });
  }
};

const _buildResponse = (statusCode, body = undefined) => {
  body = JSON.stringify(body, null, 2);

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body
  };
};
