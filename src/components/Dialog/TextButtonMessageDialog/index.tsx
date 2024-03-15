import React from 'react';
import { Box, Button, Dialog, Typography } from '@material-ui/core';
import CloseIcon from 'icons/CloseIcon';
import { useStyles } from './styles';

export interface ITextButtonMessageDialog {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export default function TextButtonMessageDialog(
  props: ITextButtonMessageDialog,
) {
  const { open, onClose, onSubmit } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} classes={{ paper: classes.paper }}>
      <Box className={classes.conatiner}>
        <Box className={classes.btnContainer}>
          <Button disableRipple className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="h2" className={classes.title}>
          You listed your NFT succesufully!
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          If you wish to get updates on your listing, go to your profile
          settings.
        </Typography>
        <Box className={classes.groupBtn} onClick={onClose}>
          <Button disableRipple className={classes.cancelBtn}>
            Cancel
          </Button>
          <Button
            disableRipple
            className={classes.submitBtn}
            onClick={onSubmit}
          >
            subscribe
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
