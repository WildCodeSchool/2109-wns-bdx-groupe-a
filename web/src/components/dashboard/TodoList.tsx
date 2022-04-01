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
  CompletedTodos: Array<Todo>;
  inTestTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  inProgressTodos,
  setInProgressTodos,
  inTestTodos,
  setInTestTodos
}) => {

  const isDraggingStyle = (snapshot: boolean) => snapshot ? "p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-500 dark:border-gray-400" : "bg-gray-800 w-full rounded-lg border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-600 p-6";
  return (
    <div className="w-full flex mt-3 justify-between items-center">
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
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={isDraggingStyle(snapshot.isDraggingOver)}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
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
  );
};

export default TodoList;