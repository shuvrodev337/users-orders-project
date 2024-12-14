export interface IUserFullName {
  firstName: string;
  lastName: string;
}
export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}
export interface IUserAddress {
  street: string;
  city: string;
  country: string;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IUserAddress;
  orders: IOrder[];
  isDeleted?: boolean;
}
export interface IUpdateUserFullName {
  firstName?: string;
  lastName?: string;
}

export interface IUpdateUserAddress {
  street?: string;
  city?: string;
  country?: string;
}

export interface IUpdateOrder {
  productName?: string;
  price?: number;
  quantity?: number;
}

export interface IUpdateUser {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: IUpdateUserFullName;
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: IUpdateUserAddress;
  orders?: IUpdateOrder[];
  isDeleted?: boolean;
}
