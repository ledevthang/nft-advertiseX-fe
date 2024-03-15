import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonDialog from 'components/common/CommonDialog';
import CloseIcon from 'icons/CloseIcon';
import { useDispatch } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { useStyles } from './styles';

export default function TextMessageDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [gif, setGif] = useState<string>();

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  };

  useEffect(() => {
    const min = Math.ceil(1);
    const max = Math.floor(12);
    const gifNumber = Math.floor(Math.random() * (max - min + 1) + min);
    setGif(`/gifs/cowboy_${gifNumber}.gif`);
  }, []);

  return (
    <CommonDialog isOverridden>
      <Box className={classes.conatiner}>
        <Box className={classes.btnContainer}>
          <Button disableRipple className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="h2" className={classes.title}>
          Woah, slow down there cowboy...
        </Typography>
        <img src={gif} alt="" className={classes.gif} />
        <Typography
          variant="body1"
          className={clsx(classes.subtitle, classes.firstSubtitle)}
        >
          It seems the item you are trying to clone has reached its max number
          of copies (4) per wallet.
        </Typography>
        <Typography
          variant="body1"
          className={clsx(classes.subtitle, classes.secondSubtitle)}
        >
          Try listing another item. Or just use a different wallet…
        </Typography>
      </Box>
    </CommonDialog>
  );
}
