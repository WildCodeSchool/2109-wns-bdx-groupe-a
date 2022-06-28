export type TaskType = {
  id: number;
  title: string;
  description: string;
  attachment: string;
  progress_state: string;
};

export interface TasksData {
  getTasksByProjectId: TaskType[];
}