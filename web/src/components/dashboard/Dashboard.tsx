import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Header from './Header';
import LeftMenu from './LeftMenu';

import TodoList from './TodoList';
import { UserProfile } from '../../types/user/UserProfileTypes';
import { TasksData, TaskType } from '../../types/tasks/TaskType';
import { GET_TASKS } from '../../graphql/queries/QGetTasks';
import { useMutation, useQuery } from '@apollo/client';
import { TASK_PROGRESS_STATE } from '../../graphql/mutations/tasks/TaskProgressStateMutation';
// import Loader from '../loader';

const Dashboard = ({ data }: { data: UserProfile }) => {
  const [todo, setTodo] = useState<string>('');
  const [, setTasks] = useState<Array<TaskType>>([]);
  const [todos, setTodos] = useState<Array<TaskType>>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Array<TaskType>>([]);
  const [inTestTodos, setInTestTodos] = useState<Array<TaskType>>([]);
  const [prInProgress, setPrInProgress] = useState<Array<TaskType>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<TaskType>>([]);
  const [getTaskId, setTaskId] = useState<string>('');
  const { myProfile } = data;
  const { data: tasksList } = useQuery<TasksData>(GET_TASKS);
  const [changeProgressState, {}] = useMutation(TASK_PROGRESS_STATE);

  // console.log(tasks)

  useEffect(() => {
    if (tasksList) {
      const { getTasks: tasks } = tasksList;
      const filteredTask = (progress_state: string) => tasks.filter(task => task.progress_state === progress_state);

      const todos = filteredTask("1")
      const inProgressTodos = filteredTask("2")
      const prInProgress = filteredTask("3")
      const inTestTodos = filteredTask("4")
      const completedTodos = filteredTask("5")

      setTasks(tasks);
      setTodos(todos);
      setInProgressTodos(inProgressTodos);
      setInTestTodos(inTestTodos);
      setPrInProgress(prInProgress);
      setCompletedTodos(completedTodos);
    }
  }, [tasksList])

  if (!myProfile) {
      <Navigate to="/" replace />
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    // if (todo) {
    //   setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    //   setTodo('');
    // }
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
    if (source.droppableId === "1") {
      add = todos[source.index];
      todos.splice(source.index, 1);
    } else if (source.droppableId === "2") {
      add = inProgressTodos[source.index];
      inProgressTodos.splice(source.index, 1);
    } else if (source.droppableId === "4") {
      add = inTestTodos[source.index];
      inTestTodos.splice(source.index, 1);
    } else if (source.droppableId === "3") {
      add = prInProgress[source.index];
      prInProgress.splice(source.index, 1);
    } else {
      add = completedTodos[source.index];
      completedTodos.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "1") {
      todos.splice(destination.index, 0, add);
      changeProgressState({
        variables: { updateTaskId: getTaskId, progressState: destination.droppableId }
      });
    } else if (destination.droppableId === "2") {
      inProgressTodos.splice(destination.index, 0, add);
      changeProgressState({
        variables: { updateTaskId: getTaskId, progressState: destination.droppableId }
      });
    } else if (destination.droppableId === "4") {
      inTestTodos.splice(destination.index, 0, add);
      changeProgressState({
        variables: { updateTaskId: getTaskId, progressState: destination.droppableId }
      });
    } else if (destination.droppableId === "3") {
      prInProgress.splice(destination.index, 0, add);
      changeProgressState({
        variables: { updateTaskId: getTaskId, progressState: destination.droppableId }
      });
    } else {
      completedTodos.splice(destination.index, 0, add);
      changeProgressState({
        variables: { updateTaskId: getTaskId, progressState: "5" }
      });
    }

    setCompletedTodos(completedTodos);
    setTodos(todos);
    setInProgressTodos(inProgressTodos);
    setInTestTodos(inTestTodos);
    setPrInProgress(prInProgress);
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
              setTaskId={setTaskId}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
