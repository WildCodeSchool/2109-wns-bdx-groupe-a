import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import Connection from './components/connection/Connection';
import Dashboard from './components/dashboard/Dashboard';
import { createContext } from 'react';

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myProfile {
      id
      email
      firstName
      lastName
    }
  }
`;

export const UserContext = createContext(null);

function App() {
  const { data } = useQuery(GET_MY_PROFILE);

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
