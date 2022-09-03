import React from 'react';
import { UserProfile } from '../../types/user/UserProfileTypes';
import LeftMenu from '../dashboard/LeftMenu';
import HeaderProject from './HeaderProject';

export const Projects = ({ userProfile }: { userProfile: UserProfile }) => {
  const { myProfile } = userProfile;
  console.log('myProfile', myProfile);
  return (
    <div className="h-full flex flex-col">
            <HeaderProject myProfile={myProfile} />

      <div className="min-h-0 flex-1 flex overflow-hidden">
        <LeftMenu />
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Job Postings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit quam
                corrupti consectetur.
              </p>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create new job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
