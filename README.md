## Deploy/ Run Application

Pre-requisites software:
Node.js, Serverless, Mac env.

Make sure your local server is up and running to perform any GIT COMMIT.

## Offline mode/ Local

To run the application in local,
./start-server.sh

To stop the application running in local env,
./stop-server.sh

To run the Acceptance tests,
./start-server.sh
API_HOST="http://localhost:3000" ./node_modules/.bin/jest

## Available Endpoints (after full development is completed, but currently supported endpoints can be viewed at http://localhost:3000)

1. `GET /products` - gets all products.
2. `GET /products?name={name}` - finds all products matching the specified name.
3. `GET /products/{id}` - gets the project that matches the specified ID - ID is a GUID.
4. `POST /products` - creates a new product.
5. `PUT /products/{id}` - updates a product.
6. `DELETE /products/{id}` - deletes a product and its options.
7. `GET /products/{productId}/options` - finds all options for a specified product.
8. `GET /products/{productId}/options/{id}` - finds the specified product option for the specified product.
9. `POST /products/{productId}/options` - adds a new product option to the specified product.
10. `PUT /products/{productId}/options/{id}` - updates the specified product option.
11. `DELETE /products/{productId}/options/{id}` - deletes the specified product option.

## Debug in local env
Use the VS Code Debug option and set your launch.json. (sample provided in this project.)

## TODO
1. Proper HTTP status code (ref: https://developer.yahoo.com/social/rest_api_guide/http-response-codes.html)
2. More unit/ acceptance tests