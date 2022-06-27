import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import User from '../models/User';
import Task from '../models/Task';
import Project from '../models/Project';
import Comment from '../models/Comment';

dotenv.config();

const getDatabaseTestConnection = async (url: string) => {
  await createConnection({
    type: 'mysql',
    url: url || process.env.TEST_DATABASE_URL,
    entities: [User, Task, Project, Comment],
    synchronize: true,
    logging: false
  });
};

export default getDatabaseTestConnection;
