import Column from './Column';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_TICKETS } from './dashboard.constants';
import { useState } from 'react';

const Dashboard = () => {
  const [columns, setColumns] = useState(COLUMNS_TICKETS);

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
