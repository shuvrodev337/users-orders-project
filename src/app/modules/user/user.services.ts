import { IUpdateUser, IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (user: IUser) => {
  if (await User.doesUserExist(user.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(user);
  return result;
};
const getUsersFromDb = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDb = async (userId: number) => {
  const userExists = await User.doesUserExist(userId);
  if (!userExists) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    (error as any).description = 'User not found';
    throw error;
  }
  const result = await User.findOne({ userId });
  return result;
};
const updateUserToDb = async (userId: number, updateUser: IUpdateUser) => {
  const userExists = await User.doesUserExist(userId);
  if (!userExists) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    (error as any).description = 'User not found';
    throw error;
  }
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
  return result ? null : null;
};

export const UserServices = {
  createUserIntoDb,
  getUsersFromDb,
  getSingleUserFromDb,
  deleteSingleUserFromDb,
  updateUserToDb,
};
