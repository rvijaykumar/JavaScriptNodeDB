/**
 * Acceptance Tests
 *
 * TODO: should use mocha or cocumber and create reusable components
 */
const axios = require("axios");

const { API_HOST } = process.env;

const headers = {
  "Content-type": "application/json"
};

describe("Refacor This Acceptance Test", () => {
  let productId;
  const productOptionPostBody = {
    productOptionName: "testProudctOption",
    description: "testProudctOption desctiption"
  };

  describe("Product", () => {
    const productPostBody = {
      productName: "testProduct - acceptance test",
      description: "testProduct description",
      price: 1,
      deliveryPrice: 1
    };

    describe("Product - Post", () => {
      test("should successfully create a Product", async () => {
        const axiosParams = {
          method: "post",
          url: `${API_HOST}/api/products`,
          headers,
          data: productPostBody
        };

        const proudctPostResponse = await axios(axiosParams);
        const productCreated = proudctPostResponse.data;

        expect(proudctPostResponse.status).toEqual(201);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            productId: expect.anything(),
            productName: "testProduct - acceptance test",
            description: "testProduct description",
            price: 1,
            deliveryPrice: 1
          })
        );

        // Assign the Product Id for the next GET call
        productId = productCreated.productId;
      });
    });

    describe("Product - Get by Id", () => {
      test("should successfully return a Product", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products/${productId}`
        });

        expect(productGetResponse.status).toEqual(200);
        expect(productGetResponse.data).toMatchObject({
          productName: "testProduct - acceptance test",
          description: "testProduct description",
          productId,
          deliveryPrice: 1,
          price: 1
        });
      });
    });

    describe("Product - Get by name", () => {
      test("should successfully return a Product", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products?productName=testProduct - acceptance test`
        });

        expect(productGetResponse.status).toEqual(200);
        expect(productGetResponse.data).toEqual(
          expect.arrayContaining([
            {
              deliveryPrice: 1,
              description: "testProduct description",
              productId,
              price: 1,
              productName: "testProduct - acceptance test"
            }
          ])
        );
      });
    });

    describe("Product - Get All", () => {
      test("should successfully return a Product", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products`
        });

        expect(productGetResponse.status).toEqual(200);
        expect(productGetResponse.data).toEqual(
          expect.arrayContaining([
            {
              deliveryPrice: 1,
              description: "testProduct description",
              productId,
              price: 1,
              productName: "testProduct - acceptance test"
            }
          ])
        );
      });
    });

    describe("Product - Put", () => {
      test("should successfully update a Product", async () => {
        const axiosParams = {
          method: "put",
          url: `${API_HOST}/api/products/${productId}`,
          headers,
          data: {
            productName: "UPDATED!!"
          }
        };

        const response = await axios(axiosParams);
        const productCreated = response.data;

        expect(response.status).toEqual(200);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            productId: expect.anything(),
            productName: "UPDATED!!",
            description: "testProduct description",
            price: 1,
            deliveryPrice: 1
          })
        );
      });
    });
  });

  describe("Product Option", () => {
    let optionId;

    describe("Product Option - Post", () => {
      test("should successfully create a Product Option", async () => {
        const axiosParams = {
          method: "post",
          url: `${API_HOST}/api/products/${productId}/options`,
          headers,
          data: productOptionPostBody
        };

        const proudctPostResponse = await axios(axiosParams);
        const productCreated = proudctPostResponse.data;

        expect(proudctPostResponse.status).toEqual(201);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            productId: expect.anything(),
            optionId: expect.anything(),
            productOptionName: "testProudctOption",
            description: "testProudctOption desctiption"
          })
        );

        // Assign the Product Id for the next GET call
        optionId = productCreated.optionId;
      });
    });

    describe("Product Option - Get by Id", () => {
      test("should successfully return a Product Option", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products/${productId}/options/${optionId}`
        });

        expect(productGetResponse.status).toEqual(200);
        expect(productGetResponse.data).toMatchObject({
          productId: expect.anything(),
          optionId: expect.anything(),
          productOptionName: "testProudctOption",
          description: "testProudctOption desctiption"
        });
      });
    });

    describe("Product Option - Get all Options for the given Product Id ", () => {
      test("should successfully return all Product Options for the given Product Id", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products/${productId}/options`
        });

        expect(productGetResponse.status).toEqual(200);
        expect(productGetResponse.data).toEqual(
          expect.arrayContaining([
            {
              productId: expect.anything(),
              optionId: expect.anything(),
              productOptionName: "testProudctOption",
              description: "testProudctOption desctiption"
            }
          ])
        );
      });
    });

    describe("Product Option - Put", () => {
      test("should successfully update a Product Option", async () => {
        const axiosParams = {
          method: "put",
          url: `${API_HOST}/api/products/${productId}/options/${optionId}`,
          headers,
          data: {
            productOptionName: "UPDATED PRODUCT OPTION!!"
          }
        };

        const response = await axios(axiosParams);
        const productCreated = response.data;

        expect(response.status).toEqual(200);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            productId: expect.anything(),
            optionId: expect.anything(),
            productOptionName: "UPDATED PRODUCT OPTION!!",
            description: "testProudctOption desctiption"
          })
        );
      });
    });
  });

  describe("Product & Product Option - DELETE", () => {
    let toDeleteOptionId;
    describe("Product Option - Create to Delete", () => {
      test("should successfully create a Product Option for delete operation", async () => {
        const axiosParams = {
          method: "post",
          url: `${API_HOST}/api/products/${productId}/options`,
          headers,
          data: productOptionPostBody
        };

        const proudctPostResponse = await axios(axiosParams);
        const productCreated = proudctPostResponse.data;

        expect(proudctPostResponse.status).toEqual(201);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            productId: expect.anything(),
            optionId: expect.anything(),
            productOptionName: "testProudctOption",
            description: "testProudctOption desctiption"
          })
        );

        toDeleteOptionId = productCreated.optionId;
      });
    });

    describe("Product Option - Delete ", () => {
      test("should successfully delete an Option", async () => {
        const axiosParams = {
          method: "delete",
          url: `${API_HOST}/api/products/${productId}/options/${toDeleteOptionId}`,
          headers,
          data: {}
        };

        const response = await axios(axiosParams);

        expect(response.status).toEqual(200);
      });
    });

    describe("Product - Delete and its Options", () => {
      test("should successfully update a Product and its Options", async () => {
        const axiosParams = {
          method: "delete",
          url: `${API_HOST}/api/products/${productId}`,
          headers,
          data: {}
        };

        const response = await axios(axiosParams);

        expect(response.status).toEqual(200);
      });
    });
  });
});
