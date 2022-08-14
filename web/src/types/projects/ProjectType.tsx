import { TaskType } from "../tasks/TaskType";

export type ProjectType = {
    id: string;
    userId: string;
    title: string;
    description: string,
    picture: string;
    startDate: string;
    endDate: string;
    tasks: [TaskType]
    userAssignedId:string
  };

export interface ProjectsData {
  getProjectByUserId: ProjectType[];
}

export type SidebarNavigation = {
    project: ProjectType,
    current: boolean,
    href: string
}