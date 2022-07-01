import { TaskType } from "../tasks/TaskType";

export type ProjectType = {
    id: number;
    userId: string;
    title: string;
    description: string,
    picture: string;
    start_date: string;
    end_date: string;
    tasks: [TaskType]
  };

export interface ProjectsData {
  getProjectByUserId: ProjectType[];
}

export type SidebarNavigation = {
    project: ProjectType,
    current: boolean,
    href: string
}