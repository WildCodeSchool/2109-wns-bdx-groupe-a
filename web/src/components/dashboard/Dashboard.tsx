import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Modal from 'react-modal';


import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Header from './Header';
import LeftMenu from './LeftMenu';

import { Todo } from './types';
import InputField from './InputField';
import TodoList from './TodoList';
import Loader from '../loader';

const Dashboard = ({ data }: { data: any }) => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Array<Todo>>([]);
  const [inTestTodos, setInTestTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { myProfile } = data;


  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
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
    let active = todos;
    let inProgress = inProgressTodos;
    let inTest = inTestTodos;
    let complete = completedTodos;
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
    <>
     <div className='h-full flex flex-col'>
      {/* Top nav*/}
      <Header user={data} />
      {/* Bottom section */}
      <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Item Modal'
          ariaHideApp={false}
        >
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} onClose={closeModal}/>
        </Modal>
        <button
              onClick={openModal}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Ajout task
            </button>
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />
            {/* Main area */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full flex justify-evenly">
            <TodoList
              todos={todos}
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              inProgressTodos={inProgressTodos}
              setInProgressTodos={setInProgressTodos}
              inTestTodos={inTestTodos}
              setInTestTodos={setInTestTodos}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
