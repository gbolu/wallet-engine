const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Please provide your first name!"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Please provide your last name!"],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please provide your username!"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password!"],
    minlength: [4, "Password must be minimum of four (4) charcters"],
    select: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

/*
 ** REMOVE SOME ATTRIBUTES ON THE OUTPUT OF USER's OBJECT
 */
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.active;
  delete userObject.__v;
  return userObject;
};

UserSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

UserSchema.methods.isValidPassword = async function (
  userEnteredPassword,
  userSavedPassword
) {
  return await bcrypt.compare(userEnteredPassword, userSavedPassword);
};

module.exports = model("User", UserSchema);
