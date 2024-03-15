import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterState } from 'store/selectors';
import CloseIcon from 'icons/CloseIcon';
import { updateFilterAction } from 'store/actions/filterActions';
import { EChain } from 'enums/filter';
import clsx from 'clsx';

interface IChainFilter {
  value: EChain;
  Icon: React.ReactNode;
  className?: string;
  chain: EChain;
}

interface IStyle {
  chain: EChain;
  isSelect: boolean;
}

function ChainFilter({ value, Icon, className, chain }: IChainFilter) {
  const filter = useSelector(getFilterState);
  const dispatch = useDispatch();
  const isSelect = filter.chains.indexOf(value) >= 0;
  const classes = useStyles({ chain, isSelect });

  const onRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    const chains = [...filter.chains];
    const index = chains.indexOf(value);
    if (index < 0) return;
    chains.splice(index, 1);
    dispatch(
      updateFilterAction({
        chains,
      }),
    );
  };

  const onSelect = () => {
    const chains = [...filter.chains];
    const index = chains.indexOf(value);
    if (index >= 0) return;
    chains.push(value);
    dispatch(
      updateFilterAction({
        chains,
      }),
    );
  };

  return (
    <Box
      className={clsx(classes.main, {
        [classes.selectedBackgroundColor]: isSelect,
      })}
      onClick={onSelect}
    >
      <Box className={clsx(classes.wrapper, className)}>
        {Icon}
        <Typography className={classes.chainName}>{value}</Typography>
      </Box>
      {isSelect && (
        <Button onClick={onRemove}>
          <CloseIcon />
        </Button>
      )}
    </Box>
  );
}

export default ChainFilter;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0px 16px',
    height: 48,
    width: 'auto',
    borderBottom: '1px solid #100113',
    '& button': {
      padding: 0,
      minWidth: 20,
      marginRight: 12,
    },
    '& svg:last-child': {
      height: 16,
    },
    [theme.breakpoints.down('md')]: {
      height: 47,
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      textTransform: 'capitalize',
    },
    '& svg': {
      width: 10,
      height: 16,
      marginLeft: ({ chain }: IStyle) => (chain === EChain.SOLANA ? 5 : 5),
    },
  },
  selectedBackgroundColor: {
    backgroundColor: 'rgba(111, 107, 197, 0.08)',
  },
  chainName: {
    fontWeight: ({ isSelect }: IStyle) => (isSelect ? 'bold' : 'unset'),
    marginLeft: ({ chain }: IStyle) => (chain === EChain.SOLANA ? 11 : 14.2),
  },
}));
