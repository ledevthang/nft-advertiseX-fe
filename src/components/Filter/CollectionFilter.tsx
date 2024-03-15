import React from 'react';
import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterState } from 'store/selectors';
import CloseIcon from 'icons/CloseIcon';
import { updateFilterAction } from 'store/actions/filterActions';
import EthIconNew from 'icons/EthIconNew';
import { CollectionData } from 'types/collections';
import clsx from 'clsx';
interface ICollectionFilter {
  value: CollectionData & { index: number };
}
function CollectionFilter({ value }: ICollectionFilter) {
  const filter = useSelector(getFilterState);
  const dispatch = useDispatch();
  const classes = useStyles({
    is100: Number(value.rank) >= 100,
    is10: Number(value.rank) >= 10,
    is1000: Number(value.rank) >= 1000,
  });

  const onRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    const collectionIds = [...filter.collectionIds];
    const index = collectionIds.indexOf(value.id);
    if (index < 0) return;
    collectionIds.splice(index, 1);
    dispatch(
      updateFilterAction({
        collectionIds,
      }),
    );
  };

  const onSelect = () => {
    const collectionIds = [...filter.collectionIds];
    const index = collectionIds.indexOf(value.id);
    if (index >= 0) return;
    collectionIds.push(value.id);
    dispatch(
      updateFilterAction({
        collectionIds,
      }),
    );
  };

  const isSelect = filter.collectionIds.indexOf(value.id) >= 0;

  return (
    <Box
      className={clsx(classes.main, {
        [classes.selectedBackgroundColor]: isSelect,
      })}
      onClick={onSelect}
    >
      <Box className={classes.wrapper}>
        <Typography className={clsx({ [classes.boldText]: isSelect })}>
          #{value.rank}
        </Typography>
        <Avatar
          alt="Avatar"
          src={value.imageUrl || 'images/avatar.png'}
          className={classes.avatar}
        />
        <Box>
          <Box className={classes.wrapper2}>
            <Typography className={clsx({ [classes.boldText]: isSelect })}>
              {value.name}
            </Typography>
            <Typography className={clsx({ [classes.boldText]: isSelect })}>
              {`(${value.totalNFT || 0})`}
            </Typography>
          </Box>
          <Typography className={classes.price}>
            <EthIconNew /> {`${Number(value.totalPrice || 0).toFixed(5)} ETH`}
          </Typography>
        </Box>
      </Box>
      {isSelect && (
        <Button onClick={onRemove}>
          <CloseIcon />
        </Button>
      )}
    </Box>
  );
}

export default CollectionFilter;

const renderWidth = ({
  is10,
  is100,
  is1000,
}: {
  is10: boolean;
  is100: boolean;
  is1000: boolean;
}) => {
  if (is1000) {
    return 48;
  } else if (is100) {
    return 40;
  } else if (is10) {
    return 32;
  }
  return 24;
};
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0px 16px',
    height: 63,
    width: 'auto',
    borderBottom: '1px solid #100113',
    '& button': {
      padding: 0,
      minWidth: 20,
      marginRight: 8,
    },
    '&>button svg:last-child': {
      height: 16,
    },
    [theme.breakpoints.down('md')]: {
      height: 47,
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    '&>p:first-child': {
      width: renderWidth,
      margin: '0px 8px',
    },
  },
  avatar: {
    width: 32,
    height: 32,
  },
  wrapper2: {
    marginLeft: 8,
    display: 'flex',
    '& p:nth-child(2)': {
      fontSize: 12,
      marginLeft: 3,
      fontWeight: 600,
      '& svg': {
        width: 6,
        height: 10,
      },
    },
    '& p:first-child': {
      fontSize: 12,
      maxWidth: 160,
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        maxWidth: 90,
      },
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  price: {
    fontFamily: 'Roboto',
    marginLeft: 8,
    fontSize: 12,
    '& svg': {
      width: 6,
      height: 10,
    },
  },
  boldText: {
    fontWeight: '700 !important' as any,
  },
  selectedBackgroundColor: {
    backgroundColor: 'rgba(111, 107, 197, 0.08)',
  },
}));
