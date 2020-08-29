import * as bcrypt from 'bcrypt';
import { config } from '../config/app.config';

export async function Compare(plainText: string, hash: string) {
  return await bcrypt.compare(plainText, hash);
}

export async function Hash(plainText: string) {
  return bcrypt.hash(plainText, parseInt(config.salt_rounds, 10));
}
