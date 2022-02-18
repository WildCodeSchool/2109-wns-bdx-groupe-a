import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import User from '../models/User';

dotenv.config();

export default async (database: string, logging = false) => {
  await createConnection({
    type: 'sqlite',
    database,
    entities: [User],
    synchronize: true,
    logging
  });
};
