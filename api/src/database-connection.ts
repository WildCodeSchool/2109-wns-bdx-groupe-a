import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import User from './models/User';

dotenv.config();

const getDatabaseConnection = async (url: string, logging = false) => {
  await createConnection({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: [User],
    synchronize: true,
    logging: true
  });
};

export default getDatabaseConnection;
