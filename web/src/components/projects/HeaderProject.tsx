import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { gql, useMutation } from '@apollo/client';

import { UserProfileVariables } from '../../types/user/UserProfileTypes';
import { GET_MY_PROFILE } from '../../graphql/queries/QGetMyProfile';

export const DELETE_SESSION = gql`
  mutation DeleteSession {
    deleteSession
  }
`;

interface props {
  myProfile: UserProfileVariables;
}

const HeaderProject = ({ myProfile }: props) => {
  const [isProfilMenuOpen, setIsProfilMenuOpen] = useState(false);

  const [deleteSession] = useMutation(DELETE_SESSION, {
    refetchQueries: [{ query: GET_MY_PROFILE }],
  });
  const navigate = useNavigate();

  const onLogOut = () => {
    deleteSession();
    navigate('/');
  };

  return (
    <header className="flex-shrink-0 relative h-16 bg-white flex">
      {/* Logo area */}
      <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0 bg-rd">
        <a
          href="#"
          className="flex items-center justify-center h-16 w-16 bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
        >
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
            alt="Workflow"
          />
        </a>
      </div>
      {/* TODO à changer */}

      {/* Menu button area */}
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 md:hidden">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          onClick={() => setIsProfilMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop nav area */}
      <div
        className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between"
        style={{ justifyContent: 'end', display: 'flex' }}
      >
        <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
          <nav aria-label="Global" className="flex space-x-10">
            <a href="#" className="text-sm font-medium text-gray-900">
              Contact
            </a>
            <a href="#" className="text-sm font-medium text-gray-900">
              Paramètres
            </a>
          </nav>
          <div className="flex items-center space-x-8">
            <span className="inline-flex">
              <a
                href="#"
                className="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </span>

            <div className="relative inline-block text-left">
              <div
                onClick={() => setIsProfilMenuOpen(true)}
                className="cursor-pointer bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 bg-indigo-600 text-white flex justify-center items-center uppercase">
                  {myProfile?.firstName.charAt(0)}
                  {myProfile?.lastName.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfilMenuOpen && (
        <nav
          className="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
          aria-label="Global"
        >
          <div className="h-16 flex items-center justify-between px-4 sm:px-6">
            <a href="#">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                alt="Workflow"
              />
            </a>
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onClick={() => setIsProfilMenuOpen(false)}
            >
              <span className="sr-only">Close main menu</span>
              <XIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4"></div>
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 bg-indigo-600 text-white flex justify-center items-center uppercase">
                {myProfile?.firstName.charAt(0)}
                {myProfile?.lastName.charAt(0)}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-base font-medium text-gray-800 truncate">
                  {myProfile?.firstName} {myProfile?.lastName}
                </div>
                <div className="text-sm font-medium text-gray-500 truncate">
                  {myProfile?.email}
                </div>
              </div>
              <a className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '18px',
              }}
            >
              <button
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => onLogOut()}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default HeaderProject;
