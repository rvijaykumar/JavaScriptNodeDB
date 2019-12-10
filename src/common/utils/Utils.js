module.exports = {
    getQueryStringParameters(event) {
        return (event).queryStringParameters || {};
    },

    getHeaders(event) {
        return (event).headers;
    },

    parseApiBody(event) {
        return JSON.parse((event).body);
    },

    getPathParameters(event) {
        return (event).pathParameters;
    },

    buildSuccessOkResponse(body) {
        return _buildResponse('200', body);
    },

    buildSuccessCreateResponse(body) {
        return _buildResponse('201', body);
    },

    buildSuccessAcceptResponse(body) {
        return _buildResponse('202', body);
    }
};

const _buildResponse = (statusCode, body = undefined) => {
  if (statusCode == 200) {
    body = JSON.stringify(body, null, 2);
  } else {
    body = JSON.stringify({ errors: { body: [body] } }, null, 2);
  }
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body,
  };
};

