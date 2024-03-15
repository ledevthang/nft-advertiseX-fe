import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Box,
  OutlinedInput,
  Button,
  ClickAwayListener,
} from '@material-ui/core';
import clsx from 'clsx';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import HyphenIcon from 'icons/HyphenIcon';
import { isStringNumber, isStringIntegerNumber } from 'utils/validateAddNFT';
import { isNil } from 'lodash';
import { useStyles } from './styles';
import BigNumber from 'bignumber.js';

export enum SelectPositionComponentTypeEnum {
  DECIMAL = 'DECIMAL',
  INTERGER = 'INTERGER',
}

export interface ISelectPositionComponent {
  name: string;
  step: number;
  currentMaxValue: number;
  value?: string;
  range?: [number, number | undefined];
  placeholder?: string;
  className?: string;
  type?: SelectPositionComponentTypeEnum;
  reverse?: boolean;
  isEdit?: boolean;
  isFocused: boolean;
  isDeadZonePosition: boolean;
  onChange: (name: string, value?: string) => void;
  setFocusedCategory: (name?: string) => void;
  onBlur?: () => void;
}

export default function SelectPositionComponent(
  props: ISelectPositionComponent,
) {
  const {
    name,
    reverse,
    value,
    range,
    step,
    placeholder,
    className,
    type = SelectPositionComponentTypeEnum.DECIMAL,
    isFocused,
    isDeadZonePosition,
    setFocusedCategory,
    onChange,
  } = props;

  const backgroundColor = useMemo(() => {
    let backgroundColor: string = '#100113';
    if (isDeadZonePosition && isFocused) {
      backgroundColor = '#DBC026';
    } else if (isDeadZonePosition) {
      backgroundColor = '#100113';
    } else if (isFocused) {
      backgroundColor = '#6F6BC5';
    }
    return backgroundColor;
  }, [isDeadZonePosition, isFocused]);

  const color = useMemo(() => {
    let color: string = '#100113';
    if (isDeadZonePosition) {
      color = '#100113';
    } else if (isFocused) {
      color = '#6F6BC5';
    }
    return color;
  }, [isDeadZonePosition, isFocused]);

  const classes = useStyles({ backgroundColor, color });

  const valueInputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (isNil(newValue) || newValue === '') {
        onChange(name, newValue);
      } else {
        if (type === SelectPositionComponentTypeEnum.INTERGER) {
          if (!isStringIntegerNumber(newValue)) {
            onChange(name, isNil(value) ? '' : value);
            return;
          }
        } else {
          if (!isStringNumber(newValue)) {
            onChange(name, isNil(value) ? '' : value);
            return;
          }
        }

        const convertedValue = Number(newValue);
        if (
          range &&
          (convertedValue < range[0] || (range[1] && convertedValue > range[1]))
        ) {
          onChange(name, value);
          return;
        }

        onChange(name, newValue.replace(',', '.'));
      }
      setCursor(event.target.selectionStart);
    },
    [name, range, value, type, onChange],
  );

  const onIncrement = useCallback(
    (e) => {
      e.stopPropagation();
      setFocusedCategory(name);
      let newValue: number;
      if (!value) {
        newValue = step;
      } else {
        newValue = Number(value) + step;
      }
      onChange(name, newValue.toString());
    },
    [name, value, step, onChange, setFocusedCategory],
  );

  const onDecrement = useCallback(
    (e) => {
      e.stopPropagation();
      setFocusedCategory(name);
      if (!value) {
        onChange(name, step.toString());
        return;
      }
      let newValue = new BigNumber(Number(value));
      const newValueTypeNumber = newValue.minus(step).toNumber();

      if (range && newValueTypeNumber < range[0]) return;

      if (newValueTypeNumber < 0) {
        onChange(name, '0');
        return;
      }
      onChange(name, newValueTypeNumber.toString());
    },
    [name, value, step, range, onChange, setFocusedCategory],
  );

  const handleClickAway = useCallback(
    (e) => {
      e.stopPropagation();
      if (!e.target.id.includes('select-position')) {
        setFocusedCategory(undefined);
      }
    },
    [setFocusedCategory],
  );

  useEffect(() => {
    const input = valueInputRef.current;
    if (input && input === document.activeElement)
      input.setSelectionRange(cursor, cursor);
  }, [value, cursor]);

  return (
    <ClickAwayListener onClickAway={(e) => handleClickAway(e)}>
      <Box className={classes.container}>
        <div className={clsx(classes.startAdornment, classes.icon)}>
          <Button
            className={classes.downButton}
            onClick={(e) => (reverse ? onIncrement(e) : onDecrement(e))}
          >
            <HyphenIcon width={10.3} height={4} color={backgroundColor} />
          </Button>
        </div>
        <OutlinedInput
          id={`select-position-${name}`}
          value={value}
          placeholder={placeholder}
          className={clsx(classes.root, className)}
          classes={{
            root: classes.root,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused,
          }}
          onChange={onChangeValue}
          onFocus={() => setFocusedCategory(name)}
          inputProps={{
            inputMode: 'numeric',
          }}
          inputRef={valueInputRef}
        />
        <div className={classes.icon}>
          <Button
            className={clsx(classes.upButton)}
            onClick={(e) => (reverse ? onDecrement(e) : onIncrement(e))}
          >
            <ArrowUpIcon width={8} height={6} />
          </Button>
        </div>
      </Box>
    </ClickAwayListener>
  );
}
