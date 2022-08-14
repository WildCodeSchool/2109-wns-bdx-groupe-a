import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { UserData } from '../../types/user/UserProfileTypes';
import { DEFAULT_NEW_PROJECT } from '../../shared/constants';
import { GET_USERS } from '../../graphql/queries/QGetUsers';
import { GET_PROJECTS_BY_USER_ID } from '../../graphql';
import { CREATE_PROJECT } from '../../graphql';
import { UserData2, UserType } from '../../types/user/UserTypes';

interface props {
  user: UserData;
  onClose: () => void;
}

export const getDateWithoutTime = (date: string): string => {
  return date ? new Date(date).toJSON().split('T')[0] : '';
};

export const ProjectForm = ({ user, onClose }: props) => {
  const [newProject, setNewProject] = useState(DEFAULT_NEW_PROJECT);
  const [createProject, {}] = useMutation(CREATE_PROJECT);
  const { data } = useQuery<UserData2>(GET_USERS);
  const [ users, setUsers ] = useState<Array<UserType>>([])
  const [ userAssignedId, setUserAssignedId ] = useState<string>()

  useEffect( () => {
    if (data) {
      const { getUsers } = data
      setUsers(getUsers)
    } 
  }, [data])

  const setNewProjectFromForm = (e:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLSelectElement>
    ) => {

    newProject.userId = user.userProfile.id;

    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };

    console.log(newProject)

    setNewProject({
      ...newProject,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value).toISOString(): value,
    });

  };

  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2
            className="text-3xl font-extrabold tracking-tight  sm:text-4xl"
            style={{ color: '#374151' }}
          >
            Add project
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500"></p>
        </div>
        <div className="mt-12 w-full">
          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
              createProject({
                variables: { ...newProject, userAssignedId},
                refetchQueries: [GET_PROJECTS_BY_USER_ID]
              });
              onClose();
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
                id="startDate"
                name="startDate"
                onChange={setNewProjectFromForm}
                value={getDateWithoutTime(newProject.startDate)}
                className="py-3 px-4 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-indigo-500 rounded-md"
              />
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={getDateWithoutTime(newProject.endDate)}
                onChange={setNewProjectFromForm}
                className="py-3 px-4 mb-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-indigo-500 rounded-md"
             />

              <div>
                <label id="listbox-label" className="block text-sm font-medium text-gray-700"> Ajouter des developpeurs </label>
                <div className="mt-1 relative">
                  <select 
                    className="py-3 px-4 mb-2 block w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-indigo-500 rounded-md"
                    onChange={(e) => setUserAssignedId(e.target.value)}
                    name="userAssignedId"
                    >
                    { data && users.map(user => {
                      return(
                        <option 
                        key={user.id}
                        value={user.id}
                        className="flex items-center"
                        >
                          { user.firstName } 
                        </option>
                        )
                    })}
                  </select>
                  {/* <button
                    type="button"
                    // disabled={!userSelectedId}
                    className="cursor-pointer inline-flex items-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    //onClick={() => addUserToUserProjectList()}
                  >
                    Ajouter l'utilisateur
                </button> */}
                </div>
              </div>
              <div className="flex justify-end mt-12">
                <button
                  type="submit"
                  disabled={newProject.title ? false : true}
                  className={`${
                    newProject.title
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed bg-gray-700 hover:bg-gray-500'
                  } inline-flex items-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Add
                </button>
              </div>

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
