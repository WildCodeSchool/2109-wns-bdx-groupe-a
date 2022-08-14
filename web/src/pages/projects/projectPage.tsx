import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import LeftMenu from "../../components/dashboard/LeftMenu";
import { ProjectCard } from "../../components/project";
import { GET_PROJECTS_BY_USER_ID } from "../../graphql";
import { ProjectsData, ProjectType } from "../../types/projects/ProjectType";
import { UserData } from "../../types/user/UserProfileTypes";


interface props {
    user : UserData;
}

const ProjectPage = ({user} : props) => {

    const { data } = useQuery<ProjectsData>(GET_PROJECTS_BY_USER_ID, {
        variables : {userId : user.userProfile.id}
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
                <h2
                    className="text-3xl font-extrabold tracking-tight  sm:text-4xl"
                    style={{ color: '#374151' }}
                >
                    Mes projets
                </h2>
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