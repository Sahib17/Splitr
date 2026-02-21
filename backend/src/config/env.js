import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "SALT_ROUNDS"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
};

export default env;
