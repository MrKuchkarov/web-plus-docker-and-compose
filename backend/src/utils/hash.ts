import * as bcrypt from 'bcrypt';

export const hashPassword = (passport: string): Promise<string> => {
  return bcrypt.hash(passport, 10);
};
