const { Response } = require("http-status-codez");
const Wallet = require("../models/Wallet");
const AppError = require("../utils/lib/appError");

class WalletDAO {
  static async createWallet() {
    return await Wallet.create({});
  }

  static async findWallet(walletID) {
    const wallet = await Wallet.findOne({ id: walletID });

    if (!wallet) {
      throw new AppError(
        `No wallet found with ID: ${walletID}`,
        Response.HTTP_NOT_FOUND
      );
    }

    return wallet;
  }

  static async getAllWallets() {
    return await Wallet.find({});
  }

  static async persist(wallet) {
    if (!(await wallet.save())) {
      throw new AppError(
        "An error occurred. Please try again.",
        Response.HTTP_INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = WalletDAO;
