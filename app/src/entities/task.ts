import { User } from './user'
import { Project } from './project'

export interface Task {
    id: number
    title: string
    description: string
    attachment: string
    progress_state: string
    project: Project
    assignee: User
    projects: Project[]
  }