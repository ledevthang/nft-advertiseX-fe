import { Box, makeStyles, Typography } from '@material-ui/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getMyNotifications } from 'store/selectors';
import NotificationByDate from './NotificationByDate';

interface IActivity {}

const Activity = (props: IActivity) => {
  const classes = useStyles();
  const notifications: any = useSelector(getMyNotifications);
  const renderNotifications = useMemo(() => {
    const timeArr = ['Latest', 'Yesterday', 'Past 7 days', 'Past 30 days'];
    return timeArr
      .map((m) => ({
        type: m,
        notifications: notifications[m],
      }))
      .filter((i) => (i.notifications?.length || 0) > 0)
      .map((m, i) => (
        <NotificationByDate
          key={i}
          label={m.type}
          notifications={m.notifications as any[]}
        />
      ));
  }, [notifications]);

  return (
    <Box className={classes.main}>
      <Box className={classes.header}>
        <Typography>Activity</Typography>
      </Box>
      <Typography className={classes.label}>Your activity</Typography>
      <Box>{renderNotifications}</Box>
    </Box>
  );
};

export default Activity;

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 73,
  },
  header: {
    '& p': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
  label: {
    color: 'rgba(16, 1, 19, 0.6)',
    marginTop: 16,
  },
}));
