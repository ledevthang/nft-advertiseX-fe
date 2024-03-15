import React, { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyle } from './style';

interface IValueBox {
  label: string;
  children: ReactElement;
  className?: string;
}

function ValueBox(props: IValueBox) {
  const { label, children, className } = props;
  const classes = useStyle();
  return (
    <Box className={className}>
      <Typography className={classes.label}>{label}</Typography>
      <Box>{children}</Box>
    </Box>
  );
}

export default ValueBox;
