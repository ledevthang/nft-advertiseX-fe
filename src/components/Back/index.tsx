import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from 'icons/ArrowBackIcon';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface IData {
  disableBtnLabel?: boolean;
  label?: string;
  isDeadzone?: boolean;
  onClick?: () => void;
}

const Back = ({ disableBtnLabel, label, isDeadzone, onClick }: IData) => {
  const classes = useStyles({ isDeadzone });
  const history = useHistory();

  const onBack = () => {
    if (onClick) {
      onClick();
    } else {
      history.goBack();
    }
  };

  return (
    <Box className={classes.container}>
      <Button onClick={onBack}>
        <ArrowBackIcon />
        {!disableBtnLabel && <Typography>Back</Typography>}
      </Button>
      {label && <Typography>{label}</Typography>}
      {label === 'Block #' && (
        <Typography style={{ color: 'white' }}>0</Typography>
      )}
    </Box>
  );
};

export default Back;

const useStyles = makeStyles((theme) => ({
  container: {
    right: 32,
    left: 32,
    height: 60,
    zIndex: 3,
    backgroundColor: ({ isDeadzone }: { isDeadzone?: boolean }) =>
      isDeadzone ? '#DDE542' : '#FFFFFF',
    borderTop: '1px solid #100113',
    borderBottom: '1px solid #100113',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      position: 'absolute',
      left: 0,
      marginLeft: 28,
      minWidth: 0,
      [theme.breakpoints.down('md')]: {
        marginLeft: 20,
      },
      '& p': {
        fontSize: 16,
        fontWeight: 700,
      },
    },
    '& p': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
}));
