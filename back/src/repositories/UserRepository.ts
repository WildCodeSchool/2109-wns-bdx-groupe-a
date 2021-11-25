import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User.model.js';

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
