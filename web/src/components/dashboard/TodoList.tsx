import React from "react";

import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from './types';
import "./styles.css";


interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setInProgressTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setInTestTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  inProgressTodos: Array<Todo>;
  completedTodos: Array<Todo>;
  inTestTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  inProgressTodos,
  setInProgressTodos,
  inTestTodos,
  setInTestTodos
}) => {

  const isDraggingStyle = (snapshot: boolean) => snapshot ? "p-6 w-5/6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-500 dark:border-gray-400" : "bg-gray-800 w-full rounded-lg border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-600 p-6 w-5/6";
  return (
    <div className="container">
      <div className="w-full">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
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
      <Droppable droppableId="InProgressList">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">In Progress Tasks</span>
            {inProgressTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
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
      <Droppable droppableId="InTestList">
        {(provided, snapshot) => (
          <div
            className={isDraggingStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">In Test</span>
            {inTestTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
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
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={isDraggingStyle(snapshot.isDraggingOver)}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
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