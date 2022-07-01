import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import LeftMenu from "../../components/dashboard/LeftMenu";
import ProjectCard from '../../components/project/ProjectCard';
import { GET_PROJECTS_BY_USER_ID } from "../../graphql";
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
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        if (searchTerm) {
            const projectsFiltered = visibleProjects.filter(project => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
            setVisibleProjects(projectsFiltered);
        } else if (data) {
            const {getProjectByUserId} = data;
            setVisibleProjects(getProjectByUserId)
        }

    }, [data, searchTerm]) 



    return (
        <div className='h-full flex flex-col'> 
            <Header user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className='min-h-0 flex-1 flex overflow-hidden'>
                <LeftMenu user={user} />
                <div className="w-full overflow-y-auto">
                    { data && visibleProjects.map(( project ) => {
                        return(
                            <ProjectCard 
                                key={project.id}
                                project={project} 
                                user={user}
                            />
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;