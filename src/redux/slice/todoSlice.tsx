import { createSlice } from "@reduxjs/toolkit";

import { ITodoState } from "../../interfaces/todo";
import { ETodoFilterOptions } from "../../enums/todo";

const initialState: ITodoState = {
    todoList: [],
    filter: ETodoFilterOptions.ALL,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoList: (state, action) => {
            state.todoList = action.payload;
        },
        addTodo: (state, action) => {
            state.todoList.push({
                id: state.todoList.length + 1,
                text: action.payload.text.trim(),
                completed: false,
            });
        },
        filterTodo: (state, action) => {
            state.filter = action.payload;
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todoList.find(todo => todo.id === id);
            if (todo) {
                todo.text = text.trim();
            }
        },
        toggleTodo: (state, action) => {
            const id = action.payload;
            const todo = state.todoList.find(todo => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    }
});

export const { setTodoList, addTodo, filterTodo, updateTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
