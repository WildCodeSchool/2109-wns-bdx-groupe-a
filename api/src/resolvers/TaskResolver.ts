import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import CreateTaskInput from "../inputs/Task/CreateTaskInput";
import TaskRepository from "../repositories/TaskRepository";
import Task from "../models/Task";
import UpdateTaskInput from "../inputs/Task/UpdateTaskInput";


@Resolver()
export class TaskResolver {
    @Query(() => Task) 
    getTasks() {
        return Task.find()
    }

    @Query(() => Task) 
    getTaskByTitle(@Arg("title") title: string) {
        return Task.findOne({ title })
    }

    @Mutation(() => Task)
    async createTask(@Args() { title, description, attachment, progress_state }: CreateTaskInput){
        const taskRepository = getCustomRepository(TaskRepository)
        
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description; 
        newTask.attachment = attachment;
        newTask.progress_state = progress_state;

        await taskRepository.save(newTask);
        return newTask;
    }

    
    @Mutation(() => Task)
    async updateTask(@Args() { id, title, description, attachment, progress_state} : UpdateTaskInput){
        const taskRepository = getCustomRepository(TaskRepository);
        const taskToUpdate = await taskRepository.findOneOrFail( { id } )

        if (!taskToUpdate) {
            throw new Error('No task founded')
        }

        let newData =  {
            title: title ?? taskToUpdate.title,
            description: description ?? taskToUpdate.description,
            attachment: attachment ?? taskToUpdate.attachment,
            progress_state: progress_state ?? taskToUpdate.progress_state
        }

        Object.assign(taskToUpdate, newData)
        await taskToUpdate.save()

        return taskToUpdate
    }
}