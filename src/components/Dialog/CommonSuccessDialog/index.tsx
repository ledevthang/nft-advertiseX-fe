import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import CommonDialog from 'components/common/CommonDialog';
import CloseIcon from 'icons/CloseIcon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getDialogState } from 'store/selectors';

export default function CommonSuccessDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { callback } = useSelector(getDialogState).props;

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
    callback && callback();
  };

  return (
    <CommonDialog>
      <Box className={clsx(classes.main, 'center-root')}>
        <Box className={classes.btnContainer}>
          <Button disableRipple className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Box>Success!</Box>
      </Box>
    </CommonDialog>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    padding: 16,
    width: 150,
    backgroundColor: theme.colors.pureWhite,
    flexDirection: 'column',
  },
  btnContainer: {
    width: '100%',
  },
  closeBtn: {
    float: 'right',
    padding: 0,
    minWidth: 0,
  },
}));
