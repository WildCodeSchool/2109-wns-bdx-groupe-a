import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import Project from './models/Project';
import Comment from './models/Comment';
import AppUser from "./models/AppUser";
import User from './models/User';
import Task from './models/Task';
import AppUserSession from './models/AppUserSession';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDatabaseConnection = async (url: string) => {
  await createConnection({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: [User, Task, Project, Comment, AppUser, AppUserSession],
    synchronize: true,
    logging: true
  });
};

export default getDatabaseConnection;
