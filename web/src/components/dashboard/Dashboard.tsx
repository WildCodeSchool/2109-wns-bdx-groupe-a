import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useMutation, useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { GET_TASKS_BY_PROJECT_ID, TASK_PROGRESS_STATE } from '../../graphql';
import { TasksData, TaskType } from '../../types/tasks/TaskType';
import { UserData } from '../../types/user/UserProfileTypes';
import LeftMenu from './LeftMenu';
import TodoList from './TodoList';
import Header from './Header';

interface props {
  data: UserData
}

const Dashboard = ({data } : props) => {
  const [, setTasks] = useState<Array<TaskType>>([]);
  const [todos, setTodos] = useState<Array<TaskType>>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Array<TaskType>>([]);
  const [inTestTodos, setInTestTodos] = useState<Array<TaskType>>([]);
  const [prInProgress, setPrInProgress] = useState<Array<TaskType>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<TaskType>>([]);
  const [getTaskId, setTaskId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const [changeProgressState, {}] = useMutation(TASK_PROGRESS_STATE);
  
  const { projectId } = useParams()
  const { data: tasksList } = useQuery<TasksData>(GET_TASKS_BY_PROJECT_ID, {
    variables: {projectId : projectId}
  });

  useEffect(() => {

    if (tasksList) {
      const { getTasksByProjectId: tasks } = tasksList;
      const filteredTask = (progress_state: string) => {
        if (searchTerm) {
          return tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) && task.progress_state === progress_state);
        }
        return tasks.filter(task => task.progress_state === progress_state);
      }

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
  }, [tasksList, searchTerm])

  if (!data) {
      <Navigate to="/" replace />
  }


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

    <Header user={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <div className='h-full flex flex-col'>
      {/* Bottom section */}
      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu 
          user={data}
        />

        {/* Main area */}
        <DragDropContext onDragEnd={onDragEnd}>
          {/* TODO : Mettre le titre du projet */}
          <div className="w-full flex justify-around overflow-y-auto">
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
