var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import UserResolver from './resolvers/User.resolver.js';
import User from './models/User.model.js';
import { createConnection, getConnectionOptions } from 'typeorm';
dotenv.config();
const ServerRun = () => __awaiter(void 0, void 0, void 0, function* () {
    // connection database
    const connectionOptions = yield getConnectionOptions();
    yield createConnection(Object.assign(Object.assign({}, connectionOptions), { entities: [User], synchronize: true, logging: true }));
    console.log('Connected to database');
    const schema = yield buildSchema({ resolvers: [UserResolver] });
    const server = new ApolloServer({ schema });
    // The `listen` method launches a web server.
    server.listen(process.env.PORT).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
});
ServerRun();
