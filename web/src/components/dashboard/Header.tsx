import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import { UserData } from '../../types/user/UserProfileTypes';
import { DELETE_SESSION, GET_MY_PROFILE } from '../../graphql';
import InputField from './InputField';
import SearchBar from './SearchBar';


interface props {
  user: UserData;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({user, searchTerm, setSearchTerm}: props) => {
  const [isProfilMenuOpen, setIsProfilMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todo, setTodo] = useState<string>('');
  const { projectId } = useParams();

  const [deleteSession] = useMutation(DELETE_SESSION, {
    refetchQueries: [{ query: GET_MY_PROFILE }],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onLogOut = () => {
    deleteSession();
    navigate('/');
  };
  
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


  return (
    <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
      {/* Logo area */}
      <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Item Modal"
        ariaHideApp={false}
      >
        <div className="w-96">
          {projectId && (
            <InputField
              todo={todo}
              setTodo={setTodo}
              onClose={closeModal}
              projectId={projectId}
            />
          )}
        </div>
      </Modal>

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
      <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
        <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
        <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
          <div className="flex items-center space-x-8">
            <div className="relative inline-block text-left">
              <div
                onClick={() => setIsProfilMenuOpen(true)}
                className="cursor-pointer bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 bg-indigo-600 text-white flex justify-center items-center uppercase">
                  {user?.userProfile.firstName.charAt(0)}
                  {user?.userProfile.lastName.charAt(0)}
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
                {user?.userProfile.firstName.charAt(0)}
                {user?.userProfile.lastName.charAt(0)}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-base font-medium text-gray-800 truncate">
                  {user?.userProfile.firstName} {user?.userProfile.lastName}
                </div>
                <div className="text-sm font-medium text-gray-500 truncate">
                  {user?.userProfile.email}
                </div>
              </div>
            </div>
            <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 bg-indigo-600 text-white flex justify-center items-center uppercase">
                <img src="" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <Link
                  to="/projets"
                  className="text-sm font-medium text-gray-900"
                >
                  Mes projets
                </Link>
              </div>
            </div>
            <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
              <button
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => onLogOut()}
              >
                Log Out
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
