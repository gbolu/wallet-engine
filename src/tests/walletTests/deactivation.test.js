/* eslint-disable no-undef */
const { Response } = require("http-status-codez");
const TestAxios = require("../testUtilities/TestAxios");
const dbHandler = require("../testUtilities/testDBHandler");

const {
  activateWallet,
  createWallet,
  deactivateWallet,
} = require("../testUtilities/walletUtilities");

const axios = new TestAxios();

beforeAll(async () => {
  mongod = await dbHandler.connect();
});

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase(mongod);
});

describe("wallet deactivation tests", () => {
  it("should return a 200 HTTP Response and a wallet with a status of 'inactive'", async () => {
    const wallet = await createWallet();

    const { id: walletID } = wallet;

    const deactivatedWallet = await deactivateWallet(walletID);
    expect(deactivatedWallet).toHaveProperty("id");
    expect(deactivatedWallet).toHaveProperty("status");
    expect(deactivatedWallet).toHaveProperty("balance");

    const { id: deactivatedWalletID, status } = deactivatedWallet;
    expect(deactivatedWalletID).toEqual(walletID);
    expect(status).toEqual("inactive");
  });

  it("should return a 200 HTTP Response and a wallet with a status of 'active'", async () => {
    const { id: walletID } = await createWallet();

    const deactivatedWallet = await deactivateWallet(walletID);

    expect(deactivatedWallet).toHaveProperty("id");
    expect(deactivatedWallet).toHaveProperty("status");
    expect(deactivatedWallet).toHaveProperty("balance");

    const { id: deactivatedWalletID, status: deactivatedWalletStatus } =
      deactivatedWallet;
    expect(deactivatedWalletID).toEqual(walletID);
    expect(deactivatedWalletStatus).toEqual("inactive");

    const activatedWallet = await activateWallet(deactivatedWalletID);

    const { id: activatedWalletID, status: activatedWalletStatus } =
      activatedWallet;

    expect(activatedWalletID).toEqual(deactivatedWalletID);
    expect(activatedWalletStatus).toEqual("active");
  });

  it("should return 403 forbidden when a deactivatedWallet is to be debited/credited", async () => {
    const wallet = await createWallet();
    const { id: walletID } = wallet;

    const deactivatedWallet = await deactivateWallet(walletID);

    const { id: deactivatedWalletID, status: deactivatedWalletStatus } =
      deactivatedWallet;
    expect(deactivatedWalletID).toEqual(walletID);
    expect(deactivatedWalletStatus).toEqual("inactive");

    const creditWalletResponse = await axios.patch(
      `/wallets/${walletID}/credit`,
      {}
    );
    const { body: creditWalletBody, statusCode: creditWalletStatusCode } =
      creditWalletResponse;

    expect(creditWalletStatusCode).toEqual(Response.HTTP_FORBIDDEN);

    const { message: creditWalletMessage } = creditWalletBody;

    expect(creditWalletMessage).toEqual(
      "Operation cannot be performed - wallet is not active."
    );

    const debitWalletResponse = await axios.patch(
      `/wallets/${walletID}/debit`,
      {}
    );
    const { body: debitWalletBody, statusCode: debitWalletStatusCode } =
      debitWalletResponse;

    expect(debitWalletStatusCode).toEqual(Response.HTTP_FORBIDDEN);

    const { message: debitWalletMessage } = debitWalletBody;

    expect(debitWalletMessage).toEqual(
      "Operation cannot be performed - wallet is not active."
    );
  });
});
