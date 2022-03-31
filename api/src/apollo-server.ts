import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { Response } from "express";
import { parse } from 'cookie';
import { buildSchema } from 'type-graphql';

import AppUserSessionRepository from './resolvers/AppUserSessionRepository';
import CommentResolver from './resolvers/CommentResolver';
import ProjectResolver from './resolvers/ProjectResolver';
import AppUserResolver from "./resolvers/AppUserResolver";
import TaskResolver from './resolvers/TaskResolver';
import UserResolver from './resolvers/UserResolver';
import { CustomContext } from './custom-context';



const setSessionIdInCookies = (res: Response) => (sessionId: string) => {
  res.cookie("sessionId", sessionId, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days todo : à refaire
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

const setUpContext = async (
  context: ExpressContext
): Promise<CustomContext> => {
  const { sessionId } = parse(context.req.headers.cookie || "");

  return {
    onSessionCreated: setSessionIdInCookies(context.res),
    appUser: sessionId
      ? await AppUserSessionRepository.getUser(sessionId)
      : null,
  };
};
  


export default async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver, ProjectResolver, CommentResolver, AppUserResolver]
  });
  const server = new ApolloServer({ schema, context: setUpContext });
  return { server, schema };
};
