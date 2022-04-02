import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';

import { GET_MY_PROFILE } from '../../../graphql/queries/QGetMyProfile';
import { SIGN_IN } from '../../../graphql/queries/QSignIn';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { data, error }] = useMutation(SIGN_IN);

  if(data) {
    return <Navigate to="/dashboard" /> 
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
  { error ? "La combinaison email/mot de passe est invalide" : null}
  </div>
  )
}

export default SignIn