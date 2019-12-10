if (!process.env.AWS_REGION) {
    process.env.AWS_REGION = 'us-east-1';
}

if (!process.env.DYNAMODB_NAMESPACE) {
    process.env.DYNAMODB_NAMESPACE = 'dev';
}

const AWS = require('aws-sdk');

// In offline mode, use DynamoDB local server
let DocumentClient = null;

if (process.env.IS_OFFLINE) {
    AWS.config.update({
    region: 'localhost',
    endpoint: "http://localhost:8000"
    });
}

DocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports = { DocumentClient};
