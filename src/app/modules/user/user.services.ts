import { IUpdateUser, IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};
const getUsersFromDb = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDb = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};
const updateUserToDb = async (userId: number, updateUser: IUpdateUser) => {
  const result = await User.findOneAndUpdate(
    { userId: userId, isDeleted: { $ne: true } },
    { $set: updateUser },
    { new: true },
  );
  return result;
};
const deleteSingleUserFromDb = async (userId: number) => {
  const result = await User.findOneAndUpdate(
    { userId: userId, isDeleted: { $ne: true } },
    { isDeleted: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getUsersFromDb,
  getSingleUserFromDb,
  deleteSingleUserFromDb,
  updateUserToDb,
};
