import { Resolver, Mutation, Arg, Query } from "type-graphql";
import Project from "../models/Project";
import User from "../models/User";
import UserProject from "../models/UserProject";

@Resolver()
class UserProjectResolver {
  @Mutation(() => UserProject)
  async addUserToProject(
    @Arg("userId", () => String) userId: string,
    @Arg("projectId", () => String) projectId: string
  ) {
    const project = await Project.findOneOrFail({ id: projectId });
    const user = await User.findOneOrFail({ id: userId });

    const newUserProject = await UserProject.create({ project, user }).save();
    return newUserProject;
  }

  // @Mutation(() => User)
  // async addUserToProject(
  //   @Args() { projectId, usersId }: UpdateProjectUsersInput
  // ) {
  //

  //   const newUserProject = new UserProject
  //   newUserProject.project = project
  //   newUserProject.user = user

  //   return user;

  @Query(() => [Project])
  async projects() {
    return Project.find();
  }

  @Query(() => [User])
  async getUsersByProjectId(@Arg("projectId") projectId: string) {
    const project = await this.getProjectById(projectId);
    return User.find({
      where: { projectConnection: project },
      relations: ["projectConnection"],
    });
  }

  @Query(() => Project)
  getProjectById(@Arg("project") id: string) {
    return Project.findOneOrFail({ id });
  }
}

export default UserProjectResolver;
