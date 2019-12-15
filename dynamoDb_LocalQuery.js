/**
 * Works only in Local DynamoDB Shell
 * 
 * Reference file to store useful queries
 */

// Query local dynamo db
const dynamodb = new AWS.DynamoDB({
  region: 'us-east-1',
  endpoint: "http://localhost:8000"
  });
  const tableName = "refactor-this-dev-Product";

  const params = {
  TableName: tableName,
  Select: "ALL_ATTRIBUTES"
  };


  function doScan(response) {
  if (response.error) ppJson(response.error); // an error occurred
  else {
      ppJson(response.data); // successful response

      // More data.  Keep calling scan.
      if ('LastEvaluatedKey' in response.data) {
          response.request.params.ExclusiveStartKey = response.data.LastEvaluatedKey;
          dynamodb.scan(response.request.params)
              .on('complete', doScan)
              .send();
      }
  }
  }
  console.log("Starting a Scan of the table");
  dynamodb.scan(params)
  .on('complete', doScan)
  .send();

// to get list of tables
aws dynamodb list-tables --endpoint-url http://localhost:8000

// query by condition
aws dynamodb query \
    --table-name refactor-this-dev-Product \
    --key-condition-expression "proudctName = :productName" \
    --expression-attribute-values  ''":productName = {"S": "test"}"'
    --endpoint-url http://localhost:8000