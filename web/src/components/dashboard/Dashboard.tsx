import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Header from './Header';
import LeftMenu from './LeftMenu';

import TodoList from './TodoList';
import { UserProfile } from '../../types/user/UserProfileTypes';
import { TasksData, TaskType } from '../../types/tasks/TaskType';
import { useMutation, useQuery } from '@apollo/client';
import { TASK_PROGRESS_STATE } from '../../graphql/mutations/tasks/TaskProgressStateMutation';
import { GET_TASKS_BY_PROJECT_ID } from '../../graphql/queries/QTaskByProjectId';
import { GET_PROJECT_BY_ID } from '../../graphql/queries/QGetProjectById';
import { ProjectId } from '../../types/projects/ProjectId';

const Dashboard = ({ data }: { data: UserProfile }) => {
  const {projectId} = useParams();
  const [todo, setTodo] = useState<string>('');
  const [, setTasks] = useState<Array<TaskType>>([]);
  const [todos, setTodos] = useState<Array<TaskType>>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Array<TaskType>>([]);
  const [inTestTodos, setInTestTodos] = useState<Array<TaskType>>([]);
  const [prInProgress, setPrInProgress] = useState<Array<TaskType>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<TaskType>>([]);
  const [getTaskId, setTaskId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const { myProfile } = data;
  const { data: tasksList } = useQuery<TasksData>(GET_TASKS_BY_PROJECT_ID, {
    variables: {projectId}
  });
  const {data: getProjectById} = useQuery<ProjectId>(GET_PROJECT_BY_ID, {
    variables: {project: projectId}
  });

  const projectTitle = getProjectById?.getProjectById?.title



  const [changeProgressState, {}] = useMutation(TASK_PROGRESS_STATE);


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

  if (!myProfile) {
      <Navigate to="/" replace />
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
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
      <Header user={data} todo={todo} setTodo={setTodo} handleAdd={handleAdd} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      {/* Bottom section */}

      <div className='min-h-0 flex-1 flex overflow-hidden'>
        {/* Narrow sidebar*/}
        <LeftMenu />
        <div className='min-h-0 flex-1 flex-centered'>
            <h1 className='uppercase ml-5 font-semibold h-3 text-2xl text-indigo-800'>{projectTitle}</h1>
            <div className='w-full mt-8'>
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
      </div>
    </div>
    </>
  );
};

export default Dashboard;
