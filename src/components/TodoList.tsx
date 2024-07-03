import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Empty } from "./Empty";
import { Checkbox } from "./Checkbox";

import { ITodoItem, ITodoState } from "../interfaces/todo";
import { ETodoFilterOptions } from "../enums/todo";

import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";

import {
    setTodoList,
    addTodo,
    filterTodo,
    updateTodo,
    toggleTodo
} from "../redux/slice/todoSlice"

const TodoList = () => {
    // Hooks
    const dispatch = useDispatch();
    const todoList = useSelector((state: ITodoState) => state.todoList);
    const filter = useSelector((state: ITodoState) => state.filter);

    // States
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTodo, setSelectedTodo] =  useState<ITodoItem | null>(null);
    const [newTodo, setNewTodo] = useState('');

    // Constants
    const filteredTodoList = todoList.filter((todo: ITodoItem) => {
        if (filter === ETodoFilterOptions.ALL) return true;

        if (filter === ETodoFilterOptions.COMPLETED && todo.completed) return true;

        if (filter === ETodoFilterOptions.INCOMPLETE && !todo.completed) return true;

        return false;
    });

    // Methods
    const filterHandler = (filter: ETodoFilterOptions) => {
        dispatch(filterTodo(filter))
    };

    const updateTodoHandler = (id: number, text: string) => {
        if (text.trim().length === 0) {
            alert('Please enter your todo');
        } else {
            dispatch(updateTodo({ text, id }));
            setIsOpenModal(false);
            setNewTodo('');
            setSelectedTodo(null);
        }
    };

    const toggleTodoHandler = (id: number) => {
        dispatch(toggleTodo(id));
    };

    const createTodoHandler = (text: string) => {
        if (text.trim().length === 0) {
            alert('Please enter your todo');
        } else {
            dispatch(addTodo({ text }));
            setNewTodo('');
            setIsOpenModal(false);
        }
    };

    const deleteTodoHandler = (id: number) => {
        const updatedTodoList = todoList.filter((todo: ITodoItem) => todo.id !== id);

        dispatch(setTodoList(updatedTodoList));

        localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    };

    const cancelHandler = () => {
        setNewTodo('');
        setSelectedTodo(null);
        setIsOpenModal(false);
    };

    // Effects
    useEffect(() => {
        if (todoList.length > 0) {
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
    }, [todoList]);

    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem('todoList') || '[]');

        if (localTodoList) {
            dispatch(setTodoList(localTodoList));
        }
    }, []);

    // Renders
    return (
        <>
            <h1 className="text-center text-2xl md:text-4xl font-bold mb-6">
                TODO LIST APP
            </h1>

            {/* Filter options */}
            <div className="flex items-end justify-end mb-10">
                <label className="mr-2 text-md font-bold">Filter:</label>
                <select
                    className="rounded-md bg-gray-200 border border-gray-300 text-sm"
                    onChange={(e) => filterHandler(e.target.value as ETodoFilterOptions)}
                >
                    <option value={ETodoFilterOptions.ALL}>All</option>
                    <option value={ETodoFilterOptions.COMPLETED}>Completed</option>
                    <option value={ETodoFilterOptions.INCOMPLETE}>Incomplete</option>
                </select>
            </div>

            {/* Todo list */}
            <div className="h-[400px] md:h-[220px] overflow-auto md:min-h-0">
                {filteredTodoList.length === 0 ? (
                    <Empty
                        title="You have no todo's..."
                        description="click the 'Add todo' button to create a new todo"
                        icon={<GrNotes />}
                    />
                ) : (

                        filteredTodoList.map((todo: ITodoItem) => (
                            <div
                                className="flex justify-between items-center p-4 border-b border-gray-300"
                                key={todo.id}
                            >
                                <div className="flex items-center gap-4">
                                    <Checkbox
                                        isChecked={todo.completed}
                                        onClickHandler={() => toggleTodoHandler(todo.id)}
                                    />
                                    <p className={`text-xs md:text-base ${todo.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                                        {todo.text}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md"
                                        onClick={() => {
                                            setIsOpenModal(true);
                                            setSelectedTodo(todo);
                                            setNewTodo(todo.text);
                                        }}
                                    >
                                        <TiPencil />
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md"
                                        onClick={() => deleteTodoHandler(todo.id)}
                                    >
                                        <BsTrash />
                                    </button>
                                </div>
                            </div>
                        ))

                )}
            </div>

            {/* Add todo button */}
            <button
                className="bg-blue-500 hover:bg-blue-600 w-full md:w-48 text-center mt-16 text-white py-3 px-10 rounded-md"
                onClick={() => setIsOpenModal(true)}
            >
                Add todo
            </button>

            {/* Modal */}
            {isOpenModal && (
                <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
                    <div className="bg-white p-4 sm:p-8 rounded-md w-80 sm:w-96">
                        <input
                            className="p-2 mb-8 rounded-md outline-none border border-gray-300 w-full"
                            type="text"
                            placeholder={selectedTodo ? 'Update your todo' : 'Enter your todo'}
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <div className="flex justify-between">
                            {selectedTodo ? (
                                <>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-10 rounded-md"
                                        onClick={() => updateTodoHandler(selectedTodo.id, newTodo)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-3 px-10 rounded-md"
                                        onClick={cancelHandler}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-3 px-10 rounded-md"
                                        onClick={cancelHandler}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-10 rounded-md"
                                        onClick={() => {setIsOpenModal(false), createTodoHandler(newTodo)}}
                                    >
                                        Add
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { TodoList }
