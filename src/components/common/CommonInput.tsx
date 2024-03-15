import { makeStyles, OutlinedInput } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface IInput {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
}
const CommonInput = ({
  value,
  onChange,
  className,
  name,
  multiline,
  rows,
  placeholder,
  type,
}: IInput) => {
  const classes = useStyles();

  return (
    <OutlinedInput
      value={value}
      onChange={onChange}
      name={name}
      multiline={multiline}
      rows={rows}
      type={type}
      classes={{
        root: classes.root,
        focused: classes.focused,
        notchedOutline: classes.notchedOutline,
      }}
      className={clsx(className, classes.root)}
      placeholder={placeholder}
    />
  );
};

export default CommonInput;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: 0,
    '& input': {
      height: 0,
      fontSize: 14,
    },
    '&$focused $notchedOutline': {
      borderWidth: 1,
      borderColor: '#100113',
    },
    '& input::placeholder': {
      fontSize: 14,
      color: 'rgba(16, 1, 19, 0.6)',
    },
  },
  notchedOutline: {
    border: '1px solid rgba(16, 1, 19, 0.2)',
  },
  focused: {},
}));
