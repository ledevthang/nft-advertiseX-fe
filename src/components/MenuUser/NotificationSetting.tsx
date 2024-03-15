import { Box, Button, makeStyles, Switch, Typography } from '@material-ui/core';
import ArrowBackIcon from 'icons/ArrowBackIcon';
import { useEffect, useRef, useState } from 'react';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { getsUserSettings } from 'store/selectors';
import NotificationItem from './NotificationItem';
import { useDispatch } from 'react-redux';
import { updateUserAction } from 'store/actions/userActions';

interface INotificationSetting {
  setStateSetting: (state: undefined) => void;
}

const NotificationSetting = ({ setStateSetting }: INotificationSetting) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>(initialNotifications);
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(getsUserSettings);
  const [firstCall, setFirstCall] = useState<boolean>(false);
  const isCallAPI = useRef<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    isCallAPI.current = true;
    const value = event.target.checked;
    setChecked(value);
    const newNotifications: any = {};
    if (value) {
      Object.keys(notifications).forEach((k: string) => {
        newNotifications[k] = false;
      });
    } else {
      Object.keys(notifications).forEach((k: string) => {
        newNotifications[k] = true;
      });
    }
    setNotifications(newNotifications);
  };

  const handleChangeNotification = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    isCallAPI.current = true;
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (firstCall) return;
    setNotifications({
      ...notifications,
      ...JSON.parse(settings || '{}'),
    });
    setFirstCall(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useEffect(() => {
    const checkAll = Object.values(notifications).findIndex((n) => n === true);
    setChecked(checkAll < 0);
    if (!isCallAPI.current) return;
    isCallAPI.current = false;
    dispatch(
      updateUserAction({
        settings: JSON.stringify(notifications),
      }),
    );
  }, [notifications, dispatch]);

  return (
    <Box className={classes.main}>
      <Box className={classes.header}>
        <Button onClick={() => setStateSetting(undefined)}>
          <ArrowBackIcon />
        </Button>
        <Typography>Notifications</Typography>
      </Box>
      <Typography className={classes.label}>Notification settings</Typography>
      <Box display="flex" alignItems="center" mt={5.5}>
        <Typography>Suspend all notifications</Typography>
        <Switch
          checked={checked}
          className={classes.switch}
          onChange={handleChange}
          classes={{
            checked: classes.checked,
          }}
        />
      </Box>
      <Box mt={5}>
        {Object.keys(initialNotifications).map((n: string) => (
          <NotificationItem
            key={n}
            label={n}
            checked={notifications[n]}
            handleChange={handleChangeNotification}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotificationSetting;

const initialNotifications = {
  'Item added': false,
  'Item sold': false,
  'Item ended': false,
  'New bid': false,
  'New offer received': false,
  'Moved up 5 squares or more': false,
  'Moved down 5 squares or more': false,
};

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
    marginBottom: 16,
    '& button': {
      minWidth: 0,
      padding: 0,
    },
    alignItems: 'center',
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
  switch: {
    marginLeft: 'auto',
    marginRight: -12,
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
    },
    '& .MuiButtonBase-root': {
      padding: 14,
    },
    '& .MuiSwitch-root': {
      width: 51,
    },
    '& .MuiSwitch-track': {
      backgroundColor: 'rgba(16, 1, 19, 0.2)',
      height: 15,
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#6F6BC5 !important',
    },
  },
  checked: {
    color: '#6F6BC5 !important',
  },
}));
