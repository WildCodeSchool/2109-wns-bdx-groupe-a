import { Comment } from './comment'
import { Task } from './task'

export interface Project {
    id: number
    title: string
    description: string
    picture: string
    start_date: Date
    end_date: Date
    tasks: Task[]
    comments: Comment[]
  }