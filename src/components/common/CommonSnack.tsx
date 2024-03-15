/* eslint-disable */
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import WarningIcon from 'icons/WarningIcon';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppStateAction } from 'store/actions/appActions';
import { getSnackState } from 'store/selectors';
import clsx from 'clsx';

interface IProps {}

function Alert(props: AlertProps) {
  const renderIcon = useMemo(() => {
    if (props.severity == 'error') {
      return <WarningIcon />;
    }
  }, [props.severity]);

  return (
    <MuiAlert icon={renderIcon} elevation={6} variant="filled" {...props} />
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    padding: '16px !important',
    [theme.breakpoints.down('sm')]: {
      right: '0px !important',
      left: '0px !important',
    },
    '&>div': {
      position: 'relative',
      '&::before': {
        content: '""',
        width: 4,
        height: '100%',
        bottom: 0,
        top: 0,
        left: 0,
        background: 'red',
        position: 'absolute',
      },
      width: '40%',
      [theme.breakpoints.down('md')]: {
        width: '60%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      alignItems: 'start',
      borderRadius: 0,
    },
    '& .MuiAlert-filledError': {
      backgroundColor: '#FFF0F0',
      color: '#100113',
      fontSize: 12,
      fontWeight: 400,
    },
    '& .MuiAlert-message': {
      paddingBottom: '8px !important',
      padding: 0,
    },
    '& .MuiIconButton-label': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  type: {
    fontSize: '1rem',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
}));

const CommonSnackBar = ({}: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackState = useSelector(getSnackState);
  const handleClose = useCallback(() => {
    dispatch(
      updateAppStateAction({
        isShowSnack: false,
      }),
    );
  }, []);

  return (
    <Snackbar
      open={snackState.isShowSnack}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      className={clsx(classes.main, snackState.snackClass)}
    >
      <Alert onClose={handleClose} severity={snackState.type}>
        <Typography>{snackState.snackLabel}</Typography>
        {snackState.snackContent}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackBar;
