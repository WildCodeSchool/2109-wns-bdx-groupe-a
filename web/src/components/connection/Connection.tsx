import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import SignUp from './signUp/SignUp';
import SignIn from './signIn/SignIn';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Connection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your ça fonctionne? account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <button
              onClick={openModal}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Sign Up
            </button>
          </p>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Item Modal'
          ariaHideApp={false}
        >
          <SignUp onClose={closeModal} />
        </Modal>

        <SignIn />
      </div>
    </div>
  );
};

export default Connection;
