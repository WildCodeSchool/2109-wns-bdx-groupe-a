import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { COLUMNS_TICKETS } from './dashboard.constants';
import { Todo } from './types';
import InputField from './InputField';
import TodoList from './TodoList';

const Dashboard = ({ data }: { data: any }) => {
  const [columns, setColumns] = useState(COLUMNS_TICKETS);
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Array<Todo>>([]);
  const [inTestTodos, setInTestTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const { myProfile } = data;

  if (!myProfile) {
    return (
      <div className='text-3xl uppercase flex justify-center'>
        à faire si pas connecté
      </div>
    );
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

    console.log(result);

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
    let active = todos;
    let inProgress = inProgressTodos;
    let inTest = inTestTodos;
    let complete = CompletedTodos;
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
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    setInProgressTodos(inProgress);
    setInTestTodos(inTest);
  };

  return (
    <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header user={data} />
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='border-2 border-solid border-red-600 w-full'>
            <span className='heading'>Board</span>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              CompletedTodos={CompletedTodos}
              setCompletedTodos={setCompletedTodos}
              inProgressTodos={inProgressTodos}
              setInProgressTodos={setInProgressTodos}
              inTestTodos={inTestTodos}
              setInTestTodos={setInTestTodos}
            />
          </div>
        </DragDropContext>
        {/* Main area */}
        {/* {columns.map(({ columnId, title, ticket }) => (
          <Column key={columnId} title={title} ticket={ticket} />
        ))} */}
      </div>
    </div>
  );
};

export default Dashboard;
