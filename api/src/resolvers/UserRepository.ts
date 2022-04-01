import { hash, compare } from "bcrypt";
import User from "../models/User";
import UserSessionRepository from "./UserSessionRepository";



class UserRepository extends User {
  static findByEmail = ( email: string ): Promise<User | undefined> => User.findOne({ where: { email } });

  static async signUp(
    firstName: string, 
    lastName: string,
    email: string,
    password: string
  ): Promise<User | undefined> {
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      throw Error("Could not sign up with provided email address.");
    }
    
    await User.insert({
      firstName, 
      lastName,
      email,
      password: await hash(password, 10),
    });
    return UserRepository.findByEmail(email);
  }

  static async signIn(
    email: string,
    password: string,
    onSessionCreated: (sessionId: string) => void
  ): Promise<User> {
    const COULD_NOT_SIGN_IN =
      "Could not sign in with provided email address and password.";

    const existingUser = await UserRepository.findByEmail(
      email
    );

    if (!existingUser) {
      throw Error(COULD_NOT_SIGN_IN);
    }
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (isPasswordCorrect) {
      const session = await UserSessionRepository.createNew(existingUser);
      onSessionCreated(session.id)
      return existingUser;
    }
    throw Error(COULD_NOT_SIGN_IN);
  }

  static async deleteSession(sessionId: string): Promise<void> {
    await UserSessionRepository.deleteSession(sessionId);
  }
}



export default UserRepository;