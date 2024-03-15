import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import CommonDialog from 'components/common/CommonDialog';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import CloseIcon from 'icons/CloseIcon';

export default function CommonFailedDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  };

  return (
    <CommonDialog>
      <Box className={clsx(classes.main, 'center-root')}>
        <Box className={classes.btnContainer}>
          <Button disableRipple className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Box>Failed!</Box>
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
