import { createContext } from "react";
import { ITodoListContext } from "../types";


export const TodoListContext = createContext<ITodoListContext>({
    deletetask: (id: number) => { },
    toggleTaskStatus: ({ id, completed }) => { },
    saveEditedTask: ({ id, title, description }) => { }
});