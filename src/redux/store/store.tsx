import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "../slice/todoSlice";

const store = configureStore({
    reducer: TodoReducer
});

export default store;
