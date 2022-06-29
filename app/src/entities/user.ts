import {Comment} from './comment';
import {Project} from './project';
import {Task} from './task';

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    comments?: Comment[]
    projectsCreated?: Project[]
    tasks?: Task[]
  }
  
  export interface SignIn {
    id: number
    email: string
  }
