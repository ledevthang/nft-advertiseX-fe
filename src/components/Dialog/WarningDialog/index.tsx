import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonDialog from 'components/common/CommonDialog';
import CloseIcon from 'icons/CloseIcon';
import { useSelector } from 'react-redux';
import { getDialogState } from 'store/selectors';

export interface IWarningDialogProps {
  headerTitle: string;
  contentTitle: string;
  textCloseButton: string;
  textAcceptButton: string;
  onClose: () => void;
  onAccept: () => void;
}

export default function WarningDialog() {
  const classes = useStyles();
  const { props } = useSelector(getDialogState);
  const {
    headerTitle,
    contentTitle,
    textCloseButton,
    textAcceptButton,
    onClose,
    onAccept,
  } = props;

  return (
    <CommonDialog isOverridden>
      <Box className={classes.conatiner}>
        <Box className={classes.btnContainer}>
          <Button disableRipple className={classes.closeBtn} onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="h2" className={classes.title}>
          {headerTitle}
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          {contentTitle}
        </Typography>
        <Box className={clsx(classes.wrapperBtn, 'center-root')}>
          <Button onClick={onClose}>
            <Typography>{textCloseButton}</Typography>
          </Button>
          <Button onClick={onAccept}>
            <Typography>{textAcceptButton}</Typography>
          </Button>
        </Box>
      </Box>
    </CommonDialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 'unset',
  },
  conatiner: {
    width: '100%',
    backgroundColor: theme.colors.pureWhite,
    display: 'flex',
    flexDirection: 'column',
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeBtn: {
    padding: 0,
    minWidth: 0,
  },
  title: {
    fontSize: 32,
    lineHeight: 1.4,
    fontWeight: 500,
    margin: '16px 21.5px',
    textAlign: 'center',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },

  subtitle: {
    fontSize: 16,
    lineHeight: '22.4px',
    fontWeight: 400,
    textAlign: 'center',
    margin: '0px 0px 32px',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },

  wrapperBtn: {
    width: '100%',
    marginBottom: 24,
    marginTop: 8,
    '& p': {
      fontSize: 16,
      fontWeight: 600,
    },
    '& button:nth-child(1)': {
      width: 112,
      height: 60,
      '& p': {
        color: '#6F6BC5',
      },
    },
    '&>button:nth-child(2)': {
      width: 183,
      height: 60,
      backgroundColor: '#6F6BC5',
      marginLeft: 24,
      '& p': {
        color: '#FFFFFF',
      },
    },
  },
}));
