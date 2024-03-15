import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyle } from './style';
import clsx from 'clsx';

interface ITimeBox {
  label: string;
  value?: string;
  className?: string;
  classes?: {
    valueBox?: string;
  };
}

function TimeBox(props: ITimeBox) {
  const { label, value, className, classes } = props;
  const style = useStyle();
  return (
    <Box className={clsx(className, style.container)}>
      <Typography className={style.label}>{label}</Typography>
      <Box className={clsx(style.value, classes?.valueBox)}>
        <div>{value}</div>
      </Box>
    </Box>
  );
}

export default TimeBox;
