/* eslint-disable jsx-a11y/anchor-is-valid */
import TodoColumn from './TodoColumn';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_INFOS } from './dashboard.constants';
import InProgressColumn from './InProgressColumn';
import TestColumn from './TestColumn';
import CompletedColumn from './CompletedColumn';
import { useEffect, useState } from 'react';

export const TICKET_DATA = [
  {
    name: 'Premier ticket',
    description: 'ceci est le premier ticket'
  },
  {
    name: 'Second ticket',
    description: 'ceci est le second ticket'
  }
];

const Dashboard = () => {
  const [ticketList, setNewTicketList] = useState(TICKET_DATA);

  const { todo, inProgress, test, done } = COLUMNS_INFOS;
  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />
        {/* Main area */}
        <>
          <TodoColumn
            title={todo.title}
            ticketsList={ticketList}
            setNewTicketList={setNewTicketList}
          />
          <InProgressColumn title={inProgress.title} />
          <TestColumn title={test.title} />
          <CompletedColumn title={done.title} />
        </>
      </div>
    </div>
  );
};

export default Dashboard;
