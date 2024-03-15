import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Menu,
  Typography,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { renderShortAddress } from 'common/helper';
import CloseIcon from 'icons/CloseIcon';
import LogoutIcon from 'icons/LogoutIcon';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUserAction } from 'store/actions/userActions';
import { getUserState } from 'store/selectors';
import Activity from './Activity';
import EmailSetting from './EmailSetting';
import NotificationSetting from './NotificationSetting';
import Setting from './Setting';
import { updateSeenNotification } from 'store/actions/notificationActions';

interface IMenuUser {
  anchorEl: null | HTMLElement;
  stateSetting?: string;
  setStateSetting: (value: string | undefined) => void;
  setAnchorEl: (value: null | HTMLElement) => void;
  type: 'settings' | 'activities' | undefined;
  avatarUrl?: string;
}

const MenuUser = ({
  anchorEl,
  stateSetting,
  setStateSetting,
  setAnchorEl,
  type,
  avatarUrl,
}: IMenuUser) => {
  const { deactivate } = useWeb3React();
  const dispatch = useDispatch();
  const user = useSelector(getUserState);
  const history = useHistory();

  const handleClose = useCallback(() => {
    if (type === 'activities') {
      dispatch(updateSeenNotification());
    }
    setAnchorEl(null);
  }, [setAnchorEl, type, dispatch]);
  const classes = useStyles();

  const onLogout = () => {
    deactivate();
    dispatch(logoutUserAction());
    handleClose();
    if (history.location.pathname === '/user') {
      history.push('/');
    }
  };

  const renderSetting = useMemo(() => {
    if (!type) return;
    if (type === 'activities') return <Activity />;

    switch (stateSetting) {
      case 'notification':
        return <NotificationSetting setStateSetting={setStateSetting} />;
      case 'email':
        return (
          <EmailSetting
            setStateSetting={setStateSetting}
            handleClose={handleClose}
          />
        );
      default:
        return <Setting setStateSetting={setStateSetting} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSetting, type, handleClose]);

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      classes={{
        paper: classes.main,
      }}
    >
      <Box>
        <Box display="flex" justifyContent="flex-end">
          <Button className={classes.closeBtn} onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" mt={10}>
          <Avatar src={avatarUrl} className={classes.avatar} />
          <Box className={classes.user}>
            <Typography>Wallet</Typography>
            <Box className={classes.wrapper}>
              <Typography>
                {renderShortAddress(user.user?.address || '', 6, 4)}
              </Typography>
              <Button onClick={onLogout}>
                <LogoutIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        {renderSetting}
      </Box>
    </Menu>
  );
};

export default MenuUser;

const useStyles = makeStyles((theme) => ({
  main: {
    left: 'unset !important',
    right: '16px !important',
    width: 337,
    height: 'calc(100vh - 32px)',
    maxHeight: '100% !important',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 24,
    '& ul': {
      padding: 0,
      '&>div': {
        outline: 'none',
      },
    },
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '0 !important',
      right: '0 !important',
      height: '100%',
    },
  },
  closeBtn: {
    padding: 0,
    minWidth: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    border: '4px solid rgba(0, 0, 0, 0.32)',
  },
  user: {
    marginLeft: 32,
    '&>p:first-child': {
      fontWeight: 400,
      fontSize: 8,
    },
  },
  wrapper: {
    display: 'flex',
    '& p': {
      color: '#6F6BC5',
      fontWeight: 600,
    },
    '& svg': {
      width: 16,
      height: 16,
      color: '#6F6BC5',
    },
    '& button': {
      minWidth: 0,
      marginLeft: 24,
    },
  },
}));
