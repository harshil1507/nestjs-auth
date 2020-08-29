import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongo_url: process.env.MONGO_URL,
};
