import { memo, useContext, useState } from 'react';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete, Build } from '@material-ui/icons';
import { TodoListContext } from '../../context/TodoListContext';
import { TodoItem as TodoItemProps } from '../../types';
import './styles.scss';

const TodoItem = ({ id, title, description, completed }: TodoItemProps) => {
  const { deletetask, toggleTaskStatus, saveEditedTask } = useContext(TodoListContext);
  const [titleText, setTitleText] = useState<string>('');
  const [descriptionText, setDescriptionText] = useState<string>('');
  const [isEditable, setIsEditable] = useState(false);

  const editTask = (): void => {
    setTitleText(title);
    setDescriptionText(description);
    setIsEditable(true);
  };

  const saveEdited = (): void => {
    saveEditedTask({ id, title: titleText, description: descriptionText });
    setTitleText('');
    setDescriptionText('');
    setIsEditable(false);
  };

  return (
    <div className="todo-item-block">
      <div className="status-info">
        <Checkbox checked={completed} onClick={() => toggleTaskStatus({ id, completed: !completed })} />
        {!isEditable ? (
          <div className="info-block">
            <b>{title}</b>
            <span>{description}</span>
          </div>
        ) : (
          <div className="info-block">
            <input value={titleText} onChange={e => setTitleText(e.target.value)} />
            <input value={descriptionText} onChange={e => setDescriptionText(e.target.value)} />
          </div>
        )}
      </div>
      {!isEditable ? (
        <div>
          <IconButton color="primary" aria-label="Edit" onClick={editTask}>
            <Build fontSize="small" />
          </IconButton>
          <IconButton color="secondary" aria-label="Delete" onClick={() => deletetask(id)}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <Button color="default" onClick={saveEdited}>
          Save
        </Button>
      )}
    </div>
  );
};

const areEqual = function (prevProps: any, nextProps: any) {
  if (
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.completed === nextProps.completed
  ) {
    return true;
  }
  return false;
};

export default memo(TodoItem, areEqual);
