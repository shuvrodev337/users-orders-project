import { z } from 'zod';

// FullName Validation Schema
export const FullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
});

// Address Validation Schema
export const AddressValidationSchema = z.object({
  street: z.string().trim().min(1, 'Street is required'),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required'),
});

// Order Validation Schema
export const OrderValidationSchema = z.object({
  productName: z.string().trim().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

// Create User Validation Schema
export const CreateUserValidationSchema = z.object({
  userId: z.number().min(1, 'User ID must be a positive number'),
  username: z.string().trim().min(1, 'Username is required'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long'),
  fullName: FullNameValidationSchema,
  age: z.number().min(0, 'Age must be a non-negative number'),
  email: z.string().trim().email('Invalid email address'),
  isActive: z.boolean(),
  hobbies: z.array(z.string().trim()).min(1, 'At least one hobby is required'),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema),
  isDeleted: z.boolean().optional(),
});

// Update User Validation Schema
export const UpdateUserValidationSchema = z.object({
  userId: z.number().min(1, 'User ID must be a positive number').optional(),
  username: z.string().trim().min(1, 'Username must not be empty').optional(),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
  fullName: FullNameValidationSchema.partial(), // Partial allows updating only part of the object
  age: z.number().min(0, 'Age must be a non-negative number').optional(),
  email: z.string().trim().email('Invalid email address').optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string().trim()).optional(),
  address: AddressValidationSchema.partial(), // Partial allows updating only part of the object
  orders: z.array(OrderValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
});
