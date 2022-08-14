import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";

import CreateProjectInput from "../inputs/Project/CreateProjectInput";
import DeleteProjectInput from "../inputs/Project/DeleteProjectInput";
import UpdateProjectInput from "../inputs/Project/UpdateProjectInput";
import UpdateProjectUsersInput from "../inputs/Project/UpdateProjectUsersInpus";
import Project from "../models/Project";
import User from "../models/User";
import ProjectRepository from "../repositories/ProjectRepository";

@Resolver()
export default class ProjectResolver {
    @Query(() => [Project]) 
    getProjects() {
        return Project.find()
    }

    @Query(() => [Project])
    getProjectByUserId(@Arg('userId') userId: string) {
        return Project.find({ userId })
    }

    @Query(() => User)
    getUserById(@Arg('id') id: string) {
        return User.findOneOrFail({id})
    }

    @Mutation(() => Project)
    async createProject(@Args() { title, userId, description, picture, startDate, endDate }: CreateProjectInput){
        return ProjectRepository.createUser(title, userId, description, picture, startDate, endDate)
    }

    @Mutation(() => Project)
    async addUsersToProject(@Args() {id, usersId}: UpdateProjectUsersInput) {
        return ProjectRepository.addUsersToProject(id, usersId)
    }

    @Mutation(() => Project)
    async updateProject(@Args() { id, title, description, picture, startDate, endDate}: UpdateProjectInput){

        const projectToUpdate = await Project.findOneOrFail({ id })

        const newData = {
            title: title ?? projectToUpdate.title,
            description: description ?? projectToUpdate.description,
            picture: picture ?? projectToUpdate.picture,
            startDate: startDate ?? projectToUpdate.startDate,
            endDate: endDate ?? projectToUpdate.endDate
        }

        Object.assign(projectToUpdate, newData)
        await projectToUpdate.save()

        return projectToUpdate

    }

    @Mutation(() => Project)
    async deleteProject(@Args() { id } : DeleteProjectInput) {
        const projectToDelete = await Project.findOneOrFail({ id })

        await projectToDelete.remove()
        return projectToDelete
    }
}