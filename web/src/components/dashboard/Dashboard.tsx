import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { Todo } from './types';
import TodoList from './TodoList';
import { UserProfile } from '../../types/user/UserProfileTypes';
// import Loader from '../loader';

const Dashboard = ({ data }: { data: UserProfile }) => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Array<Todo>>([]);
  const [inTestTodos, setInTestTodos] = useState<Array<Todo>>([]);
  const [prInProgress, setPrInProgress] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const { myProfile } = data;


  if (!myProfile) {
      <Navigate to="/" replace />
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };


  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    const active = todos;
    const inProgress = inProgressTodos;
    const inTest = inTestTodos;
    const inPR = prInProgress;
    const complete = completedTodos;
    // Source Logic
    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === 'InProgressList') {
      add = inProgress[source.index];
      inProgress.splice(source.index, 1);
    } else if (source.droppableId === 'InTestList') {
      add = inTest[source.index];
      inTest.splice(source.index, 1);
    } else if (source.droppableId === 'InPRList') {
      add = inPR[source.index];
      inPR.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'InProgressList') {
      inProgress.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'InTestList') {
      inTest.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'InPRList') {
      inPR.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    setInProgressTodos(inProgress);
    setInTestTodos(inTest);
    setPrInProgress(inPR);
  };

  return (
    <>
     <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header user={data} todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* Bottom section */}

      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />
            {/* Main area */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full flex justify-evenly overflow-y-auto">
            <TodoList
              todos={todos}
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              inProgressTodos={inProgressTodos}
              setInProgressTodos={setInProgressTodos}
              inTestTodos={inTestTodos}
              setInTestTodos={setInTestTodos}
              prInProgress={prInProgress}
              setPrInProgress={setPrInProgress}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
