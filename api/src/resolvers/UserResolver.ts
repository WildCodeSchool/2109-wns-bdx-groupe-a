import { Args, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import CreateUserInput from "../inputs/User/CreateUserInput";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";


@Resolver()
export class UserResolver {
    @Query(() => [User]) 
    users() {
        return User.find()
    }

    @Mutation(() => User)
    async createUser(@Args() { name, email, password, role}: CreateUserInput){
        const userRepository = getCustomRepository(UserRepository)
        
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.role = role;

        await userRepository.save(newUser);
        return newUser;
    }
}