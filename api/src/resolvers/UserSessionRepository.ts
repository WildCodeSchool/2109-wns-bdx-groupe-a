import { getRandomHexID } from "../utils";
import User from "../models/User";
import UserSession from '../models/UserSession';

class UserSessionRepository extends UserSession {
  static async createNew(user: User): Promise<UserSession> {
    try {
      const id = getRandomHexID();
      const session = new UserSession();
      session.id = id;
      session.user = user;
      await session.save();
      return session;
    } catch (error) {
      return UserSessionRepository.createNew(user);
    }
  }

  static async getUser(sessionId: string): Promise<User | null> {
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: ["user"]
    });

    return session?.user || null;
  }

  static async deleteSession(sessionId: string): Promise<void> {
    await UserSession.delete({ id: sessionId });
  }
}

export default UserSessionRepository;