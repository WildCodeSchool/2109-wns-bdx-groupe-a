import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import UserResolver from './resolvers/User.resolver.js';
import User from './models/User.model.js';
import { createConnection, getConnectionOptions } from 'typeorm';

dotenv.config();

const ServerRun = async () => {
  // connection database
  const connectionOptions = await getConnectionOptions();

  await createConnection({
    ...connectionOptions,
    entities: [User],
    synchronize: true,
    logging: true,
  });

  console.log('Connected to database');

  const schema = await buildSchema({ resolvers: [UserResolver] });
  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen(process.env.PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

ServerRun();
