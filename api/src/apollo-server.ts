import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import CommentResolver from './resolvers/CommentResolver';
import ProjectResolver from './resolvers/ProjectResolver';
import TaskResolver from './resolvers/TaskResolver';
import UserResolver from './resolvers/UserResolver';



export default async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver, ProjectResolver, CommentResolver]
  });
  const server = new ApolloServer({ schema });
  return server;
};
