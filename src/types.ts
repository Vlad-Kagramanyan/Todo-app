export interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean
}

export interface TodoListParams {
    list: TodoItem[];
    onDragEnd: (result: any) => void
}

export interface CreateTodoItemParams {
    addTask: ({ title, description }: { title: string, description: string }) => void;
}

export interface ToggleTaskStatusParams {
    id: number,
    completed: boolean
}

export interface SaveParams {
    id: number, title: string, description: string
}

export interface ITodoListContext {
    deletetask: (id: number) => void;
    toggleTaskStatus: ({ id, completed }: ToggleTaskStatusParams) => void
    saveEditedTask: ({ id, title, description }: SaveParams) => void;
}

export interface DragEndParams {
    destination: {
        index: number;
    };
    source: {
        index: number;
    };
}

export interface InputProps {
    value: string;
    setValue: (text: string) => void;
    label: string;
}