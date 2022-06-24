export type ProjectType = {
    id: number;
    userId: string;
    title: string;
    description: string,
    picture: string;
    start_date: string;
    end_date: string;
  };

  export interface ProjectsData {
    getProjectByUserId: ProjectType[];
  }

