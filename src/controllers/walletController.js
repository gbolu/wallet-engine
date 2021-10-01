const { Response } = require("http-status-codez");
const catchAsync = require("../utils/lib/catchAsync");
const WalletDAO = require("../dao/WalletDAO");
const successResponse = require("../utils/lib/responseHandlers/successResponse");
const AppError = require("../utils/lib/appError");

exports.createWallet = catchAsync(async (req, res, next) => {
  const wallet = await WalletDAO.createWallet();

  await WalletDAO.persist(wallet);

  successResponse(
    wallet,
    "Wallet created successfully.",
    Response.HTTP_CREATED,
    res
  );
});

exports.getSingleWallet = catchAsync(async (req, res, next) => {
  const { walletID } = req.params;

  const wallet = await WalletDAO.findWallet(walletID);

  successResponse(
    wallet,
    "Wallet retrieved successfully.",
    Response.HTTP_OK,
    res
  );
});

exports.getAllWallets = catchAsync(async (req, res, next) => {
  const wallets = await WalletDAO.getAllWallets();

  successResponse(
    wallets,
    "Wallets retrieved successfully.",
    Response.HTTP_OK,
    res
  );
});

exports.deactivateWallet = catchAsync(async (req, res, next) => {
  const { walletID } = req.params;

  const wallet = await WalletDAO.findWallet(walletID);

  wallet.status = "inactive";

  await WalletDAO.persist(wallet);

  successResponse(
    wallet,
    "Wallet deactivated successfully.",
    Response.HTTP_OK,
    res
  );
});

exports.activateWallet = catchAsync(async (req, res, next) => {
  const { walletID } = req.params;

  const wallet = await WalletDAO.findWallet(walletID);

  wallet.status = "active";

  await WalletDAO.persist(wallet);

  successResponse(
    wallet,
    "Wallet activated successfully.",
    Response.HTTP_OK,
    res
  );
});

exports.debitWallet = catchAsync(async (req, res, next) => {
  const { walletID } = req.params;
  const { amount } = req.body;

  const wallet = await WalletDAO.findWallet(walletID);

  if (wallet.status !== "active") {
    throw new AppError(
      "Operation cannot be performed - wallet is not active.",
      Response.HTTP_FORBIDDEN
    );
  }

  if (wallet.balance < amount) {
    throw new AppError(
      "Wallet balance is insufficient to perform operation.",
      Response.HTTP_BAD_REQUEST
    );
  }

  wallet.balance -= amount;

  await WalletDAO.persist(wallet);

  successResponse(
    wallet,
    "Wallet has been debited successfully.",
    Response.HTTP_OK,
    res
  );
});

exports.creditWallet = catchAsync(async (req, res, next) => {
  const { walletID } = req.params;
  const { amount } = req.body;

  const wallet = await WalletDAO.findWallet(walletID);

  if (wallet.status !== "active") {
    throw new AppError(
      "Operation cannot be performed - wallet is not active.",
      Response.HTTP_FORBIDDEN
    );
  }

  wallet.balance += amount;

  await WalletDAO.persist(wallet);

  successResponse(
    wallet,
    "Wallet has been credited successfully.",
    Response.HTTP_OK,
    res
  );
});
