import { Link } from 'react-router-dom';
import { ProjectType } from '../../types/projects/ProjectType';
import { UserData } from '../../types/user/UserProfileTypes';

interface props {
  project: ProjectType;
  user: UserData;
}

export const ProjectCard = ({ project, user }: props) => {
  const { userProfile } = user;
  const { firstName, lastName } = userProfile
  const { id, title, description, picture, start_date, end_date } = project;

  const startDateTransformed = new Date(start_date).toLocaleDateString('fr-FR');
  const endDateTransformed = new Date(end_date).toLocaleTimeString('fr-FR');

  return (
    <div className="bg-white py-4 px-4 overflow-hidden sm:px-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
          {picture ? (
            <img src={picture} alt="" />
          ) : (
            <div className="flex-shrink-0">
              <p className="h-10 w-10 rounded-full">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </p>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <Link to={`/dashboard/${id}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="text-sm text-gray-500 truncate">{description}</p>
              <p className="text-sm text-gray-500 truncate">
                {startDateTransformed} - {endDateTransformed}{' '}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
