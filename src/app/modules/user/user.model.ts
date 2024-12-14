import { Schema, model, connect, Model } from 'mongoose';
import {
  IOrder,
  IUser,
  IUserAddress,
  IUserFullName,
  UserModelForMethods,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const FullNameSchema = new Schema<IUserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<IUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<IUser, UserModelForMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: AddressSchema, required: true },
  orders: { type: [OrderSchema], required: true },
  isDeleted: { type: Boolean, default: false },
});

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// password field removal globally for any response
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password; // Remove password field from JSON responses
    return ret;
  },
});

UserSchema.set('toObject', {
  transform: function (doc, ret) {
    delete ret.password; // Remove password field from Object responses
    return ret;
  },
});
UserSchema.statics.doesUserExist = async function (userId: number) {
  const result = await User.findOne({ userId });
  return result;
};
export const User = model<IUser, UserModelForMethods>('User', UserSchema);
