import { ProjectType } from "../../types/projects/ProjectType";
import { UserProfile } from "../../types/user/UserProfileTypes";


interface props {
    project: ProjectType
    user: UserProfile
}

const ProjectCard = ({project, user}: props) => {
    const { myProfile } = user;
    const { firstName, lastName } = myProfile
    const { title, description, picture, start_date, end_date } = project

    return (
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6">

            <div className="picture">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
            </div>

            <div className="informations">
                <h4> { title } </h4>
                <p> { description } </p>
                <img src={ picture } ></img>
                <p> { start_date } - { end_date } </p>
            </div>

        </div>
    )
} 

export default ProjectCard