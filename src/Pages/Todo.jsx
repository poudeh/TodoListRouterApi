import React, { useContext } from 'react'
import { useState } from 'react';
import { TodoContext } from '../Context/TodoContextProvider';
import TodoListItem from '../Components/TodoListItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Todo() {
    const [text, setText] = useState("");
    const { todos, addTodo, makeTodoCompleted, makeTodoIncomplete } = useContext(TodoContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
                <Link to={"/SuggestedTasks"} state={"Vue"}>Go To SuggestTakPage</Link>
                <NavLink
                    to="/Profile"
                    className={({ isActive }) =>
                        isActive ? "bg-blue-500 text-white" : "text-gray-500"
                    }
                >
                    Profile
                </NavLink>
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
                    ) :
                        (
                            <li className="text-center text-gray-500">Nothing to do</li>
                        )}
                </ul>
            </div>
            <button type='button' onClick={() => navigate("/Profile", { state: {x:"Hello world!" , y:"Good Bye World!"} })}>Go To Profile Page </button>
            <div className='bg-red-400' onClick={()=> navigate("/Profile")}>Go to profile page2</div>
        </>



    )
}
