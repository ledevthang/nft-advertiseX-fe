import React, { useCallback } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonDialog from 'components/common/CommonDialog';
import CloseIcon from 'icons/CloseIcon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { useStyles } from './styles';

export default function TransactionFailedDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();

  const onCloseAndReturnProfile = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  };

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  };

  const redirectTo = useCallback(
    (path: string) => {
      dispatch(
        updateDialogStateAction({
          open: false,
        }),
      );
      history.push(path);
    },
    [dispatch, history],
  );

  return (
    <CommonDialog isOverridden>
      <Box className={classes.conatiner}>
        <Box className={classes.btnContainer}>
          <Button
            disableRipple
            className={classes.closeBtn}
            onClick={onCloseAndReturnProfile}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="h2" className={classes.title}>
          Transaction failed
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Something went wrong with your transaction. Make sure you have enough
          funds and try again
        </Typography>
        <Box className={clsx(classes.wrapperBtn, 'center-root')}>
          <Button onClick={onClose}>
            <Typography>BACK</Typography>
          </Button>
          <Button onClick={() => redirectTo('/')}>
            <Typography>HOME</Typography>
          </Button>
        </Box>
      </Box>
    </CommonDialog>
  );
}
