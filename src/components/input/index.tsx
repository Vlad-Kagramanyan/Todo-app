import { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputProps } from '../../types';
import './styles.scss';

const Input = ({ value, label, setValue }: InputProps) => {
  return <TextField label={label} variant="outlined" value={value} onChange={e => setValue(e.target.value)} />;
};

export default memo(Input);
