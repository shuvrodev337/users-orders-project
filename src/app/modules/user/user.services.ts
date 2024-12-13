import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};
export const UserServices = {
  createUserIntoDb,
};
