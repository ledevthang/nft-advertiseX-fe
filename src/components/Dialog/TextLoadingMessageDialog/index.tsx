import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CloseIcon from 'icons/CloseIcon';
import { useStyles } from './styles';
import CommonDialog from 'components/common/CommonDialog';
import { useDispatch } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { useHistory } from 'react-router-dom';

export default function TextLoadingMessageDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
    history.push('/user');
  };

  return (
    <CommonDialog isOverridden>
      <Box className={classes.conatiner}>
        <Box className={classes.btnContainer}>
          <Button disableRipple className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="h2" className={classes.title}>
          Your order is processing...
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Adding your NFT to the 1001 any second now...
        </Typography>
        <Box className={classes.loading}>
          <span className={classes.circle}></span>
          <span className={clsx(classes.circle, classes.secondCircle)}></span>
          <span className={clsx(classes.circle, classes.thirdCircle)}></span>
        </Box>
      </Box>
    </CommonDialog>
  );
}
