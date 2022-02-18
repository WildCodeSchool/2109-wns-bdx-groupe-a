import "reflect-metadata"
import { CommentResolver } from './resolvers/CommentResolver';
import { TaskResolver } from './resolvers/TaskResolver';
import { UserResolver } from "./resolvers/UserResolver";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import User from "./models/User";
import Task from "./models/Task";
import Project from "./models/Project";
import { ProjectResolver } from './resolvers/ProjectResolver';
import Comment from "./models/Comment";

const dotenv = require('dotenv');

dotenv.config();

async function main() {
  if( !process.env.DATABASE_URL ){
    throw Error("DATABASE_URL must be set in environment.");
  }


  await createConnection({
    type: "mysql",
    url: process.env.DATABASE_URL,
    entities: [User, Task, Project, Comment],
    synchronize: true, 
    logging: true
  });
  
  console.log("Connected to database");
  
  const schema = await buildSchema({ 
    resolvers: [UserResolver, TaskResolver, ProjectResolver, CommentResolver]
  });

  const server = new ApolloServer({ schema })


  await server.listen(4000)
  console.log("Server has started on localhost:4000 !");

}

main()