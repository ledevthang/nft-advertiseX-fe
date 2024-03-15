import React, { useCallback } from 'react';
import CommonDialog from 'components/common/CommonDialog';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from 'icons/CloseIcon';
import { useDispatch } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { useSelector } from 'react-redux';
import { getDialogState } from 'store/selectors';

function WarningEditPopup() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { props } = useSelector(getDialogState);

  const onClose = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  }, [dispatch]);

  return (
    <CommonDialog>
      <Box className={classes.container}>
        <Box className={classes.closeIcon}>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography className={classes.msg}>{props.text}</Typography>
        <Box className={classes.btn}>
          <Button className={classes.firstBtn} onClick={onClose}>
            {props.buttonText}
          </Button>
        </Box>
      </Box>
    </CommonDialog>
  );
}

export default WarningEditPopup;

const useStyle = makeStyles((theme) => ({
  container: {
    height: 250,
    width: 550,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 0,
  },
  msg: {
    fontWeight: 400,
    fontSize: 15,
    marginTop: 20,
    whiteSpace: 'pre-line',
  },
  btn: {
    marginTop: 32,
  },
  firstBtn: {
    backgroundColor: '#6F6BC5',
    color: 'white',
    '&:hover': {
      opacity: 0.7,
    },
  },
}));
