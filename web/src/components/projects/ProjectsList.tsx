import { useState } from 'react';
import { Project } from '../../types/projects/Projects';
import AddProject from './AddProject';

interface props {
  projects: Project[];
}

const ProjectsList = ({ projects }: props) => {
  const [isAddProject, setIsAddProject] = useState(false);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mes projets
            </h2>
            <p className="text-xl text-gray-500">
              Liste actuelle de vos projets
            </p>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {projects.map((project) => (
              <li key={project.id}>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {project.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {project.description}
                    </p>
                  </a>
                </div>
              </li>
            ))}
            <div className="space-y-4">
              <button onClick={() => setIsAddProject(!isAddProject)} className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  + Créer un projet
                </h5>
              </button>
            </div>
            <div className=" w-screen flex justify-center mt-12">
              {isAddProject && <AddProject />}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
