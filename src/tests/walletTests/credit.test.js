/* eslint-disable no-undef */
const dbHandler = require("../testUtilities/testDBHandler");

const {
  createWallet,
  creditWallet,
} = require("../testUtilities/walletUtilities");

beforeAll(async () => {
  mongod = await dbHandler.connect();
});

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase(mongod);
});

describe("wallet credit tests", () => {
  it("should return 200 HTTP response and a wallet with a balance of 200", async () => {
    const wallet = await createWallet();
    const { id: walletID } = wallet;

    const creditedWallet = await creditWallet(walletID);

    const { balance } = creditedWallet;

    expect(balance).toEqual(200);
  });
});
