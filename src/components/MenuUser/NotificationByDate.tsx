import { Box, makeStyles, Typography } from '@material-ui/core';
import { Notification } from 'types/notification';
import NotificationDetail from './NotificationDetail';

interface INotificationByDate {
  notifications: Notification[];
  label: string;
}

const NotificationByDate = ({ notifications, label }: INotificationByDate) => {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <Typography>{label}</Typography>
      <Box>
        {notifications.map((n) => (
          <NotificationDetail key={n.id} notification={n} />
        ))}
      </Box>
    </Box>
  );
};

export default NotificationByDate;

const useStyles = makeStyles((theme) => ({
  main: {
    '&>p': {
      marginTop: 24,
      marginBottom: -8,
      color: 'rgba(16, 1, 19, 0.4)',
      textAlign: 'center',
    },
  },
}));
