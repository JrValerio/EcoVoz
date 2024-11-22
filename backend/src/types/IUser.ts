import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  picture?: string;
  createdAt: Date; // Adicione aqui
  updatedAt: Date; // Adicione aqui
  comparePassword?(password: string): Promise<boolean>;
}
