import React from 'react';
import { Avatar, Badge, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getNotSeenNotifications } from 'store/selectors';
import makeBlockie from 'ethereum-blockies-base64';

interface IUser {
  className?: any;
  account?: string;
}

function User({ className, account }: IUser) {
  const classes = useStyles();
  const notificationNotSeen = useSelector(getNotSeenNotifications);

  return (
    <Badge
      className={clsx(className, classes.main)}
      badgeContent={Math.min(notificationNotSeen, 99)}
      color="primary"
    >
      <Avatar
        alt="Avatar"
        src={makeBlockie(account || '')}
        className={classes.avatar}
      />
    </Badge>
  );
}

export default User;

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '0px 14px',
    cursor: 'pointer',
    '& .MuiBadge-badge': {
      right: 16,
      top: 4,
      width: 20,
      height: 20,
      backgroundColor: '#6F6BC5',
      padding: '0 4px',
    },
  },
  avatar: {
    width: 37,
    height: 37,
    border: '3px solid #FFFFFF',
    '& img': {
      outline: '3px solid rgba(255, 255, 255, 0.32)',
      outlineOffset: '-3px',
      borderRadius: '50%',
    },
  },
}));
