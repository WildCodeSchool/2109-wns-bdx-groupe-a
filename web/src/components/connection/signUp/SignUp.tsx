import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../../graphql';
import { DEFAULT_USER_INFORMATIONS } from '../../../shared/constants';
import {
  isValidUser,
  handleIsNotValidUserError
} from '../../../helpers/IsValidUser';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SignUp = ({ onClose }: { onClose: () => void }) => {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [userInformations, setUserInformations] = useState(DEFAULT_USER_INFORMATIONS);

  //TODO on peut se créer un compte avec 2 fois l'adress mail malgré l'erreur graphql
  const [signUp, {}] = useMutation(SIGN_UP);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    setUserInformations({ ...userInformations, [name]: value });
  };

  useEffect(() => {
    if (!isValidUser(userInformations)) {
      handleIsNotValidUserError(setError, userInformations);
    } else {
      setError("")
    }

  }, [userInformations])

  return (
    <div className='bg-white py-16 px-4 overflow-hidden sm:px-6'>
      <div className='relative max-w-xl mx-auto'>
        <svg
          className='absolute left-full transform translate-x-1/2'
          width={404}
          height={404}
          fill='none'
          viewBox='0 0 404 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='85737c0e-0916-41d7-917f-596dc7edfa27'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)'
          />
        </svg>
        <svg
          className='absolute right-full bottom-0 transform -translate-x-1/2'
          width={404}
          height={404}
          fill='none'
          viewBox='0 0 404 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='85737c0e-0916-41d7-917f-596dc7edfa27'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)'
          />
        </svg>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Sign Up
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-500'></p>
        </div>
        <div className='mt-12'>
          <form
            action='#'
            method='POST'
            className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
            onSubmit={(event) => {
              event.preventDefault();
              if (isValidUser(userInformations)) {
                signUp({ variables: userInformations });
                onClose();
              }
            }}
          >
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700'
              >
                Firstname
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  autoComplete='given-name'
                  required
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  value={userInformations.firstName}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700'
              >
                Lastname
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  autoComplete='given-name'
                  required
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  value={userInformations.lastName}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  value={userInformations.email}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  autoComplete='family-name'
                  required
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  value={userInformations.password}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-indigo-600' : 'bg-gray-200',
                      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    <span className='sr-only'>Agree to policies</span>
                    <span
                      aria-hidden='true'
                      className={classNames(
                        agreed ? 'translate-x-5' : 'translate-x-0',
                        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      )}
                    />
                  </Switch>
                </div>
                <div className='ml-3'>
                  <p className='text-base text-gray-500'>
                    By selecting this, you agree to the{' '}
                    <a
                      href='#/'
                      className='font-medium text-gray-700 underline'
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href='#/'
                      className='font-medium text-gray-700 underline'
                    >
                      Cookie Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <button
                type='submit'
                className='w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign Up
              </button>
            </div>
          </form>
          {error && (
            <div
              className='flex p-4 mb-4 mt-8 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
              role='alert'
            >
              <svg
                className='inline flex-shrink-0 mr-3 w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <div>
                {error && 
                <span className='font-medium'>{error}</span>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SignUp;
