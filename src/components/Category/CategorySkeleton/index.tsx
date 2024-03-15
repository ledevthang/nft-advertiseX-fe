import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';
import { useStyles } from './styles';

const CategorySkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <Skeleton variant="rect" className={classes.img} />
    </Box>
  );
};

export default CategorySkeleton;
