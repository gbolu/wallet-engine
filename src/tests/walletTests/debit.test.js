/* eslint-disable no-undef */
const { Response } = require("http-status-codez");
const TestAxios = require("../testUtilities/TestAxios");
const dbHandler = require("../testUtilities/testDBHandler");

const {
  createWallet,
  creditWallet,
} = require("../testUtilities/walletUtilities");

const axios = new TestAxios();

beforeAll(async () => {
  mongod = await dbHandler.connect();
});

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase(mongod);
});

describe("wallet debit tests", () => {
  it("should return a 400 HTTP Response when a wallet is to be debited with an amount higher than its balance", async () => {
    const wallet = await createWallet();
    const { id: walletID } = wallet;

    const debitWalletResponse = await axios.patch(
      `/wallets/${walletID}/debit`,
      { amount: 200 }
    );

    const { body: debitWalletBody, statusCode: debitWalletStatusCode } =
      debitWalletResponse;

    expect(debitWalletStatusCode).toEqual(Response.HTTP_BAD_REQUEST);

    const { message } = debitWalletBody;

    expect(message).toEqual(
      "Wallet balance is insufficient to perform operation."
    );
  });

  it("should return a 200 HTTP Response and a wallet with a lowered balance", async () => {
    const wallet = await createWallet();
    const { id: walletID } = wallet;

    await creditWallet(walletID);

    const debitWalletResponse = await axios.patch(
      `/wallets/${walletID}/debit`,
      {
        amount: 200,
      }
    );

    const { body: debitWalletBody, statusCode: debitWalletStatusCode } =
      debitWalletResponse;

    expect(debitWalletStatusCode).toEqual(Response.HTTP_OK);

    const { message, data: debitedWallet } = debitWalletBody;

    expect(message).toEqual("Wallet has been debited successfully.");

    const { balance } = debitedWallet;

    expect(balance).toEqual(0);
  });
});
