import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import User from './models/User';
import Task from './models/Task';
import Project from './models/Project';
import Comment from './models/Comment';
import AppUser from "./models/AppUser";

dotenv.config();

const getDatabaseConnection = async (url: string) => {
  await createConnection({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: [User, Task, Project, Comment, AppUser],
    synchronize: true,
    logging: true
  });
};

export default getDatabaseConnection;
