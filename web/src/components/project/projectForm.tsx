import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { CREATE_PROJECT } from "../../graphql/mutations/projects/CreateProjectMutation";
import { UserProfile } from "../../types/user/UserProfileTypes";
import { DEFAULT_NEW_PROJECT } from "./projectModel";

interface props {
	user: UserProfile;
  onClose: () => void;
}

export const  getDateWithoutTime = (date: string): string => {
	return date ? new Date(date).toJSON().split("T")[0] : ''
}


export const ProjectForm = ({user, onClose } : props) => {
  
	const { myProfile } = user;
	const [newProject, setNewProject] = useState(DEFAULT_NEW_PROJECT);
	const [createProject, {}] = useMutation(CREATE_PROJECT);

	const setNewProjectFromForm = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {

		newProject.userId = myProfile.id;

    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    
		setNewProject({ ...newProject, [name]:  name === "start_date" || name === "end_date" ? new Date(value).toISOString() : value });
	}


	return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl" style={{color: '#374151'}}>
            Add project
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500"></p>
        </div>
        <div className="mt-12 w-full">
          <form
            className="input"
            onSubmit={(e) => {
							e.preventDefault();
              createProject({ variables: newProject});
              onClose()
            }}
          >
            <div className="flex flex-col w-full align-top">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                value={newProject.title}
                onChange={setNewProjectFromForm}
                className="py-3 px-4 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-indigo-500 rounded-md"
              />
              <textarea
                id="description"
                name="description"
                placeholder="Enter description"
                value={newProject.description}
                onChange={setNewProjectFromForm}
                className="h-36 mt-2 py-3 px-4 mb-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-indigo-500 rounded-md"
              ></textarea>
							<input
                type="date"
                id="start_date"
                name="start_date"
                onChange={setNewProjectFromForm}
                value={getDateWithoutTime(newProject.start_date)}
                className="py-3 px-4 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-indigo-500 rounded-md"
              />
							<input
                type="date"
                id="end_date"
                name="end_date"
                value={getDateWithoutTime(newProject.end_date)}
                onChange={setNewProjectFromForm}
                className="py-3 px-4 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-indigo-500 rounded-md"
              />
              <div className="flex justify-end mt-12">
                <button
                  type="submit"
                  disabled={newProject.title ? false : true}
                  className={`${newProject.title ? "cursor-pointer" : "cursor-not-allowed bg-gray-700 hover:bg-gray-500"} inline-flex items-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
)
}
