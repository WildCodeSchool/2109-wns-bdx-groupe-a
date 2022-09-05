import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { CREATE_PROJECT } from '../../graphql/mutations/projects/CreateProjectMutation';
import { GET_PROJECTS_BY_CREATORID } from '../../graphql/queries/QProjectsByCreatorId';
import { DEFAULT_NEW_PROJECT } from '../../shared/constants';

const AddProject = ({ creatorId }: { creatorId: string }) => {
  const [newProject, setNewProject] = useState(DEFAULT_NEW_PROJECT);
  const [createProject, {}] = useMutation(CREATE_PROJECT);

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    setNewProject({ ...newProject, creatorId, [name]: value });
  };

  return (
    <div className="w-full">
      <form
        method="POST"
        action="#"
        className="relative md:w-[400px] md:h-[300px] w-[350px] h-[300px]"
        onSubmit={(event) => {
          event.preventDefault();
          createProject({
            variables: newProject,
            refetchQueries: [
              { query: GET_PROJECTS_BY_CREATORID, variables: { creatorId } },
            ],
          });
        }}
      >
        <div className="rounded-lg shadow-sm">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
            placeholder="Titre"
            value={newProject.title}
            required
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <textarea
            rows={4}
            name="description"
            id="description"
            className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Écrire une description..."
            value={newProject.description}
            onChange={(e) => onChange(e)}
          />
          <div className="mt-4 mb-4">
            <input
              type="url"
              name="picture"
              id="picture"
              className="block w-full border-0 font-medium placeholder-gray-500 focus:ring-0 text-xs"
              placeholder="URL de l'image"
              value={newProject.picture}
              required={false}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
          <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3"></div>
          <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex justify-evenly">
              <div className="flex-column sm:text-sm">
                <p className="sm:text-sm text-sm text-gray-500">
                  Date de début :
                </p>
                <input
                  type="date"
                  name="startDate"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="flex-column sm:text-sm">
                <p className="sm:text-sm text-sm text-gray-500">
                  Date de fin :
                </p>
                <input
                  type="date"
                  name="endDate"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
