## Deploy/ Run Application

Pre-requisites software:
Node.js, Serverless, Mac env.

## Offline mode/ Local

To run the application in local,
./start-server.sh

To stop the application running in local env,
./stop-server.sh

To run the Acceptance tests,
./start-server.sh
API_HOST="http://localhost:3000" ./node_modules/.bin/jest

## Available Endpoints

1. `GET /products` - gets all products.
2. `GET /products?name={name}` - finds all products matching the specified name.
3. `GET /products/{id}` - gets the project that matches the specified ID - ID is a GUID.
4. `POST /products` - creates a new product.
5. `PUT /products/{id}` - updates a product.
6. `DELETE /products/{id}` - deletes a product and its options.
7. `GET /products/{id}/options` - finds all options for a specified product.
8. `GET /products/{id}/options/{optionId}` - finds the specified product option for the specified product.
9. `POST /products/{id}/options` - adds a new product option to the specified product.
10. `PUT /products/{id}/options/{optionId}` - updates the specified product option.
11. `DELETE /products/{id}/options/{optionId}` - deletes the specified product option.

## Debug in local env
Use the VS Code Debug option and set your launch.json. (sample provided in this project.)