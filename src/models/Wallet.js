const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");

const WalletSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  id: { type: String },
});

WalletSchema.pre("save", function (next) {
  if (this.isNew) {
    this.id = uuid();
  }

  next();
});

WalletSchema.methods.toJSON = function () {
  const walletObj = this.toObject();
  delete walletObj.__v;
  delete walletObj._id;
  return walletObj;
};

WalletSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});

module.exports = model("Wallet", WalletSchema);
