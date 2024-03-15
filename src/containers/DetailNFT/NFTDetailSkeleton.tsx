/* eslint-disable */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, makeStyles } from '@material-ui/core';

interface IData {}

const NFTDetailSkeleton = ({}: IData) => {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" className={classes.action} />
      <Box className={classes.main}>
        <Skeleton variant="rect" className={classes.image} />
        <Box className={classes.wrapper}>
          <Box className={classes.wrapper2}>
            <Skeleton variant="text" className={classes.text} />
            <Skeleton variant="text" className={classes.text} />
            <Skeleton variant="text" className={classes.text2} />
          </Box>
          <Skeleton variant="rect" className={classes.info} />
        </Box>
      </Box>
    </>
  );
};

export default NFTDetailSkeleton;

const useStyles = makeStyles((theme) => ({
  main: {
    border: '1px solid rgba(16, 1, 19, 0.11)',
  },
  wrapper: {
    padding: '0px 16px',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
  },
  image: {
    width: '100%',
    height: 271,
  },
  text: {
    borderRadius: 0,
    height: 'unset',
    marginTop: -4,
  },
  text2: {
    height: 'unset',
    borderRadius: 0,
    marginTop: 8,
    transform: 'unset',
  },
  action: {
    marginTop: 44,
    height: 72,
    marginBottom: 24,
  },
  wrapper2: {
    height: 80,
    padding: '8px 0px',
  },
  info: {
    height: 90,
    marginTop: 16,
    magingBottom: 16,
  },
}));
