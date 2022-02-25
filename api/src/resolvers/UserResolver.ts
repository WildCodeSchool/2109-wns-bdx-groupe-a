import { Args, Mutation, Query, Resolver } from "type-graphql";

import CreateUserInput from "../inputs/User/CreateUserInput";
import DeleteUserInput from "../inputs/User/DeleteUserInput";
import UpdateUserInput from "../inputs/User/UpdateUserInput";
import User from "../models/User";


@Resolver()
export class UserResolver {
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

        let newData =  {
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
}