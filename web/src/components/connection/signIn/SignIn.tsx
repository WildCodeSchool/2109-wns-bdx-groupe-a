import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';

import { GET_MY_PROFILE, SIGN_IN } from '../../../graphql';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { data, error }] = useMutation(SIGN_IN);

  if(data) {
    return <Navigate to="/dashboard/1" /> 
  }

  return (
    <div>
    <form 
    className='mt-8 space-y-6' 
    action='#' 
    method='POST'
    onSubmit={ (event) => {
      event.preventDefault();
      signIn({ variables: {email, password}, refetchQueries: [ GET_MY_PROFILE ]})
    }}
    >

    <input type='hidden' name='remember' defaultValue='true' />
    <div className='rounded-md shadow-sm -space-y-px'>
      <div>
        <label htmlFor='email-address' className='sr-only'>
          Email address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
          className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Email address'
          onChange={(event) => setEmail(event.target.value) }
        />
      </div>
      <div>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          placeholder='Password'
          onChange={(event) => setPassword(event.target.value) }
        />
      </div>
    </div>

    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <input
          id='remember-me'
          name='remember-me'
          type='checkbox'
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
        />
        <label
          htmlFor='remember-me'
          className='ml-2 block text-sm text-gray-900'
        >
          Remember me
        </label>
      </div>

      <div className='text-sm'>
        <a
          href='#/'
          className='font-medium text-indigo-600 hover:text-indigo-500'
        >
          Forgot your password?
        </a>
      </div>
    </div>

    <div>
      <button
        type='submit'
        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
          <LockClosedIcon
            className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
            aria-hidden='true'
          />
        </span>
        Sign in
      </button>
    </div>
  </form>
  { error && (
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
       <span className='font-medium'>La combinaison email/mot de passe est invalide</span>
     </div>
   </div>
  )}
  </div>
  )
}

export default SignIn