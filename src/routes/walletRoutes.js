const { Router } = require("express");

const walletRouter = Router();
const {
  createWallet,
  getAllWallets,
  getSingleWallet,
  deactivateWallet,
  activateWallet,
  debitWallet,
  creditWallet,
} = require("../controllers/walletController");

walletRouter.route("/").post(createWallet).get(getAllWallets);
walletRouter.get("/:walletID", getSingleWallet);

walletRouter.patch("/:walletID/deactivate", deactivateWallet);
walletRouter.patch("/:walletID/activate", activateWallet);

walletRouter.patch("/:walletID/debit", debitWallet);
walletRouter.patch("/:walletID/credit", creditWallet);
module.exports = walletRouter;
