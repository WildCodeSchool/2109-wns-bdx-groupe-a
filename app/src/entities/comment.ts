import { User } from './user'
import { Project } from './project'

export interface Comment {
    id: number
    title: string
    content: string
    attachment: string
    date: Date
    project: Project[]
    assignee: User
  }