import 'reflect-metadata';

import getApolloServer from './apollo-server';
import getDatabaseConnection from './database-connection';

const dotenv = require('dotenv');

dotenv.config();
async function main() {
  if (!process.env.DATABASE_URL) {
    throw Error('DATABASE_URL must be set in environment.');
  }

  await getDatabaseConnection(process.env.DATABASE_URL);
  console.log('Connected to database');

  const server = await getApolloServer();

  await server.listen(4000);
  console.log('Server has started on localhost:4000 !');
}

main();
