import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { UPDATE_PROJECT } from '../../graphql/mutations/projects/UpdateProjectMutation';
import { GET_PROJECTS_BY_CREATORID } from '../../graphql/queries/QProjectsByCreatorId';
interface props {
  project?: {
    id: string;
    title: string;
    picture: string;
    description: string;
    start_date: string;
    end_date: string;
    userId: string;
  };
  closeModalProject: () => void;
}
const UpdateProject = ({ project, closeModalProject }: props) => {
  const [projectToUpdate, setProjectToUpdate] = useState(project);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    if (projectToUpdate)
      setProjectToUpdate({ ...projectToUpdate, [name]: value });
  };

  const [updateProject, {}] = useMutation(UPDATE_PROJECT);

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations du projet
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Modifier les paramètres du projet.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form
            action="#"
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();
              updateProject({variables: {updateProjectId: projectToUpdate?.id, ...projectToUpdate}, refetchQueries: [GET_PROJECTS_BY_CREATORID]});
              closeModalProject()
            }}
          >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Titre
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={projectToUpdate?.title}
                      onChange={(e) => onChange(e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectToUpdate?.description}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="picture"
                      className="block text-sm font-medium text-gray-700"
                    >
                      URL de l'image
                    </label>
                    <input
                      type="text"
                      name="picture"
                      id="picture"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectToUpdate?.picture}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="userId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ajouter une personne par ID
                    </label>
                    <input
                      type="number"
                      name="userId"
                      id="userId"
                      min={0}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="start_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date de début
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      autoComplete="address-level2"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectToUpdate?.start_date}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="end_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date de fin
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      autoComplete="address-level1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectToUpdate?.end_date}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Modifier
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
