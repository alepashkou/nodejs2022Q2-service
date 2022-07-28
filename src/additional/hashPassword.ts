import * as bcrypt from 'bcrypt';

export const genHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.SALT_SIZE, +process.env.CRYPT_SALT),
  );
  const result = await bcrypt.hash(password, salt);
  return result;
};

export const comparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
