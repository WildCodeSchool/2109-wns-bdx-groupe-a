import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CustomContext } from "../custom-context";

import CreateUserInput from "../inputs/User/CreateUserInput";
import DeleteUserInput from "../inputs/User/DeleteUserInput";
import SignUpInput from "../inputs/User/Login/SignUpInput";
import UpdateUserInput from "../inputs/User/UpdateUserInput";
import User from "../models/User";
import SignInInput from '../inputs/User/Login/SignInInput';
import UserRepository from "./UserRepository";


@Resolver(User)

export default class UserResolver {
    @Query(() => [User]) 
    getUsers() {
        return User.find()
    }

    @Mutation(() => User)
    async createUser(@Args() { firstName, lastName, email, password, role}: CreateUserInput){
            const newUser = new User();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.password = password;
            newUser.role = role;
    
            await newUser.save();
            return newUser;
    }

    @Mutation(() => User)
    async updateUser(@Args() { id, firstName, lastName, email, password, role} : UpdateUserInput){
        const userToUpdate = await User.findOneOrFail( { id } )


        const newData =  {

            firstName: firstName ?? userToUpdate.firstName,
            lastName: lastName ?? userToUpdate.lastName,
            email: email ?? userToUpdate.email,
            password: password ?? userToUpdate.password,
            role: role ?? userToUpdate.role
        }

        Object.assign(userToUpdate, newData)
        await userToUpdate.save()

        return userToUpdate
    }

    @Mutation(() => User)
    async deleteUser(@Args() { id } : DeleteUserInput){
        const userToDelete = await User.findOneOrFail({ id })
        if (!userToDelete) {
            throw new Error('No user founded')
        }

        await userToDelete.remove()
        return userToDelete
    }

    @Mutation(() => User)
    async signUp(
        @Args() { firstName, lastName, email, password }: SignUpInput
    ): Promise<User | undefined> {
        return UserRepository.signUp(firstName, lastName, email, password);
    }

    @Mutation(() => User)
    async signIn(
        @Args() { email, password }: SignInInput,
        @Ctx() { onSessionCreated }: CustomContext
    ): Promise<User | undefined> {
        return UserRepository.signIn(email, password, onSessionCreated);
    }

    @Query(() => User, {nullable: true })
    async myProfile(@Ctx() { user }: CustomContext) : Promise<User | null> {
        return user;
    }


}