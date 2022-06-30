
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_MY_PROFILE } from './graphql/queries/QGetMyProfile';

import Connection from './components/connection/Connection';
import Dashboard from './components/dashboard/Dashboard';
import Loader from './components/loader'


import PageNotFound from './pages/404';
import ProjectPage from './pages/projects/ProjectPage';
import { UserData } from './types/user/UserProfileTypes';


const ContextualRoutes = () => {
  const { data } = useQuery<UserData>(GET_MY_PROFILE);

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }


  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Connection />} />
          <Route path='dashboard/'>
            <Route path=":projectId" element={ <Dashboard data={data} />} />
          </Route>
          <Route path='projets' element={<ProjectPage user={data} />} />
          <Route path='404' element={<PageNotFound userProfile={data} />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    </BrowserRouter>
  );
}

export default ContextualRoutes