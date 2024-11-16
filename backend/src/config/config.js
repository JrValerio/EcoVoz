import dotenv from 'dotenv';
dotenv.config();
export const config = {
  mongoUri: process.env.MONGO_URI || '',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
};
