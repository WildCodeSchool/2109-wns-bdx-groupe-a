import { Link } from 'react-router-dom';
import { UserProfile } from '../../types/user/UserProfileTypes';

const index = ({ userProfile }: { userProfile: UserProfile }) => {
  const { myProfile } = userProfile;

  return (
    <div className='bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
      <div className='max-w-max mx-auto'>
        <main className='sm:flex'>
          <p className='text-4xl font-extrabold text-indigo-600 sm:text-5xl'>
            404
          </p>
          <div className='sm:ml-6'>
            <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
              <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                Page non trouvée
              </h1>
              <p className='mt-1 text-base text-gray-500'>
                Vous avez peut-être mal tapé l'URL. Si vous pensez que c'est une erreur, contactez-nous.
              </p>
            </div>
            <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
              <nav className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                {myProfile ? (
                  <Link to='/dashboard'>Allez aux projets</Link>
                ) : (
                  <Link to='/'>Connexion</Link>
                )}
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default index;
