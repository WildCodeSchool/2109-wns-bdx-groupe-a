import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_PROJECTS_BY_CREATORID } from '../../graphql/queries/QProjectsByCreatorId';
import { Project } from '../../types/projects/Projects';
import AddProject from './AddProject';
import { Link } from 'react-router-dom';
import { GET_ALL_USER_PROJECTS } from '../../graphql/queries/QGetAllUserProjects';
import Modal from 'react-modal';

interface props {
  creatorId: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ProjectsList = ({ creatorId }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projectsByCreatorId } = useQuery(GET_PROJECTS_BY_CREATORID, {
    variables: { creatorId },
  });
  const { data: getUserWithProjects } = useQuery(GET_ALL_USER_PROJECTS, {
    variables: { getUserWithProjectsId: creatorId },
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [createdProjects, setCreatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (projectsByCreatorId) {
      setCreatedProjects(projectsByCreatorId.getProjectByCreatorId);
    }

    if (getUserWithProjects) {
      setProjects(getUserWithProjects.getUserWithProjects.projects);
    }
  }, [projectsByCreatorId, getUserWithProjects]);

  return (
    <div className="bg-white overflow-y-auto overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-indigo-600 uppercase">
              Mes projets
            </h2>
            <div className="inline-flex w-full justify-between">
              <p className="text-xl text-gray-500">
                Liste actuelle de vos projets
              </p>
              <div className="space-y-4">
                <button
                 onClick={openModal}

                  className="block p-6 max-w-sm w-36 rounded-lg border  shadow-md bg-indigo-500 border-gray-700 hover:bg-white hover:text-indigo-500 text-white"
                >
                  <h5 className="mb-2 text-1xl font-bold tracking-tight ">
                    Ajouter
                  </h5>
                </button>
              </div>
            </div>
          </div>

          <h3
            className="text-4xl font-bold tracking-tight sm:text-4xl text-indigo-400"
            style={{ fontSize: '22px' }}
          >
            Mes projets créés
          </h3>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8 overflow-y-auto"
          >
            {createdProjects &&
              createdProjects.map((project: Project) => (
                <li key={project.id}>
                  <Link to={`/dashboard/${project.id}`}>
                    <div className="space-y-4">
                      <div
                        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 "
                        style={{
                          backgroundImage: `url(${project.picture})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                          {project.title}
                        </h5>
                        <p className="font-normal text-gray-700 ">
                          {project.description}
                        </p>
                        <div
                          className="inline-flex w-full"
                          style={{ justifyContent: 'end' }}
                        >
                          <p className="mr-4">{project.start_date}</p> {'->'}
                          <p className="ml-4">{project.end_date}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
          <h3
            className="text-4xl font-bold tracking-tight sm:text-4xl text-indigo-400"
            style={{ fontSize: '22px' }}
          >
            Mes projets invités
          </h3>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8 overflow-y-auto"
          >
            {projects &&
              projects.map((project: Project) => (
                <li key={project.id}>
                  <Link to={`/dashboard/${project.id}`}>
                    <div className="space-y-4">
                      <div
                        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 "
                        style={{
                          backgroundImage: `url(${project.picture})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                          {project.title}
                        </h5>
                        <p className="font-normal text-gray-700 ">
                          {project.description}
                        </p>
                        <div
                          className="inline-flex w-full"
                          style={{ justifyContent: 'end' }}
                        >
                          <p className="mr-4">{project.start_date}</p> {'->'}
                          <p className="ml-4">{project.end_date}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className=" w-screen flex justify-center mt-12">
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Item Modal"
            ariaHideApp={false}
          >
            <AddProject creatorId={creatorId} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
