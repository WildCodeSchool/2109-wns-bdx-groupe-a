import { gql, useQuery } from '@apollo/client';
import Column from './Column';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_TICKETS } from './dashboard.constants';
import { useState } from 'react';

interface Tasks {
  title: string;
  description: string;
  attachment: string;
  progress_state: string;
  id: string;
}

interface TasksData {
  tasks: Tasks[];
}

const GET_TASKS = gql`
  query getTasks {
    tasks {
      title
      description
      attachment
      progress_state
      id
    }
  }
`;

const Dashboard = () => {
  const [columns, setColumns] = useState(COLUMNS_TICKETS);

  const { loading, error, data } = useQuery<TasksData>(GET_TASKS);

  console.log(data);

  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />

        {/* Main area */}
        {columns.map(({ columnId, title, ticket }) => (
          <Column key={columnId} title={title} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
