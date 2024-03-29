/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import { SIDE_BAR_NAVIGATION } from './dashboard.constants';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { gql, useMutation } from '@apollo/client';
import Modal from 'react-modal';
import InputField from './InputField';
import { UserProfile } from '../../types/user/UserProfileTypes';
import { GET_MY_PROFILE } from '../../graphql/queries/QGetMyProfile';
import { Link } from 'react-router-dom';


export const DELETE_SESSION = gql`
  mutation DeleteSession {
    deleteSession
  }
`;

interface props {
  todo: string;
  user: UserProfile;
  searchTerm: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const Header = ({
  user,
  todo,
  setTodo,
  handleAdd,
  setSearchTerm,
  searchTerm,
}: props) => {
  const [isProfilMenuOpen, setIsProfilMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteSession] = useMutation(DELETE_SESSION, {
    refetchQueries: [{ query: GET_MY_PROFILE }],
  });
  const navigate = useNavigate();
  const { myProfile } = user;

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

  //TODO : add user to project

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
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
          onClose={closeModal}
        />
        </div>
      </Modal>

      {/* Picker area */}
      <div className="mx-auto md:hidden">
        <div className="relative">
          <select
            id="inbox-select"
            className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600"
            defaultValue={
              SIDE_BAR_NAVIGATION.find((item) => item.current)!.name
            }
          >
            {SIDE_BAR_NAVIGATION.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

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
        <div className="min-w-0 flex-1 focus:outline-none">
          <div className="w-96 h-8 border items-center flex justify-center ml-2 rounded border-solid border-gray-300 relative text-gray-400 focus-within:text-gray-500 focus:outline-none">
            <label htmlFor="desktop-search" className="sr-only">
              Search
            </label>
            <input
              id="desktop-search"
              type="search"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="focus:outline-none block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0 text-indigo-600"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          + Tâche
        </button>
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
          <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
          </div>
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
            <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
              <Link to="/projects">
              <button
                className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Mes projets
              </button>
              </Link>
            </div>
            <div style={{display: 'flex', justifyContent: 'end', marginTop: '18px'}}>
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

export default Header;
