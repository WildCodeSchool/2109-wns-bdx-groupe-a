import { useEffect, useState } from 'react';
import { UserProfile } from '../../types/user/UserProfileTypes';
import LeftMenu from '../dashboard/LeftMenu';
import HeaderProject from './HeaderProject';
import ProjectsList from './ProjectsList';

export const Projects = ({ userProfile }: { userProfile: UserProfile }) => {

  const { myProfile } = userProfile;
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    setUser(userProfile);
  }, [myProfile])
  return (
    <>
    {user && <div className="h-full flex flex-col">
      <HeaderProject myProfile={myProfile} />

      <div className="min-h-0 flex-1 flex">
        <LeftMenu />
        <div>
          <ProjectsList creatorId={myProfile.id} />
        </div>
      </div>
    </div>
    }
    </>
  );
};
