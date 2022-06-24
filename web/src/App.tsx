import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  useQuery } from '@apollo/client';

import Connection from './components/connection/Connection';
import Dashboard from './components/dashboard/Dashboard';
import { createContext } from 'react';
import { GET_MY_PROFILE } from './graphql/queries/QGetMyProfile';

export const UserContext = createContext(null);

function App() {
  const { data } = useQuery(GET_MY_PROFILE);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Connection />} />
          <Route path='dashboard' element={<Dashboard data={data} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
