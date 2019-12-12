const axios = require("axios");

const { API_HOST } = process.env;

const headers = {
  "Content-type": "application/json"
};

describe("Refacor This Acceptance Test", () => {
  describe("Product", () => {
    const productPostBody = {
      name: "testProduct",
      description: "testProduct description",
      price: 1,
      deliveryPrice: 1
    };
    const productGet = {};
    let id;

    describe("Product - Post", () => {
      test.only("should successfully create a Product", async () => {
        const axiosParams = {
          method: "post",
          url: `${API_HOST}/api/products`,
          headers,
          data: productPostBody
        };
        console.log(axiosParams);

        const proudctPostResponse = await axios(axiosParams);
        const productCreated = proudctPostResponse.data;

        expect(proudctPostResponse.status).toEqual(201);
        expect(productCreated).toMatchObject(
          expect.objectContaining({
            id: expect.anything(),
            name: "testProduct",
            description: "testProduct description",
            price: 1,
            deliveryPrice: 1
          })
        );

        // Assign the Product Id for the next GET call
        id = productCreated.id;
      });
    });

    describe("Product - Get", () => {
      test("should successfully return a Product", async () => {
        const productGetResponse = await axios({
          method: "get",
          url: `${API_HOST}/api/products/${id}`
        });

        expect(productGetResponse.status).toEqual(200);
      });
    });
  });
});
