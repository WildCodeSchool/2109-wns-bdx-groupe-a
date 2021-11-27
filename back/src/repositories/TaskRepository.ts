import { EntityRepository, Repository } from 'typeorm';
import Task from '../models/Task.model.js';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {}

export default TaskRepository;
