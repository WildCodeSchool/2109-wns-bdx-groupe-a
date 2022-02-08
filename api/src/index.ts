import "reflect-metadata"
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";
const dotenv = require('dotenv');

const { createConnection, getConnectionOptions } = require('typeorm');


dotenv.config();

async function main() {
  if( !process.env){
    throw Error("DATABASE_URL must be set in environment.");
  }

  await createConnection({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['./models/*.ts'],
    synchronise: true, 
    logging: true
  });
  
  console.log("Connected to database");
  
  const schema = await buildSchema({ 
    resolvers: [UserResolver]
  });

  const server = new ApolloServer({ schema })


  await server.listen(4000)
  console.log("Server has started on localhost:4000 !");

}

main()