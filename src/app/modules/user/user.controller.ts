import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { CreateUserValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const zodParsedData = CreateUserValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.getSingleUserFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const result = await UserServices.updateUserToDb(
      Number(userId),
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'Users updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.deleteSingleUserFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Users deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteSingleUser,
};
