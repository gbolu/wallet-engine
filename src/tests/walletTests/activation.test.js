/* eslint-disable no-undef */
const dbHandler = require("../testUtilities/testDBHandler");

const {
  activateWallet,
  createWallet,
  deactivateWallet,
} = require("../testUtilities/walletUtilities");

beforeAll(async () => {
  mongod = await dbHandler.connect();
});

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
  await dbHandler.closeDatabase(mongod);
});

describe("wallet activation tests", () => {
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
});
