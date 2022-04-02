import React, { useRef } from 'react';
import './styles.css';

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
  onClose: () => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
 
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
            Créer un ticket
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-500'></p>
        </div>
        <div className='mt-12'>
          <form
            className='input'
            onSubmit={(e) => {
              handleAdd(e);
              inputRef.current?.blur();
            }}
          >
            <div className='flex flex-col'>
              <input
                type='text'
                placeholder='Enter Title'
                value={todo}
                ref={inputRef}
                onChange={(e) => setTodo(e.target.value)}
                className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
              />
              <input
                type='text'
                placeholder='Enter description'
                // value={todo}
                ref={inputRef}
                onChange={(e) => setTodo(e.target.value)}
                className='mt-2 py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
              />
              <div className='flex justify-end mt-12'>
                <button
                  type='submit'
                  // onClick={() => onClose()}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Créer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputField;
