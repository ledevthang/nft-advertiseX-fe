import {
  Avatar,
  Badge,
  Box,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { renderShortAddress } from 'common/helper';
import Back from 'components/Back';
import MenuUser from 'components/MenuUser';
import UserNFTs from 'components/UserNFT';
import makeBlockie from 'ethereum-blockies-base64';
import useTitle from 'hooks/useTitle';
import Notifications from 'icons/Notifications';
import Settings from 'icons/Settings';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyNFTsAction } from 'store/actions/nftActions';
import {
  getNFTs,
  getNotSeenNotifications,
  getPaginationNFT,
  getUserState,
} from 'store/selectors';

const UserPage = () => {
  const classes = useStyles();
  const user = useSelector(getUserState);
  const nfts = useSelector(getNFTs);
  console.log(nfts);
  const nftPagination = useSelector(getPaginationNFT);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [stateSetting, setStateSetting] = useState<string | undefined>();
  const [menuType, setMenuType] = useState<
    'settings' | 'activities' | undefined
  >();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notificationNotSeen = useSelector(getNotSeenNotifications);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setStateSetting(undefined);
    setMenuType('settings');
    setAnchorEl(event.currentTarget);
  };

  const onOpenActivityMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setStateSetting(undefined);
    setMenuType('activities');
    setAnchorEl(event.currentTarget);
  };

  const callback = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    dispatch(
      getMyNFTsAction(
        {
          pageNumber: 1,
          pageSize: 24,
          filterBy: 'Recently Added',
        },
        callback,
      ),
    );
  }, [dispatch, user.user?.address]);

  const avatarUrl = useMemo(() => {
    try {
      const avatar = makeBlockie(user?.user?.address || '');
      return avatar;
    } catch (error) {
      return undefined;
    }
  }, [user]);

  useTitle('Profile | NFT AdvertiseX');

  return (
    <>
      {isLoaded && (
        <Box className={classes.main}>
          <Back />
          <Box className={classes.container}>
            <Box className={classes.user}>
              <Avatar src={avatarUrl} className={classes.avatar} />
              <Box className={classes.userWrapper}>
                {!isMobile && (
                  <Box>
                    <Typography>Wallet</Typography>
                    <Typography>
                      {user.user && renderShortAddress(user.user.address, 6, 4)}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className={classes.square}>
                <Typography>Squares</Typography>
                <Box>
                  <Typography>
                    {nftPagination.total - Number(nftPagination.totalInactive)}
                  </Typography>
                  <Typography>/</Typography>
                  <Typography>{nftPagination.total}</Typography>
                </Box>
              </Box>
              <Box
                className={clsx(classes.notificationIcon, 'center-root')}
                onClick={onOpenActivityMenu}
              >
                {notificationNotSeen ? (
                  <Badge variant="dot">
                    <Notifications />
                  </Badge>
                ) : (
                  <Notifications />
                )}
              </Box>
              <Button className={classes.setting} onClick={handleClick}>
                <Settings />
              </Button>
            </Box>
          </Box>
          {isMobile && (
            <Box className={classes.walletMobile}>
              <Typography>
                {user.user && renderShortAddress(user.user.address, 6, 4)}
              </Typography>
              <Typography>Wallet</Typography>
            </Box>
          )}
          <UserNFTs nfts={nfts} nftPagination={nftPagination} />
          <MenuUser
            stateSetting={stateSetting}
            setStateSetting={setStateSetting}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            type={menuType}
            avatarUrl={avatarUrl}
          />
        </Box>
      )}
    </>
  );
};

export default UserPage;

const useStyles = makeStyles((theme) => ({
  main: {},
  container: {
    display: 'flex',
    width: '100%',
    padding: '47px 0px 40px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 16px 15px 0px',
    },
  },
  user: {
    display: 'flex',
    marginLeft: 130,
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 50,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 4,
    },
  },
  avatar: {
    width: 100,
    height: 100,
    boxSizing: 'content-box',
    border: '6px solid rgba(0, 0, 0, 0.16)',
    [theme.breakpoints.down('md')]: {
      width: 68,
      height: 68,
      border: '4px solid rgba(0, 0, 0, 0.16)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 52,
      height: 52,
    },
    '& img': {
      outline: '6px solid rgba(255, 255, 255, 0.32)',
      outlineOffset: '-6px',
      borderRadius: '50%',
      [theme.breakpoints.down('md')]: {
        outline: '4px solid rgba(255, 255, 255, 0.32)',
        outlineOffset: '-4px',
      },
      [theme.breakpoints.down('sm')]: {
        outline: '3px solid rgba(255, 255, 255, 0.32)',
        outlineOffset: '-3px',
      },
    },
  },
  userWrapper: {
    padding: '0px 40px',
    '& p:first-child': {
      fontSize: 8,
    },
    '& p:last-child': {
      fontSize: 24,
      fontWeight: 700,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  square: {
    width: 120,
    height: 45,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderLeft: '1px solid rgba(16, 1, 19, 0.24)',
    borderRight: '1px solid rgba(16, 1, 19, 0.24)',
    '&>p': {
      fontSize: 8,
    },
    '& div': {
      display: 'flex',
      '& p': {
        fontSize: 24,
        fontWeight: 700,
      },
      '& p:nth-child(2)': {
        fontWeight: 400,
        color: '#6F6BC5',
      },
      '& p:last-child': {
        color: '#6F6BC5',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: 80,
      border: 'none',
      marginLeft: 20,
    },
  },
  notificationIcon: {
    marginLeft: 40,
    height: 32,
    cursor: 'pointer',
    '& span span': {
      minWidth: 6,
      height: 6,
      backgroundColor: '#6F6BC5',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: 90,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderLeft: '1px solid rgba(16, 1, 19, 0.24)',
      borderRight: '1px solid rgba(16, 1, 19, 0.24)',
    },
  },
  setting: {
    marginLeft: 'auto',
  },
  walletMobile: {
    marginBottom: 35,
    '& p:first-child': {
      fontSize: 16,
      fontWeight: 700,
    },
    '& p:nth-child(2)': {
      fontSize: 8,
    },
  },
}));
