/* eslint-disable no-undef */
const { Response } = require("http-status-codez");
const TestAxios = require("./TestAxios");

const axios = new TestAxios();

const createWallet = async () => {
  await axios.post("/wallets");

  const getAllResponse = await axios.get("/wallets");
  const { body: getAllBody, statusCode: getAllStatusCode } = getAllResponse;

  expect(getAllStatusCode).toEqual(Response.HTTP_OK);

  const { data: getAllData } = getAllBody;

  expect(getAllData).toBeTruthy();
  expect(getAllData).toHaveLength(1);

  return getAllData[0];
};

const deactivateWallet = async (walletID) => {
  const deactivateWalletResponse = await axios.patch(
    `/wallets/${walletID}/deactivate`,
    {}
  );
  const { body: deactivateWalletBody, statusCode: deactivateWalletStatusCode } =
    deactivateWalletResponse;

  expect(deactivateWalletStatusCode).toEqual(Response.HTTP_OK);

  const { data: deactivatedWallet } = deactivateWalletBody;
  return deactivatedWallet;
};

const activateWallet = async (walletID) => {
  const activateWalletResponse = await axios.patch(
    `/wallets/${walletID}/activate`,
    {}
  );
  const { body: activateWalletBody, statusCode: activateWalletStatusCode } =
    activateWalletResponse;

  expect(activateWalletStatusCode).toEqual(Response.HTTP_OK);

  const { data: activatedWallet } = activateWalletBody;
  return activatedWallet;
};

const creditWallet = async (walletID) => {
  const creditWalletResponse = await axios.patch(
    `/wallets/${walletID}/credit`,
    {
      amount: 200,
    }
  );

  const { body: creditWalletBody, statusCode: creditWalletStatusCode } =
    creditWalletResponse;

  expect(creditWalletStatusCode).toEqual(Response.HTTP_OK);

  const { data: creditedWallet, message } = creditWalletBody;

  expect(message).toEqual("Wallet has been credited successfully.");

  return creditedWallet;
};

module.exports = {
  activateWallet,
  createWallet,
  deactivateWallet,
  creditWallet,
};
