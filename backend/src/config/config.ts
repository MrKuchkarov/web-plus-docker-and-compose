import dotenv from 'dotenv';

dotenv.config();

const {
  JWT_SECRET,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  SERVER_PORT = '',
} = process.env;
export default () => ({
  secretKey: JWT_SECRET,
  port: parseInt(SERVER_PORT, 10),
  db: {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,

    name: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  },
});
