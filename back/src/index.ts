import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import { createConnection, getConnectionOptions } from 'typeorm';
import 'reflect-metadata';
import UserResolver from './resolvers/User.resolver.js';
import User from './models/User.model.js';
import Project from './models/Project.model.js';
import ProjectResolver from './resolvers/Project.resolver.js';
import TaskResolver from './resolvers/Task.resolver.js';
import Task from './models/Task.model.js';
import Comment from './models/Comment.model.js';
import CommentResolver from './resolvers/Comment.resolver.js';

dotenv.config();

const ServerRun = async () => {
  // connection database
  const connectionOptions = await getConnectionOptions();

  await createConnection({
    ...connectionOptions,
    entities: [User, Project, Task, Comment],
    synchronize: true,
    logging: true,
  });

  console.log('Connected to database');

  const schema = await buildSchema({ resolvers: [UserResolver, ProjectResolver, TaskResolver, CommentResolver] });
  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

ServerRun();
