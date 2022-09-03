import React from 'react';
import { UserProfile } from '../../types/user/UserProfileTypes';
import LeftMenu from '../dashboard/LeftMenu';
import HeaderProject from './HeaderProject';
import ProjectsList from './ProjectsList';

const PROJECTS = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description 1',
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Description 2',
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
]

export const Projects = ({ userProfile }: { userProfile: UserProfile }) => {
  const { myProfile } = userProfile;
  console.log('myProfile', myProfile);
  return (
    <div className="h-full flex flex-col">
            <HeaderProject myProfile={myProfile} />

      <div className="min-h-0 flex-1 flex overflow-hidden">
        <LeftMenu />
        <div>
          <ProjectsList projects={PROJECTS}/>
        </div>
    </div>
    </div>
  );
};
