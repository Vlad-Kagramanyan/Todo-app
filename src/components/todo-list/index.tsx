import { memo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from '../todo-item';
import { TodoItem as TodoItemProps, TodoListParams } from '../../types';

const TodoList = ({ list, onDragEnd }: TodoListParams) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item: TodoItemProps, index: number) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TodoItem
                      key={item.id.toString()}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      completed={item.completed}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const areEqual = function (prevProps: TodoListParams, nextProps: TodoListParams) {
  return prevProps.list === nextProps.list;
};

export default memo(TodoList, areEqual);
