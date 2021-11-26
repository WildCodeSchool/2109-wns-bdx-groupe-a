import { Resolver, Query, Mutation, Args } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import User from '../models/User.model.js';
import UserRepository from '../repositories/UserRepository.js';
import DeleteUserInput from '../types/User/DeleteUserInput.js';
import PostUserInput from '../types/User/PostUserInput.js';
import UpdateUserInput from '../types/User/UpdateUserInput.js';

@Resolver(User)
class UserResolver {
  // GET all user

  @Query(() => [User])
  async Users() {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();

    return users;
  }

  @Mutation(() => User)
  async AddUser(@Args() { name, email, password, role }: PostUserInput) {
    const userRepository = getCustomRepository(UserRepository);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;

    await userRepository.save(user);
    return user;
  }

  @Mutation(() => User)
  async UpdateUser(
    @Args() { id, name, email, password, role }: UpdateUserInput
  ) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneOrFail({ id });
    // on récupére l'utilisateur qui correspond a l'id qui est passé au niveau de la fonction

    await userRepository.update(user, {
      name: name ?? user.name,
      email: email ?? user.email,
      password: password ?? user.password,
      role: role ?? user.role,
    });
    // MAJ avec les nouvelles données passées en parametres de la fonction

    const userUpdate = await userRepository.findOne({ id });
    // on recup l'utilisateur avec les données mise a jour

    return userUpdate;
  }

  @Mutation(() => User)
  async DeleteUser(@Args() { id }: DeleteUserInput) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneOrFail({ id });

    await userRepository.remove(user);

    return user;
  }
}

export default UserResolver;
