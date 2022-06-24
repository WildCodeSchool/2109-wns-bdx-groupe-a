import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/project/projectCard";
import GET_PROJECTS_BY_USER_ID from "../../graphql/queries/QGetProjectByUserId";
import { ProjectsData, ProjectType } from "../../types/projects/ProjectType";
import { UserProfile } from "../../types/user/UserProfileTypes";


interface props {
    user : UserProfile;
}

const ProjectPage = ({user} : props) => {

    const { myProfile } = user;
    const { data } = useQuery<ProjectsData>(GET_PROJECTS_BY_USER_ID, {
        variables : {userId : myProfile.id}
    })

    const [visibleProjects, setVisibleProjects] = useState<Array<ProjectType>>([]);

    useEffect(() => {

        if (data) {
            const {getProjectByUserId} = data;
            setVisibleProjects(getProjectByUserId)
        }
    }, [data]) 

    return (
        <div> 
            <div>
                { data && visibleProjects.map(( project ) => {
                    return(
                        <ProjectCard 
                            project={project} 
                            user={user}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectPage;
