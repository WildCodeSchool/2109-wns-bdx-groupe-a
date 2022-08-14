import Project from "../models/Project";
import User from "../models/User";


class ProjectRepository extends Project {
    static async createUser(title: string, userId: string, description : string, picture : string | undefined , startDate : Date | undefined, endDate : Date | undefined){
        const newProject = new Project();

        newProject.title = title;
        newProject.userId = userId
        newProject.description = description;
        newProject.picture = picture;
        newProject.startDate = startDate;
        newProject.endDate = endDate;
        newProject.tasks = [];
        newProject.users = [];
        
        await newProject.save();
        return newProject
    }

    static async addUsersToProject(id: string, usersId: string[]) {
        const project = await Project.findOneOrFail({id} , {relations : ['tasks', 'users']}) //{relations: truc} indique quelles relations doivent être chargées. Forme de jointure simplifiée
        const users = await User.findByIds(usersId)
        project.users = users

        console.log(project.users)

        await project.save()
        return await Project.findOneOrFail({id}, {relations: ['tasks', 'users']})
    
    }
}
export default ProjectRepository