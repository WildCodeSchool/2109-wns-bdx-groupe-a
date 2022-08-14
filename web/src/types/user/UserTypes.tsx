import { ProjectType } from "../projects/ProjectType"

export type UserType = {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    projects: ProjectType
}

export type UserData2 = {
    getUsers: UserType[]
}