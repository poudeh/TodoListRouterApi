import React, { useContext } from 'react';
import { TodoContext } from '../Context/TodoContextProvider';

export default function TodoListItem({ todo , makeTodoComplete , makeTodoIncomplete }) {
  const { toggleTodo, removeTodo  } = useContext(TodoContext);

  return (
    <li className={`flex justify-between items-center p-2 border-b ${todo.completed ? 'bg-green-100' : ''}`}>
      <input
        type="checkbox"
        className="w-5 h-5 accent-green-500"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => removeTodo(todo.id)} className="text-red-500 hover:text-red-700">
        ❌
      </button>
      <button className='bg-green-500' onClick={()=>makeTodoComplete(todo.id)}>Make Todo Complete</button>
    </li>
  );
}