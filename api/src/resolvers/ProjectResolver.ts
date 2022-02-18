import { Args, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import CreateTaskInput from "../inputs/Task/CreateTaskInput";
import TaskRepository from "../repositories/TaskRepository";
import Task from "../models/Task";
import Project from "../models/Project";
import ProjectRepository from "../repositories/ProjectRepository";
import CreateProjectInput from "../inputs/Project/CreateProjectInput";


@Resolver()
export class ProjectResolver {
    @Query(() => [Project]) 
    project() {
        return Project.find()
    }

    @Mutation(() => Project)
    async createProject(@Args() { title, description, picture, start_date, end_date }: CreateProjectInput){
        const projectRepository = getCustomRepository(ProjectRepository)
        
        const newProject = new Project();
        newProject.title = title;
        newProject.description = description;
        newProject.picture = picture;
        newProject.start_date = start_date;
        newProject.end_date = end_date;

        await projectRepository.save(newProject);
        return newProject;
    }
}