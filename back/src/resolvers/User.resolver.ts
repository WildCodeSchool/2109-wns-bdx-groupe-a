import { Resolver, Query } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import User from '../models/User.model.js';
import UserRepository from '../repositories/UserRepository.js';

@Resolver(User)
class UserResolver {
  // GET all user

  @Query(() => [User])
  async Users() {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();

    return users;
  }
}

export default UserResolver;
