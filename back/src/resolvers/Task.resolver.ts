import { Resolver, Query, Mutation, Args } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import Task from '../models/Task.model.js';
import TaskRepository from '../repositories/TaskRepository.js';
import DeleteTaskInput from '../types/Task/DeleteTaskInput.js';
import PostTaskInput from '../types/Task/PostTaskInput.js';
import UpdateTaskInput from '../types/Task/UpdateTaskInput.js';

@Resolver(Task)
class TaskResolver {
  // GET all user

  @Query(() => [Task])
  async Tasks() {
    const taskRepository = getCustomRepository(TaskRepository);
    const tasks = await taskRepository.find();

    return tasks;
  }

  @Mutation(() => Task)
  async AddTask(@Args() { title, description,attachment }: PostTaskInput) {
    const taskRepository = getCustomRepository(TaskRepository);

    const task = new Task();
    task.title = title;
    task.description = description;
    task.attachment = attachment;


    await taskRepository.save(task);
    return task;
  }

  @Mutation(() => Task)
  async UpdateTask(
    @Args() { id, title, description, attachment }: UpdateTaskInput
  ) {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOneOrFail({ id });
    // on récupére l'utilisateur qui correspond a l'id qui est passé au niveau de la fonction

    await taskRepository.update(task, {
      title: title ?? task.title,
      description: description ?? task.description,
      attachment: attachment ?? task.attachment,
 
    });
  //   // MAJ avec les nouvelles données passées en parametres de la fonction

    const taskUpdate = await taskRepository.findOne({ id });
    // on recup l'utilisateur avec les données mise a jour

    return taskUpdate;
  }

  @Mutation(() => Task)
  async DeleteTask(@Args() { id }: DeleteTaskInput) {
    const taskRepository = getCustomRepository(TaskRepository);
    const task = await taskRepository.findOneOrFail({ id });

    await taskRepository.remove(task);

    return task;
  }
}

export default TaskResolver;
