import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongo_url: process.env.MONGO_URL,
  app_port: process.env.APP_PORT,
  jwt_secret: process.env.JWT_SECRET,
  salt_rounds: process.env.SALT_ROUNDS
};
