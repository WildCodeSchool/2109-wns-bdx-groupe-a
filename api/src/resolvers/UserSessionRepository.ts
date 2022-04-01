import UserSession from "../models/AppUserSession";
import { getRandomHexID } from "../utils";
import User from "../models/User";

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
    console.log(sessionId);
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: ["user"]
    });

    console.log(session)

    return session?.user || null;
  }
}

export default UserSessionRepository;