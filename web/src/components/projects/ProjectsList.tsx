import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PROJECTS_BY_CREATORID } from '../../graphql/queries/QProjectsByCreatorId';
import { Project } from '../../types/projects/Projects';
import AddProject from './AddProject';

interface props {
  creatorId: string;
}

const ProjectsList = ({ creatorId }: props) => {
  const [isAddProject, setIsAddProject] = useState(false);
  const { data: projectsByCreatorId } = useQuery(GET_PROJECTS_BY_CREATORID, {variables: {creatorId} });

  console.log(projectsByCreatorId);

  return (
    <div className="bg-white overflow-y-auto overflow-x-hidden">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mes projets
            </h2>
            <div className="inline-flex w-full justify-between">
            <p className="text-xl text-gray-500">
              Liste actuelle de vos projets
              
            </p>
            <div className="space-y-4">
              <button onClick={() => setIsAddProject(!isAddProject)} className="block p-6 max-w-sm w-36 rounded-lg border  shadow-md bg-indigo-500 border-gray-700 hover:bg-white hover:text-indigo-500 text-white">
                <h5 className="mb-2 text-1xl font-bold tracking-tight ">
                  {!isAddProject ? 'Ajouter' : 'Annuler'}
                </h5>
              </button>
            </div>
            </div>
          </div>
          
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8 overflow-y-auto"
          >
            {projectsByCreatorId?.getProjectByCreatorId.map((project: Project) => (
              <li key={project.id} >
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 "
                    style={{backgroundImage: `url(${project.picture})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {project.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {project.description}
                    </p>
                  <div className='inline-flex w-full' style={{justifyContent: 'end'}}>
                    <p className="mr-4">{project.start_date}</p> {'->'}
                    <p className="ml-4" >{project.end_date}</p>
                  </div>
                  </a>
                </div>
              </li>
            ))}

         
          </ul>
        </div>
        <div className=" w-screen flex justify-center mt-12">
              {isAddProject && <AddProject creatorId={creatorId} />}
            </div>
      </div>
    </div>
  );
};

export default ProjectsList;
