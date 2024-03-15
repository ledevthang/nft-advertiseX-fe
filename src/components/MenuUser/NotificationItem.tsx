import { Box, Checkbox, makeStyles, Typography } from '@material-ui/core';

interface INotificationItem {
  label: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotificationItem = ({
  label,
  checked,
  handleChange,
}: INotificationItem) => {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <Typography>{label}</Typography>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        name={label}
        classes={{ root: classes.root, checked: classes.checked }}
      />
    </Box>
  );
};

export default NotificationItem;

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  root: {
    padding: '9px 0px',
    color: 'rgba(16, 1, 19, 0.2)',
  },
  checked: {
    color: '#6F6BC5 !important',
  },
}));
