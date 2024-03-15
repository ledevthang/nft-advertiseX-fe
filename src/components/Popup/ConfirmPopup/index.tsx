import React, { useCallback } from 'react';
import CommonDialog from 'components/common/CommonDialog';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from 'icons/CloseIcon';
import { useDispatch, useSelector } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getDialogState } from 'store/selectors';

function ConfrimPopup() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { callback, text, subTitle, txtBtnLeft, txtBtnRight } =
    useSelector(getDialogState).props;

  const onClose = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  }, [dispatch]);

  const handleDelete = () => {
    callback && callback();
    onClose();
  };

  return (
    <CommonDialog>
      <Box className={classes.container}>
        <Box className={classes.closeIcon}>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography className={classes.msg}>{text}</Typography>
        <Typography className={classes.subTitle}>{subTitle}</Typography>

        <Box className={classes.btn}>
          <Button className={classes.firstBtn} onClick={onClose}>
            {txtBtnLeft || 'Cancel'}
          </Button>
          <Button className={classes.secondBtn} onClick={handleDelete}>
            {txtBtnRight || 'Delete'}
          </Button>
        </Box>
      </Box>
    </CommonDialog>
  );
}

export default ConfrimPopup;

const useStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 0,
  },
  msg: {
    fontWeight: 500,
    fontSize: 32,
    marginTop: 20,
    textAlign: 'center',
    whiteSpace: 'pre-line',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  subTitle: {
    marginTop: 5,
    fontWeight: 400,
    fontSize: 16,
  },
  btn: {
    marginTop: 32,
    '& button': {
      fontWeight: 600,
      fontSize: 16,
      height: 60,
    },
  },
  firstBtn: {
    marginRight: 24,
    color: '#6F6BC5',
  },
  secondBtn: {
    color: '#FFFFFF',
    backgroundColor: '#6F6BC5',
    [theme.breakpoints.up('md')]: {
      width: 153,
    },
  },
}));
