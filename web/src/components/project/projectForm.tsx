import { ChangeEvent, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { UserData } from '../../types/user/UserProfileTypes';
import { DEFAULT_NEW_PROJECT } from '../../shared/constants';
import { GET_USERS } from '../../graphql/queries/QGetUsers';
import { GET_PROJECTS_BY_USER_ID } from '../../graphql';
import { CREATE_PROJECT } from '../../graphql';

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
  const { data } = useQuery<UserData>(GET_USERS);
  const [ users ] = useState<Array<UserData>>([])

  const setNewProjectFromForm = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    newProject.userId = user.userProfile.id;

    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };

    setNewProject({
      ...newProject,
      [name]: name === 'start_date' || name === 'end_date'
          ? new Date(value).toISOString()
          : value,
    });
  };

  // useEffect( () => {
  //   if (data){
  //     console.log(data)

  //   }  
  // })

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
                variables: newProject,
                refetchQueries: [GET_PROJECTS_BY_USER_ID],
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

              <div>
                <label id="listbox-label" className="block text-sm font-medium text-gray-700"> Ajouter des developpeurs </label>
                <div className="mt-1 relative">
                  {/* <select> */}
                    { data && users.map(user => {
                      console.log(user)
                      // const { id, lastName, firstName} = myProfile
                      // return(
                      //   <option>
                      //     { user}
                      //   </option>
                      //   )
                    })}
                  {/* </select> */}
                  <button type="button" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span className="flex items-center">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                      <span className="ml-3 block truncate"> Tom Cook </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                    <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                      <div className="flex items-center">
                        <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                        <span className="font-normal ml-3 block truncate"> Wade Cooper </span>
                      </div>
                      <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </li>
                  </ul>
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
