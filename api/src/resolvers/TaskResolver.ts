import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';

import CreateTaskInput from '../inputs/Task/CreateTaskInput';
import UpdateTaskInput from '../inputs/Task/UpdateTaskInput';
import DeleteTaskInput from '../inputs/Task/DeleteTaskInput';
import Task from '../models/Task';

@Resolver()
export default class TaskResolver {
  @Query(() => [Task])
  getTasks() {
    return Task.find();
  }

  @Query(() => Task)
  getTaskByTitle(@Arg('title') title: string) {
    return Task.findOne({ title });
  }
  
  @Query(() => Task)
  getTaskById(@Arg('id') id: string) {
    return Task.findOne({ id });
  }

  @Query(() => [Task])
  getTasksByProjectId(@Arg('projectId') projectId: string) {
    return Task.find({ project: { id: projectId } });
  }

  @Mutation(() => Task)
  async createTask(
    @Args() { title, description, attachment, progress_state }: CreateTaskInput
  ) {
    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.attachment = attachment;
    newTask.progress_state = progress_state;

    await newTask.save();
    return newTask;
  }

  @Mutation(() => Task)
  async updateTask(
    @Args()
    { id, title, description, attachment, progress_state }: UpdateTaskInput
  ) {
    const taskToUpdate = await Task.findOneOrFail({ id });

    if (!taskToUpdate) {
      throw new Error('No task founded');
    }

    const newData = {
      title: title ?? taskToUpdate.title,
      description: description ?? taskToUpdate.description,
      attachment: attachment ?? taskToUpdate.attachment,
      progress_state: progress_state ?? taskToUpdate.progress_state
    };

    Object.assign(taskToUpdate, newData);
    await taskToUpdate.save();

    return taskToUpdate;
  }

  @Mutation(() => Task)
  async deleteTask(@Args() { id }: DeleteTaskInput) {
    const taskToDelete = await Task.findOneOrFail({ id });

    await taskToDelete.remove();
    return taskToDelete;
  }
}
