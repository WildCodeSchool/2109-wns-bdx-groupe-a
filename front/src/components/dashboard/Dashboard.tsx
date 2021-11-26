/* eslint-disable jsx-a11y/anchor-is-valid */
import Column from './Column';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_TICKETS } from './dashboard.constants';
import { useState } from 'react';

const Dashboard = () => {
  const [tickets, setTickets] = useState(COLUMNS_TICKETS);

  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />

        {/* Main area */}
        {tickets.map(({ columnId, title, ticket }) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={title}
            ticket={ticket}
            // tickets={tickets}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
