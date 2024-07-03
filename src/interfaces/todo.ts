import { ETodoFilterOptions } from "../enums/todo";

export interface ITodoItem {
    id: number;
    text: string;
    completed: boolean;
}

export interface ITodoState {
    todoList: ITodoItem[];
    filter: ETodoFilterOptions;
}
