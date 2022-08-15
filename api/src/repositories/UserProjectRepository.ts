import UserProject from "../models/UserProject";
import Project from "../models/Project";
import User from "../models/User";

class UserProjectRepository extends UserProject {
  static async findAll(user: User | null) {
    if (!user) {
      throw new Error("User is not logged in");
    }
    // eslint-disable-next-line @typescript-eslint/return-await
    return await UserProject.find({
      relations: ["user", "project", "project.tasks"],
      where: { user },
    });
  }

  static async findByUserIdAndStatusName(user: User | null) {
    if (!user) {
      throw new Error("User is not logged in");
    }
    return UserProject.find({
      relations: ["user", "project", "project.tasks"],
      where: { user },
      order: {
        id: "DESC",
      },
    });
  }

  static async createUserProject(userId: string, projectId: string) {
    const userProject = new UserProject();
    const user = await User.findOneOrFail({ id: userId });
    const project = await Project.findOneOrFail({ id: projectId });
    userProject.user = user;
    userProject.project = project;
    return userProject.save();
  }
}

export default UserProjectRepository;
