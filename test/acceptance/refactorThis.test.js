const axios = require("axios");

const { API_HOST } = process.env;

const headers = {
  "Content-type": "application/json"
};

describe("Refacor This Acceptance Test", () => {
  let productId;
  describe.only("Product", () => {
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
  });

  describe("Product Option", () => {
    const productOptionPostBody = {
      productOptionName: "testProudctOption",
      description: "testProudctOption desctiption"
    };

    let optionId;

    describe("Product - Post", () => {
      test("should successfully create a Product", async () => {
        const axiosParams = {
          method: "post",
          url: `${API_HOST}/api/products/{productId}/options`,
          headers,
          data: productOptionPostBody
        };

        const proudctPostResponse = await axios(axiosParams);
        const productCreated = proudctPostResponse.data;

        expect(proudctPostResponse.status).toEqual(201);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            id: expect.anything(),
            productName: "testProduct - acceptance test",
            description: "testProduct description",
            price: 1,
            deliveryPrice: 1
          })
        );

        // Assign the Product Id for the next GET call
        id = productCreated.id;
      });
    });

    describe("Product - Get by Id", () => {
      test("should successfully return a Product", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products/${id}`
        });

        expect(productGetResponse.status).toEqual(200);
        expect(productGetResponse.data).toMatchObject({
          productName: "testProduct - acceptance test",
          description: "testProduct description",
          id,
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
              id,
              price: 1,
              productName: "testProduct - acceptance test"
            }
          ])
        );
      });
    });
  });
});
