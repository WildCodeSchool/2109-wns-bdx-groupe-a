import { gql, useQuery } from '@apollo/client';
import Column from './Column';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_TICKETS } from './dashboard.constants';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import TemplateTicket from '../ticket/template/TemplateTicket';

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
  const [columns, setColumns] = useState(COLUMNS_TICKETS);
  const [tasks, setTasks] = useState<any[]>([]);
  // const [tasksIndex, setTasksIndex] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { loading, error, data } = useQuery<TasksData>(GET_TASKS);
  // const { loading, error, data } = useQuery(GET_TASKS);

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

  // const [newTask, setnewTask] = useState('');

  //   //TODO
  // const addTask = async () => {
  // };

  const getTasks = async (tasks: any[]) => {
    // if (data) setTasks(data.getTasks);
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

  interface TasksType {
    id: string;
    title: string;
    description: string;
    attachment: string;
    progress_state: string;
  }

  console.log({ ideas });

  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />

        {/* Main area */}

        <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
          <section
            aria-labelledby='primary-heading'
            className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
          >
            <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
              TODO
            </h1>
            <ReactSortable
              list={todo}
              setList={settodo}
              group={{ name: 'group-1', put: true }}
            >
              {todo.map((task, idx) => (
                <TemplateTicket
                  key={idx}
                  id={task.id}
                  name={task.title}
                  description={task.description}
                />
              ))}
            </ReactSortable>
          </section>
        </main>
        <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
          <section
            aria-labelledby='primary-heading'
            className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
          >
            <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
              IDEAS
            </h1>
            <ReactSortable
              list={ideas}
              setList={setideas}
              group={{ name: 'group-1', put: true }}
            >
              {ideas.map((task, idx) => (
                <TemplateTicket
                  id={task.id}
                  key={idx}
                  name={task.title}
                  description={task.description}
                />
              ))}
            </ReactSortable>
          </section>
        </main>
        <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
          <section
            aria-labelledby='primary-heading'
            className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
          >
            <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
              colonne 3
            </h1>
            <ReactSortable
              list={inprogress}
              setList={setinprogress}
              group={{ name: 'group-1', put: true }}
            >
              {inprogress.map((task, idx) => (
                <TemplateTicket
                  id={task.id}
                  key={idx}
                  name={task.title}
                  description={task.description}
                />
              ))}
            </ReactSortable>
          </section>
        </main>
        <main className='min-w-0 flex-1 border-gray-200 lg:flex mr-12 ml-12 mt-12'>
          <section
            aria-labelledby='primary-heading'
            className='min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last border border-gray-100 bg-gray-100 rounded-t-lg'
          >
            <h1 className='flex justify-center border-b bg-indigo-600 rounded-t-lg text-white'>
              colonne 4
            </h1>
            <ReactSortable
              list={published}
              setList={setpublished}
              group={{ name: 'group-1', put: true }}
            >
              {published.map((task, idx) => (
                <TemplateTicket
                  id={task.id}
                  key={idx}
                  name={task.title}
                  description={task.description}
                />
              ))}
            </ReactSortable>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
