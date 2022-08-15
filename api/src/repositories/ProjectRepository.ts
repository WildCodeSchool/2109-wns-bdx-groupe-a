import Project from "../models/Project";
import User from "../models/User";

class ProjectRepository extends Project {
  static async createProject(
    title: string,
    userId: string,
    description: string | undefined,
    picture: string | undefined,
    startDate: Date | undefined,
    endDate: Date | undefined
  ) {
    const newProject = new Project();

    newProject.title = title;
    newProject.userId = userId;
    newProject.description = description;
    newProject.picture = picture;
    newProject.startDate = startDate;
    newProject.endDate = endDate;
    newProject.tasks = [];

    try {
      await newProject.save();
      return newProject;
    } catch (error) {
      throw new Error();
    }
  }

  static async addUsersToProject(projectId: string, usersId: string[]) {
    const project = await Project.findOneOrFail({ id: projectId });
    // {relations: truc} indique quelles relations doivent être chargées. Forme de jointure simplifiée
    const users: User[] = [];

    usersId.forEach(async (userId) => {
      const newUser = await User.findOneOrFail({ id: userId });
      users.push(newUser);
    });
    project.user = users;

    await project.save();

    return project;
  }
}
export default ProjectRepository;
