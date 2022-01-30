import { FC, useState, useCallback } from 'react';
import TodoList from './components/todo-list';
import CreateTodo from './components/create-todo';
import { DragEndParams, SaveParams, TodoItem, ToggleTaskStatusParams } from './types';
import { TodoListContext } from './context/TodoListContext';
import { reorder } from './helpers';
import './App.scss';


const App: FC = () => {
  const [list, setList] = useState<TodoItem[]>([
    { id: 1643025319436, title: 'item 1', description: 'desc 1', completed: false },
    { id: 1643025323756, title: 'item 2', description: 'desc 2', completed: true },
  ]);

  const addTask = useCallback(({ title, description }: { title: string; description: string }) => {
    setList([...list, { id: Date.now(), title, description, completed: false }]);
  }, [])

  const deletetask = useCallback(
    (id: number): void => {
      setList(list.filter((item: TodoItem) => item.id !== id));
    },
    [list],
  );

  const saveEditedTask = useCallback(
    ({ id, title, description }: SaveParams): void => {
      const changedList = list.map((item: TodoItem) => {
        if (item.id === id) {
          return { ...item, title, description };
        }
        return item;
      });
      setList(changedList);
    },
    [list],
  );

  const toggleTaskStatus = useCallback(
    ({ id, completed }: ToggleTaskStatusParams): void => {
      const changedList = list.map((item: TodoItem) => {
        if (item.id === id) {
          return { ...item, completed };
        }
        return item;
      });
      setList(changedList);
    },
    [list],
  );

  const onDragEnd = (result: DragEndParams): void => {
    if (!result.destination) {
      return;
    }
    const items: TodoItem[] = reorder(list, result.source.index, result.destination.index);
    setList(items);
  };

  return (
    <div className="App">
      <CreateTodo addTask={addTask} />
      <TodoListContext.Provider value={{ deletetask, toggleTaskStatus, saveEditedTask }}>
        <TodoList list={list} onDragEnd={onDragEnd} />
      </TodoListContext.Provider>
    </div>
  );
};

export default App;
