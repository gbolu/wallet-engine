const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

walletSchema.methods.toJSON = function () {
  const walletObj = this.toObject();
  delete walletObj._owner;
  delete walletObj.__v;
  return walletObj;
};

walletSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = model("Wallet", walletSchema);
