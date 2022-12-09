import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = function () {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
};

const User = mongoose.model('User', userSchema);

export function validateInput(userData) {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: new PasswordComplexity(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(userData);
}

export default User;
