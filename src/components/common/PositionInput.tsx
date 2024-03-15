import { Button, makeStyles, OutlinedInput } from '@material-ui/core';
import clsx from 'clsx';
import CloseIcon from 'icons/CloseIcon';
import React, { useState } from 'react';

interface IInput {
  position: string;
  onAdd: (pos: string) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
}
const PositionInput = ({
  position,
  onAdd,
  className,
  name,
  multiline,
  rows,
  placeholder,
  type,
}: IInput) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');
  const handleAddPosition = () => {
    if (!value || position.split(',').some((pos) => pos === value)) return;
    if (!position) {
      onAdd([value].join(','));
    } else {
      onAdd([...position.split(','), value].join(','));
    }
    setValue('');
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddPosition();
    }
  };

  const handleRemove = (pos: string) => {
    const positionAfterRemove = position
      .split(',')
      .filter((position) => position !== pos);
    onAdd(positionAfterRemove.join(','));
  };
  return (
    <div className={classes.positionContainer}>
      <div className={classes.positionWrap}>
        {position &&
          position.split(',').map((pos, index) => (
            <span className={classes.positionItem} key={index}>
              {pos}
              <span onClick={() => handleRemove(pos)}>
                <CloseIcon width={16} height={16} />
              </span>
            </span>
          ))}
      </div>
      <div className={classes.positionAdd}>
        <OutlinedInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          multiline={multiline}
          rows={rows}
          type="number"
          classes={{
            root: classes.root,
            focused: classes.focused,
            notchedOutline: classes.notchedOutline,
          }}
          className={clsx(className, classes.root)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleAddPosition}>Add</Button>
      </div>
    </div>
  );
};

export default PositionInput;

const useStyles = makeStyles((theme) => ({
  positionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
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
    '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
  notchedOutline: {
    border: '1px solid rgba(16, 1, 19, 0.2)',
  },
  focused: {},
  positionWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
    maxWidth: '100%',
  },
  positionAdd: {
    display: 'flex',
  },
  positionItem: {
    padding: '2px 6px',
    backgroundColor: '#ccc',
    borderRadius: '14px',
    minWidth: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > svg:hover': {
        opacity: 0.7,
        cursor: 'pointer',
      },
    },
  },
}));
