import { Args, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import CreateProjectInput from "../inputs/Project/CreateProjectInput";
import DeleteProjectInput from "../inputs/Project/DeleteProjectInput";
import UpdateProjectInput from "../inputs/Project/UpdateProjectInput";
import Project from "../models/Project";


@Resolver()
export class ProjectResolver {
    @Query(() => [Project]) 
    getProject() {
        return Project.find()
    }

    @Mutation(() => Project)
    async createProject(@Args() { title, description, picture, start_date, end_date }: CreateProjectInput){
        
        const newProject = new Project();
        newProject.title = title;
        newProject.description = description;
        newProject.picture = picture;
        newProject.start_date = start_date;
        newProject.end_date = end_date;

        await newProject.save();
        return newProject;
    }

    @Mutation(() => Project)
    async updateProject(@Args() { id, title, description, picture, start_date, end_date}: UpdateProjectInput){

        const projectToUpdate = await Project.findOneOrFail({ id })
        if(!projectToUpdate){
            throw new Error ('No project founded')
        }

        const newData = {
            title: title ?? projectToUpdate.title,
            description: description ?? projectToUpdate.description,
            picture: picture ?? projectToUpdate.picture,
            start_date: start_date ?? projectToUpdate.start_date,
            end_date: end_date ?? projectToUpdate.end_date
        }

        Object.assign(projectToUpdate, newData)
        await projectToUpdate.save()

        return projectToUpdate

    }

    @Mutation(() => Project)
    async deleteProject(@Args() { id } : DeleteProjectInput) {
        const projectToDelete = await Project.findOneOrFail({ id })
        if (!projectToDelete) {
            throw new Error( 'No Project founded')
        }

        await projectToDelete.remove()
        return "Project `$id` deleted"
    }
}