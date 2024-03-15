/* eslint-disable */
import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  OutlinedInput,
  Button,
  ButtonGroup,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import clsx from 'clsx';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import { isStringNumber, isStringIntegerNumber } from 'utils/validateAddNFT';
import { isNil } from 'lodash';
import { useStyles } from './styles';
import { getSummarize } from 'store/selectors';
import BigNumber from 'bignumber.js';

export enum StepInputComponentTypeEnum {
  DECIMAL = 'DECIMAL',
  INTERGER = 'INTERGER',
}

export interface IStepInputComponent {
  label: string;
  value?: string;
  range?: [number, number | undefined];
  step: number;
  placeholder?: string;
  className?: string;
  type?: StepInputComponentTypeEnum;
  onChange: (value?: string, otherValue?: string, highValue?: string) => void;
  reverse?: boolean;
  isEdit?: boolean;
  onBlur?: () => void;
}

export default function StepInputComponent(props: IStepInputComponent) {
  const {
    reverse,
    label,
    value,
    range,
    step,
    placeholder,
    className,
    type = StepInputComponentTypeEnum.DECIMAL,
    onChange,
    onBlur,
  } = props;

  const classes = useStyles(props);
  const nftAmount = useSelector(getSummarize).nfts;

  const valueInputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (isNil(newValue) || newValue === '') {
        onChange(newValue);
      } else {
        if (type === StepInputComponentTypeEnum.INTERGER) {
          if (!isStringIntegerNumber(newValue)) {
            onChange(isNil(value) ? '' : value);
            return;
          }
        } else {
          if (!isStringNumber(newValue)) {
            onChange(isNil(value) ? '' : value);
            return;
          }
        }

        const convertedValue = Number(newValue);
        if (
          range &&
          (convertedValue < range[0] || (range[1] && convertedValue > range[1]))
        ) {
          onChange(value);
          return;
        }

        onChange(newValue.replace(',', '.'));
      }
      setCursor(event.target.selectionStart);
    },
    [range, value, type, onChange],
  );

  const onIncrement = useCallback(() => {
    let newValue: number;
    if (!value) {
      newValue = step;
    } else {
      newValue = Number(value) + step;
    }
    onChange(newValue.toString());
  }, [value, range, step, onChange]);

  const onDecrement = useCallback(() => {
    if (!value) {
      onChange(step.toString());
      return;
    }

    let newValue = new BigNumber(Number(value));
    const newValueTypeNumber = newValue.minus(step).toNumber();

    if (range && newValueTypeNumber < range[0]) return;

    if (newValueTypeNumber < 0) {
      onChange('0');
      return;
    }
    onChange(newValueTypeNumber.toString());
  }, [value, step, range, onChange]);

  const handleBlur = useCallback(() => {
    if (label === 'Position') {
      if (Number(value) > nftAmount) onChange((nftAmount + 1).toString());
      return;
    }
  }, [value, nftAmount, label]);

  const buttons = useMemo(
    () => [
      <Button
        key="one"
        className={classes.upButton}
        onClick={reverse ? onDecrement : onIncrement}
      >
        <ArrowUpIcon width={8} height={6} />
      </Button>,
      <Button
        key="two"
        className={classes.downButton}
        onClick={reverse ? onIncrement : onDecrement}
      >
        <ArrowDownIcon width={8} height={6} />
      </Button>,
    ],
    [classes, onIncrement, onDecrement],
  );

  const endAdornment = useMemo(() => {
    return (
      <ButtonGroup orientation="vertical" className={classes.groupButton}>
        {buttons}
      </ButtonGroup>
    );
  }, [classes, buttons]);

  useEffect(() => {
    const input = valueInputRef.current;
    if (input && input === document.activeElement)
      input.setSelectionRange(cursor, cursor);
  }, [value, cursor]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.label}>{label}</Typography>
      <ClickAwayListener
        onClickAway={() => {
          if (onBlur) onBlur();
        }}
      >
        <OutlinedInput
          value={value}
          placeholder={placeholder}
          className={clsx(classes.root, className)}
          endAdornment={endAdornment}
          classes={{
            root: classes.root,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused,
          }}
          onChange={onChangeValue}
          inputProps={{
            inputMode: label === 'Position' ? 'numeric' : 'decimal',
          }}
          onBlur={handleBlur}
          inputRef={valueInputRef}
        />
      </ClickAwayListener>
    </Box>
  );
}
