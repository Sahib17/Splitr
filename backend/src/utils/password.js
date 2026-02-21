import bcrypt from "bcrypt";
import env from "../config/env";

const hash = async (password) => {
  return await bcrypt.hash(password, env.SALT_ROUNDS);
};

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const password = {
  hash,
  compare,
};
