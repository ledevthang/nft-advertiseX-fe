import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterState } from 'store/selectors';
import CloseIcon from 'icons/CloseIcon';
import { updateFilterAction } from 'store/actions/filterActions';
import { EPriceFilter } from 'enums/filter';
import clsx from 'clsx';

interface IPriceFilter {
  value: EPriceFilter;
}
function PriceFilter({ value }: IPriceFilter) {
  const filter = useSelector(getFilterState);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(
      updateFilterAction({
        price: [],
      }),
    );
  };

  const onSelect = () => {
    dispatch(
      updateFilterAction({
        price: [value],
      }),
    );
  };

  return (
    <Box
      className={clsx(classes.main, {
        [classes.selectedBackgroundColor]: filter.price[0] === value,
      })}
      onClick={onSelect}
    >
      <Typography
        style={
          filter.price[0] === value
            ? { fontWeight: 'bold', marginLeft: 8 }
            : { marginLeft: 8 }
        }
      >
        {value}
      </Typography>
      {filter.price[0] === value && (
        <Button onClick={onRemove}>
          <CloseIcon />
        </Button>
      )}
    </Box>
  );
}

export default PriceFilter;

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
    '& svg': {
      width: 16,
      height: 16,
    },
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      height: 47,
    },
  },
  selectedBackgroundColor: {
    backgroundColor: 'rgba(111, 107, 197, 0.08)',
  },
}));
