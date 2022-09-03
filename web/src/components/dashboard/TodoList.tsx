import React from "react";

import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { TaskType } from '../../types/tasks/TaskType';

import "./styles.css";

interface props {
  todos: Array<TaskType>;
  setTodos: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setInProgressTodos: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setInTestTodos: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setPrInProgress: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  inProgressTodos: Array<TaskType>;
  completedTodos: Array<TaskType>;
  inTestTodos: Array<TaskType>;
  prInProgress: Array<TaskType>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  inProgressTodos,
  setInProgressTodos,
  inTestTodos,
  setInTestTodos,
  prInProgress,
  setPrInProgress,
  setTaskId
}) => {

  const isDraggingStyle = (snapshot: boolean) => snapshot ? "p-6 w-11/12 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-400 dark:border-gray-800" : "bg-gray-400 w-full rounded-lg border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-400 p-6 w-11/12";
  return (
    <div className="container">
      <div className="w-full">
      <Droppable droppableId="1">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading uppercase font-semibold">À traitre</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                setTaskId={setTaskId}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
      <div className="w-full">
      <Droppable droppableId="2">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading uppercase font-semibold">En traitement</span>
            {inProgressTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                setTaskId={setTaskId}
                key={todo.id}
                setTodos={setInProgressTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
      <div className="w-full">
      <Droppable droppableId="3">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading uppercase font-semibold">Traité : PR en cours</span>
            {prInProgress?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                setTaskId={setTaskId}
                key={todo.id}
                setTodos={setPrInProgress}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
     
      <div className="w-full">
      <Droppable droppableId="4">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading uppercase font-semibold">À tester</span>
            {inTestTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                setTaskId={setTaskId}
                key={todo.id}
                setTodos={setInTestTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
      <div className="w-full">
      <Droppable droppableId="5">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={isDraggingStyle(snapshot.isDraggingOver)}
          >
            <span className="todos__heading uppercase font-semibold">Validé</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                setTaskId={setTaskId}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
    </div>
  );
};

export default TodoList;