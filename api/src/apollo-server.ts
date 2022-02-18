import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { UserResolver } from './resolvers/UserResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { TaskResolver } from './resolvers/TaskResolver';
import { ProjectResolver } from './resolvers/ProjectResolver';

export default async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver, ProjectResolver, CommentResolver]
  });
  const server = new ApolloServer({ schema });
  return server;
};
