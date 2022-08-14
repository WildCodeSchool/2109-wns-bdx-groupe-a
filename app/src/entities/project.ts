import { Comment } from './comment'
import { Task } from './task'

export interface Project {
    id: number
    title: string
    description: string
    picture: string
    startDate: Date
    endDate: Date
    tasks: Task[]
    comments: Comment[]
  }