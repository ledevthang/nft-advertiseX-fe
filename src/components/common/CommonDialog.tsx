import React, { ReactElement } from 'react';
import { Dialog, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getDialogState } from 'store/selectors';
import CommonSnackBar from './CommonSnack';

interface IDialog {
  children: ReactElement;
  isOverridden?: boolean;
}
const CommonDialog = ({ children, isOverridden }: IDialog) => {
  const dialog = useSelector(getDialogState);
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={dialog.open}
      className={clsx(classes.main, { [classes.overrides]: isOverridden })}
    >
      <>
        <CommonSnackBar />
        {children}
      </>
    </Dialog>
  );
};

export default CommonDialog;

const useStyles = makeStyles((theme) => ({
  main: {
    '& .MuiPaper-rounded': {
      borderRadius: 0,
      maxWidth: 'unset',
    },
    '&>div': {
      overflow: 'hidden',
      '&>div>div': {
        padding: 32,
      },
    },
  },
  overrides: {
    '& .MuiPaper-root': {
      width: 610,
      [theme.breakpoints.down('md')]: {
        width: 467,
      },
      [theme.breakpoints.down('sm')]: {
        width: 300,
      },
    },
  },
}));
