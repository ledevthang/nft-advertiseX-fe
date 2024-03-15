import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ERROR_MSG, SUCCESS_MSG } from 'common/constant';
import CommonInput from 'components/common/CommonInput';
import ArrowBackIcon from 'icons/ArrowBackIcon';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from 'store/actions/userActions';
import { getUserState } from 'store/selectors';
import isEmail from 'validator/lib/isEmail';

interface IEmailSetting {
  setStateSetting: (state: undefined) => void;
  handleClose: () => void;
}

const EmailSetting = ({ setStateSetting, handleClose }: IEmailSetting) => {
  const [email, setEmail] = useState<string>('');
  const [messageRes, setMessageRes] = useState<string>('');

  const user = useSelector(getUserState);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const showMessage = useCallback((status: boolean) => {
    if (status) {
      setMessageRes(SUCCESS_MSG);
    } else {
      setMessageRes(ERROR_MSG);
    }
  }, []);

  const onUpdateEmail = () => {
    if (!isEmail(email)) {
      setMessageRes(ERROR_MSG);
    } else {
      dispatch(
        updateUserAction(
          {
            email,
          },
          showMessage,
        ),
      );
    }
  };

  useEffect(() => {
    if (user.user?.email) {
      setEmail(user.user.email);
    }
  }, [user]);

  return (
    <Box className={classes.main}>
      <Box className={classes.header}>
        <Button onClick={() => setStateSetting(undefined)}>
          <ArrowBackIcon />
        </Button>
        <Typography>Email</Typography>
      </Box>
      <Typography className={classes.label}>Email Setting</Typography>
      <Box className={classes.wrapperInput}>
        <Typography>E-mail</Typography>
        <CommonInput
          value={email}
          onChange={handleChange}
          className={classes.input}
        />
      </Box>
      <Box
        className={clsx({
          [classes.messageSuccess]: messageRes === SUCCESS_MSG,
          [classes.messageError]: messageRes === ERROR_MSG,
        })}
      >
        <Typography>{messageRes}</Typography>
      </Box>
      <Box className={classes.wrapperBtn}>
        <Button onClick={() => handleClose()}>CANCEL</Button>
        <Button onClick={onUpdateEmail}>SAVE</Button>
      </Box>
    </Box>
  );
};

export default EmailSetting;

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
    },
    marginBottom: 32,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
    '& button': {
      minWidth: 0,
      padding: 0,
    },
    '& p': {
      fontSize: 16,
      fontWeight: 700,
      marginLeft: 16,
    },
  },
  label: {
    color: 'rgba(16, 1, 19, 0.6)',
    marginTop: 8,
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 52,
    '& p': {
      width: 100,
    },
  },
  input: {
    height: 48,
    boxSizing: 'border-box',
  },
  wrapperBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 52,
    '& button': {
      height: 40,
    },
    '& button:first-child': {
      backgroundColor: '#FFFFFF',
      color: '#6F6BC5',
      width: 105,
    },
    '& button:last-child': {
      backgroundColor: '#6F6BC5',
      color: '#FFFFFF',
      marginLeft: 16,
      width: 85,
    },
  },
  messageSuccess: {
    backgroundColor: '#EAFDF5',
    marginLeft: 75,
    marginTop: 8,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    '& p': {
      color: '#17C17C',
      fontSize: 11,
      marginLeft: 8,
    },
  },
  messageError: {
    marginLeft: 75,
    marginTop: 8,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    '& p': {
      color: '#ED5050',
      fontSize: 11,
      marginLeft: 8,
    },
  },
}));
