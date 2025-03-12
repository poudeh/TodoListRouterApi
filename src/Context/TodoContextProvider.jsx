import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Read a book", completed: false },
  ]);

  const [suggestedTasks, setSuggestedTasks] = useState([
    { id: 3, text: "Walk the dog", completed: false },
    { id: 4, text: "Cook dinner", completed: false },
    { id: 5, text: "Do laundry", completed: false },
    { id: 6, text: "Going to shop", completed: false },

  ]);

  // Moved checkedTasks state to context
  const [checkedTasks, setCheckedTasks] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  // Fix: addWholeTodo now adds a single task object properly.
  const addWholeTodo = (task) => {
    setTodos([...todos, { ...task, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const ToggleSuggestedTasks = (id)=> {
    const index = suggestedTasks.findIndex(t=> t.id == id);
    let newTaskITems = [...suggestedTasks]
    newTaskITems[index].completed = !newTaskITems[index].completed;
    setSuggestedTasks(newTaskITems);

  }

  const addTask = (text) => {
    setSuggestedTasks([
      ...suggestedTasks,
      { id: Date.now(), text, completed: false }
    ]);
  };

  const removeSuggestedTask = (taskIds) => {
    setSuggestedTasks(suggestedTasks.filter(task => !taskIds.includes(task.id)));
  };

  const handleCheckboxChange = (taskId) => {
    setCheckedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleAddCheckedTasks = () => {
    // Gather the tasks from suggestedTasks that are checked
    const tasksToAdd = suggestedTasks.filter(task =>
      checkedTasks.includes(task.id)
    );
    if (tasksToAdd.length === 0) return;

    // Add each checked task to todos
    tasksToAdd.forEach(task => addWholeTodo(task));

    // Remove the checked tasks from suggestedTasks
    removeSuggestedTask(checkedTasks);

    // Clear the checked tasks state
    setCheckedTasks([]);
  };

  const makeTodoCompleted = (id) => {
    let mainTodo = todos.find(todo => todo.id === id);
    if (mainTodo) {
      mainTodo.completed = true;
      setTodos(state =>
        state.map(todo =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
    }
  };

  const makeTodoIncomplete = (id) => {
    let mainTodo = todos.find(todo => todo.id === id);
    if (mainTodo) {
      mainTodo.completed = false;
      setTodos(state =>
        state.map(todo =>
          todo.id === id ? { ...todo, completed: false } : todo
        )
      );
    }
  };

    return (
      <TodoContext.Provider value={{
        todos,
        setTodos,
        addTodo,
        addWholeTodo,
        toggleTodo,
        removeTodo,
        suggestedTasks,
        addTask,
        checkedTasks,
        handleCheckboxChange,
        handleAddCheckedTasks,
        makeTodoCompleted,
        makeTodoIncomplete
      }}>
        {children}
      </TodoContext.Provider>
    );
  }