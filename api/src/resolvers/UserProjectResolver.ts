import { Resolver, Mutation, Arg, Query } from "type-graphql";
import Project from "../models/Project";
import UserProject from "../models/UserProject";

@Resolver()
class UserProjectResolver {
  @Mutation(() => Boolean)
  async addUserProject(
    @Arg("userId", () => String) userId: string,
    @Arg("projectId", () => String) projectId: string
  ) {
    await UserProject.create({ userId, projectId }).save();
    return true;
  }

  @Query(() => [Project])
  async projects() {
    return Project.find();
  }
}

export default UserProjectResolver;
