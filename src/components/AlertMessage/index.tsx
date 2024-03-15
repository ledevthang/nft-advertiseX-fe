import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface IAlertMessage {
  message: string;
  className?: string;
  textClass?: string;
}

function AlertMessage(props: IAlertMessage) {
  const { message, className, textClass } = props;
  const classes = useStyle();
  return (
    <Box className={clsx(classes.container, className)}>
      <Typography className={textClass}>{message}</Typography>
    </Box>
  );
}

export default AlertMessage;

const useStyle = makeStyles((theme) => ({
  container: {
    width: 'fix-content',
    height: 42,
    backgroundColor: '#FFEDD9',
    paddingLeft: 16,
    display: 'flex',
    alignItems: 'center',
    marginTop: -12,
    marginBottom: 36,
    '& p': {
      color: '#B16006',
      fontSize: 12,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
}));
