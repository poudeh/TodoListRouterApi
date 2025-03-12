import React, { useContext, useState } from 'react';
import './App.css';
import TodoListItem from './Components/TodoListItem';
import { TodoContext } from './Context/TodoContextProvider';
import SuggestTask from './Components/SuggestTask';

function App() {
  const {
    todos,
    addTodo,
    suggestedTasks,
    addTask,
    handleAddCheckedTasks,
    handleCheckboxChange,
    checkedTasks,
    makeTodoCompleted,
    makeTodoIncomplete
  } = useContext(TodoContext);

  const [text, setText] = useState("");
  const [suggestTaskText, setSuggestTaskText] = useState("");

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="flex-1 p-2 border rounded-md"
            placeholder="Add a new task..."
          />
          <button
            onClick={() => {
              addTodo(text);
              setText("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {todos.length > 0 ? (
            todos.map(todo => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                makeTodoComplete={makeTodoCompleted}
                makeTodoIncomplete={makeTodoIncomplete}
              />
            ))
          ) : (
            <li className="text-center text-gray-500">Nothing to do</li>
          )}
        </ul>
      </div>

      <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Suggest Tasks</h1>
        <div className="flex gap-2">
          <input
            value={suggestTaskText}
            onChange={(e) => setSuggestTaskText(e.target.value)}
            type="text"
            className="flex-1 p-2 border rounded-md"
            placeholder="Add a new task..."
          />
          <button
            onClick={() => {
              addTask(suggestTaskText);
              setSuggestTaskText("");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
          <button
            onClick={handleAddCheckedTasks}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add checked tasks to todo
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {suggestedTasks.map(task => (
            <SuggestTask
              key={task.id}
              task={task}
              onCheckboxChange={handleCheckboxChange}
              isChecked={checkedTasks.includes(task.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;