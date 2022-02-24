import { gql, useQuery, useMutation } from '@apollo/client';
import Column from './Column';
import Column2 from './Column2';
import Column3 from './Column3';
import Column4 from './Column4';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { useEffect, useState } from 'react';

interface Tasks {
  title: string;
  description: string;
  attachment: string;
  progress_state: string;
  id: string;
}

interface TasksData {
  getTasks: Tasks[];
}

const GET_TASKS = gql`
  query getTasks {
    getTasks {
      title
      description
      attachment
      progress_state
      id
    }
  }
`;



const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { loading, error, data } = useQuery<TasksData>(GET_TASKS);

  const getCloneArray = (array: any[]) => array.map((x: any) => ({ ...x }));

  useEffect(() => {
    if (data && !tasks.length) {
      const taskstest = getCloneArray(data.getTasks);

      getTasks(taskstest);
    }

    setIsLoading(false);
  }, [data, tasks]);

  const [ideas, setideas] = useState<any[]>([]);
  const [todo, settodo] = useState<any[]>([]);
  const [inprogress, setinprogress] = useState<any[]>([]);
  const [published, setpublished] = useState<any[]>([]);

  

  const getTasks = async (tasks: any[]) => {
    // For todos
    let Todos = tasks.filter((res) => {
      return res.progress_state === '1';
    });
    settodo(getCloneArray(Todos));
    // For ideas
    let Ideas = tasks.filter((res) => {
      return res.progress_state === '2';
    });
    setideas(getCloneArray(Ideas));
    //For in progress
    let inprogress = tasks.filter((res) => {
      return res.progress_state === '3';
    });
    setinprogress(getCloneArray(inprogress));
    //published
    let published = tasks.filter((res) => {
      return res.progress_state === '4';
    });
    setpublished(getCloneArray(published));
  };

  console.log(data);

  const props = {
    ideas,
    todo,
    inprogress,
    published,
    setideas,
    settodo,
    setinprogress,
    setpublished
  };

  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />

        {/* Main area */}

        <Column props={props} />
        <Column3 props={props} />
        <Column2 props={props} />
        <Column4 props={props} />
      </div>
    </div>
  );
};

export default Dashboard;
