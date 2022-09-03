// import { SIDE_BAR_NAVIGATION } from './dashboard.constants';

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }
import { PlusCircleIcon } from '@heroicons/react/solid';

const LeftMenu = () => {
  return (
    <nav
      aria-label='Sidebar'
      className='hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto'
    >
      {/* <div className='relative w-20 flex flex-col p-3 space-y-3'> */}

        <button
        type="button"
        className="inline-flex items-center border w-20 border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PlusCircleIcon className="h-12 w-12" aria-hidden="true" />
      </button>
      {/* </div> */}
    </nav>
  );
};

export default LeftMenu;
