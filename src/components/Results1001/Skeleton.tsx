import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, makeStyles } from '@material-ui/core';

interface IData {
  isGrid4x4?: boolean;
  isDetail?: boolean;
}

const NFTSkeleton = ({ isGrid4x4, isDetail }: IData) => {
  const classes = useStyles({ isGrid4x4 });

  return (
    <Box className={classes.main}>
      {isDetail && <Skeleton variant="rect" className={classes.action} />}
      <Skeleton variant="rect" className={classes.image} />
      <Box className={classes.wrapper}>
        <Skeleton variant="text" className={classes.text} />
        <Skeleton variant="text" className={classes.text1} />
        <Skeleton variant="text" className={classes.text2} />
      </Box>
    </Box>
  );
};

export default NFTSkeleton;

const useStyles = makeStyles((theme) => ({
  main: {
    border: '1px solid rgba(16, 1, 19, 0.11)',
  },
  wrapper: {
    padding: '9px 8px',
    height: ({ isGrid4x4 }: { isGrid4x4?: boolean }) => (isGrid4x4 ? 80 : 96),
    [theme.breakpoints.down('md')]: {
      height: '68px !important',
      padding: '4px 8px !important',
    },
  },
  image: {
    paddingBottom: '100%',
    width: '100%',
    height: 0,
  },
  text: {
    borderRadius: 0,
    height: 'unset',
    marginTop: -4,
  },
  text1: {
    borderRadius: 0,
    height: 'unset',
    marginTop: ({ isGrid4x4 }: { isGrid4x4?: boolean }) => (isGrid4x4 ? 0 : 2),
    transform: ({ isGrid4x4 }: { isGrid4x4?: boolean }) =>
      isGrid4x4 ? 'scale(1,0.8)' : 'scale(1,0.9)',
    [theme.breakpoints.down('md')]: {
      marginTop: '-2px !important',
      transform: 'scale(1,0.8) !important',
    },
  },
  text2: {
    height: 'unset',
    borderRadius: 0,
    marginTop: ({ isGrid4x4 }: { isGrid4x4?: boolean }) => (isGrid4x4 ? 6 : 12),
    transform: ({ isGrid4x4 }: { isGrid4x4?: boolean }) =>
      isGrid4x4 ? 'unset' : 'scale(1,1.3)',
    [theme.breakpoints.down('md')]: {
      marginTop: '2px !important',
      transform: 'unset !important',
    },
  },
  action: {},
}));
