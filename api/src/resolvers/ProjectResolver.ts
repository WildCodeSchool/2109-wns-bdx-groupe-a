import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';

import CreateProjectInput from '../inputs/Project/CreateProjectInput';
import DeleteProjectInput from '../inputs/Project/DeleteProjectInput';
import UpdateProjectInput from '../inputs/Project/UpdateProjectInput';
import Project from '../models/Project';
import User from '../models/User';

@Resolver()
export default class ProjectResolver {
  @Query(() => [Project])
  getProjects() {
    return Project.find();
  }

  @Query(() => [Project])
  getProjectByCreatorId(@Arg('creatorId') creatorId: string) {
    return Project.find({ creatorId });
  }

  @Query(() => [Project])
  getProjectById(@Arg('id') id: string) {
    return Project.find({ id });
  }

  @Query(() => Project)
  getProjectByIdWithAllUsers(@Arg('id') id: string) {
    return Project.findOneOrFail({ id }, { relations: ['users'] });
  }

  @Mutation(() => Project)
  async createProject(
    @Args()
    {
      title,
      creatorId,
      description,
      picture,
      start_date,
      end_date
    }: CreateProjectInput
  ) {
    const newProject = new Project();
    newProject.title = title;
    newProject.creatorId = creatorId;
    newProject.description = description;
    newProject.picture = picture;
    newProject.start_date = start_date;
    newProject.end_date = end_date;

    await newProject.save();
    return newProject;
  }

  @Mutation(() => Project)
  async updateProject(
    @Args()
    {
      id,
      title,
      description,
      picture,
      start_date,
      end_date,
      userId
    }: UpdateProjectInput
  ) {
    const getUserId = await User.findOneOrFail({ id: userId });
    const projectToUpdate = await Project.findOneOrFail({ id });

    const newData = {
      title: title ?? projectToUpdate.title,
      description: description ?? projectToUpdate.description,
      picture: picture ?? projectToUpdate.picture,
      start_date: start_date ?? projectToUpdate.start_date,
      end_date: end_date ?? projectToUpdate.end_date,
      users: [getUserId]
    };

    Object.assign(projectToUpdate, newData);
    await projectToUpdate.save();

    return projectToUpdate;
  }

  @Mutation(() => Project)
  async deleteProject(@Args() { id }: DeleteProjectInput) {
    const projectToDelete = await Project.findOneOrFail({ id });

    await projectToDelete.remove();
    return projectToDelete;
  }
}
