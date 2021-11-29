import { Resolver, Query, Mutation, Args } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import Project from '../models/Project.model.js';
import ProjectRepository from '../repositories/ProjectRepository.js';
import DeleteProjectInput from '../types/Project/DeleteProjectInput.js';
import PostProjectInput from '../types/Project/PostProjectInput.js';
import UpdateProjectInput from '../types/Project/UpdateProjectInput.js';

@Resolver(Project)
class ProjectResolver {
  // GET all user

  @Query(() => [Project])
  async Projects() {
    const projectRepository = getCustomRepository(ProjectRepository);
    const projects = await projectRepository.find();

    return projects;
  }

  @Mutation(() => Project)
  async AddProject(@Args() { title, description, picture, date_start, date_end }: PostProjectInput) {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = new Project();
    project.title = title;
    project.description = description;
    project.picture = picture;
    project.date_start = date_start;
    project.date_end = date_end;

    await projectRepository.save(project);
    return project;
  }

  @Mutation(() => Project)
  async UpdateProject(
    @Args() { id, title, description, picture, date_start, date_end }: UpdateProjectInput
  ) {
    const projectRepository = getCustomRepository(ProjectRepository);
    const project = await projectRepository.findOneOrFail({ id });
    // on récupére l'utilisateur qui correspond a l'id qui est passé au niveau de la fonction

    await projectRepository.update(project, {
      title: title ?? project.title,
      description: description ?? project.description,
      picture: picture ?? project.picture,
      date_start: date_start ?? project.date_start,
      date_end: date_end ?? project.date_end,
    });
    // MAJ avec les nouvelles données passées en parametres de la fonction

    const projectUpdate = await projectRepository.findOne({ id });
    // on recup l'utilisateur avec les données mise a jour

    return projectUpdate;
  }

  @Mutation(() => Project)
  async DeleteProject(@Args() { id }: DeleteProjectInput) {
    const projectRepository = getCustomRepository(ProjectRepository);
    const project = await projectRepository.findOneOrFail({ id });

    await projectRepository.remove(project);

    return project;
  }
}

export default ProjectResolver;
