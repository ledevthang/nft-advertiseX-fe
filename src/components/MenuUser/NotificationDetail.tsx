import { makeStyles, Typography } from '@material-ui/core';
import BadgeDot from 'icons/BadgeDot';
import { Notification } from 'types/notification';

interface INotificationDetail {
  notification: Notification;
}

const NotificationDetail = ({ notification }: INotificationDetail) => {
  const classes = useStyles();
  // const ref = useRef<any>();
  // const isVisible = useOnScreen(ref);
  // const isCalled = useRef(false);
  // useEffect(() => {
  //   if (isVisible && !isCalled.current && notification.status == 'not seen') {
  //     dispatch(updateSeenNotification(notification.id));
  //     isCalled.current = true;
  //   }
  // }, [isVisible]);

  return (
    <div className={classes.main}>
      <Typography
        dangerouslySetInnerHTML={{ __html: notification.content }}
      ></Typography>
      {notification.status === 'not seen' && <BadgeDot color="#6F6BC5" />}
    </div>
  );
};

export default NotificationDetail;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    '& svg': {
      marginRight: -16,
    },
  },
}));
