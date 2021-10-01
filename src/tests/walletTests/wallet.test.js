/* eslint-disable no-undef */
const { Response } = require("http-status-codez");
const TestAxios = require("../testUtilities/TestAxios");
const dbHandler = require("../testUtilities/testDBHandler");
const generateUuid = require("../../utils/lib/generateUUID");

const axios = new TestAxios();

beforeAll(async () => {
  mongod = await dbHandler.connect();
});

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase(mongod);
});

describe("wallet creation and retrieval tests", () => {
  it("should return a 204 response and the created wallet", async () => {
    const response = await axios.post("/wallets");

    const { statusCode, body } = response;
    const { message, data } = body;

    expect(statusCode).toEqual(Response.HTTP_CREATED);
    expect(message).toEqual("Wallet created successfully.");
    expect(data).toHaveProperty("balance");
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("status");

    const { balance, status } = data;

    expect(balance).toEqual(0);
    expect(status).toEqual("active");
  });

  it("should return a 200 HTTP OK response and an array of wallets", async () => {
    await axios.post("/wallets");

    const response = await axios.get("/wallets");

    const { statusCode, body } = response;
    const { message, data } = body;

    expect(statusCode).toEqual(Response.HTTP_OK);
    expect(message).toEqual("Wallets retrieved successfully.");
    expect(data).toBeTruthy();
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("status");
    expect(data[0]).toHaveProperty("balance");
  });

  it("should return a 404 HTTP Not Found Error when an invalid ID is passed", async () => {
    const invalidID = generateUuid();

    const response = await axios.get(`/wallets/${invalidID}`);

    const { statusCode, body } = response;
    const { message } = body;

    expect(statusCode).toEqual(Response.HTTP_NOT_FOUND);
    expect(body).toHaveProperty("errors");
    expect(message).toEqual(`No wallet found with ID: ${invalidID}`);
  });

  it("should return a 200 HTTP Response and a wallet with the provided id", async () => {
    const postResponse = await axios.post("/wallets");
    const { body: postBody, statusCode: postStatusCode } = postResponse;

    expect(postStatusCode).toEqual(Response.HTTP_CREATED);

    const { data: postData } = postBody;
    expect(postData).toHaveProperty("id");
    expect(postData).toHaveProperty("balance");
    expect(postData).toHaveProperty("status");

    const { id } = postData;

    const getResponse = await axios.get(`/wallets/${id}`);
    const { body: getBody, statusCode: getStatusCode } = getResponse;

    expect(getStatusCode).toEqual(Response.HTTP_OK);

    const { data: getData } = getBody;

    expect(getData).toHaveProperty("id");
    expect(getData).toHaveProperty("balance");
    expect(getData).toHaveProperty("status");

    const { id: retrievedID } = getData;

    expect(id).toEqual(retrievedID);
  });
});
