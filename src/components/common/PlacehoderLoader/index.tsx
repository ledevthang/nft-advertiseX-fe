import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './styles';

export interface ILoader {
  className?: string;
}

export default function PlaceholderLoader({ className }: ILoader) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.loading, className)}>
      <span className={classes.circle}></span>
      <span className={clsx(classes.circle, classes.secondCircle)}></span>
      <span className={clsx(classes.circle, classes.thirdCircle)}></span>
    </Box>
  );
}
