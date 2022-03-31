import { createServer } from 'http';
import 'reflect-metadata';


import getDatabaseConnection from './database-connection';
import getExpressServer from "./express-server";

const dotenv = require('dotenv');

dotenv.config();

async function main() {
  if (!process.env.DATABASE_URL) {
    throw Error('DATABASE_URL must be set in environment.');
  }

  await getDatabaseConnection(process.env.DATABASE_URL);
  console.log('Connected to database');

  const { expressServer, apolloServer } = await getExpressServer();


  const server = createServer(expressServer);

  await server.listen(4000);
  console.log(`Server has started on localhost:4000${apolloServer.graphqlPath} !`);
}

main();
