import { memo, useState } from 'react';
import { Button } from '@material-ui/core';
import Input from '../input';
import { CreateTodoItemParams } from '../../types';

const CreateTodoItem = ({ addTask }: CreateTodoItemParams) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addNewTask = () => {
    if (!title.trim().length || !description.trim().length) {
      return;
    }
    setTitle('');
    setDescription('');
    addTask({ title, description });
  };

  return (
    <div className="header">
      <Input value={title} setValue={setTitle} label={'title'} />
      <br />
      <Input value={description} setValue={setDescription} label="description" />
      <br />
      <Button color="default" onClick={addNewTask}>
        Add
      </Button>
      <br />
    </div>
  );
};

export default memo(CreateTodoItem);
