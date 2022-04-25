import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";
import Ticket from './ticket/Ticket';
import { TaskType } from '../../types/tasks/TaskType';


const SingleTodo: React.FC<{
  index: number;
  todo: TaskType;
  todos: Array<TaskType>;
  setTodos: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ index, todo, todos, setTodos, setTaskId }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo ] = useState<string>(todo.description);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };


  // const handleDelete = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  // const handleDone = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  //     )
  //   );
  // };

  // console.log(todo)

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => {
        snapshot.isDragging && setTaskId(todo.id.toString());
        return (
        <form
        onSubmit={(e) => {
          handleEdit(e, todo.id);
          setTaskId(todo.id.toString())
        }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        // className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        // className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        > 
        <Ticket task={todo} id={todo.id.toString()}/>
          {/* {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )} */}
          {/* <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              Edit
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              Delete
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              Done
            </span>
          </div> */}
        </form>
        );
        }}
    </Draggable>
  );
};

export default SingleTodo;