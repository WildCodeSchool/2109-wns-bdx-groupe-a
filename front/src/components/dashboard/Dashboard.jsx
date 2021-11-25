/* eslint-disable jsx-a11y/anchor-is-valid */
import Column from './Column';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_INFOS } from './dashboard.constants';

const Dashboard = () => {
  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />

        {/* Main area */}
        {COLUMNS_INFOS.map(({ title, description }) => (
          <Column title={title} description={description} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
