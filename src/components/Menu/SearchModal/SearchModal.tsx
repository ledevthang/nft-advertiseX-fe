/* eslint-disable react/jsx-no-target-blank */
import React, { useCallback, useState, useMemo } from 'react';
import { Box, Button, Grid, Avatar } from '@material-ui/core';
import CloseIcon from 'icons/CloseIcon';
import Search from '../Search';
import { useStyle } from './styles';
import RocketIconMobile from 'icons/RocketIconMobile';
import DiscordIcon from 'icons/DiscordIcon';
import TwitterIcon from 'icons/TwitterIcon';
import InstagramIcon from 'icons/InstagramIcon';
import AccountBalanceWallet from 'icons/AccountBalanceWallet';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import ConnectWalletDialog from 'components/ConnectWallet';
import { getUserState } from 'store/selectors';
import { renderShortAddress } from 'common/helper';
import LogoutIcon from 'icons/LogoutIcon';
import { logoutUserAction } from 'store/actions/userActions';
import { useWeb3React } from '@web3-react/core';
import NotificationsNone from 'icons/NotificationsNone';
import PrivacyTip from 'icons/PrivacyTip';
import HelpOutline from 'icons/HelpOutline';
import NotificationSetting from 'components/MenuUser/NotificationSetting';
import makeBlockie from 'ethereum-blockies-base64';
import { DISCORD_LINK } from 'common/constant';

export interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal(props: SearchModalProps) {
  const { onClose } = props;
  const classes = useStyle();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [isOpenNotification, setOpenNotification] = useState<
    string | undefined
  >();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(getUserState);
  const { deactivate, active } = useWeb3React();

  const toggleActive = useCallback(() => {
    setActiveSearch(true);
  }, []);

  const offActive = useCallback(() => {
    setActiveSearch(false);
  }, []);

  const onDirectToStaticPage = useCallback(
    (path: string) => {
      if (location.pathname === path) return;
      history.push(path);
      onClose();
    },
    [location, history, onClose],
  );

  const onDirectToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  const onLogin = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: ConnectWalletDialog,
        props: undefined,
      }),
    );
  }, [dispatch]);

  const onLogout = useCallback(() => {
    deactivate();
    dispatch(logoutUserAction());
    onDirectToHome();
  }, [deactivate, dispatch, onDirectToHome]);

  const handleClickRocketIcon = useCallback(() => {
    onClose();
    onDirectToStaticPage('/nft');
  }, [onClose, onDirectToStaticPage]);

  const renderButton = useMemo(() => {
    if (user.user && active) {
      return (
        <Grid className={classes.wrapDisConnect} onClick={onLogout}>
          <Grid className={classes.textDisConnect}>DISCONNECT WALLET</Grid>
          <LogoutIcon color="#6F6BC5" width={24} height={22} />
        </Grid>
      );
    } else {
      return (
        <Grid className={classes.wrapButtonConnect} onClick={onLogin}>
          <Grid className={classes.textButton}>CONNECT WALLET</Grid>
          <AccountBalanceWallet color="#FFFFFF" />
        </Grid>
      );
    }
  }, [user, active, classes, onLogin, onLogout]);

  return (
    <>
      {isOpenNotification !== 'notification' ? (
        <Grid className={classes.wrapModal}>
          <Grid className={classes.wrapIconClose}>
            <Button onClick={onClose}>
              <CloseIcon color="#100113" />
            </Button>
          </Grid>
          <Grid className={classes.wrapMenuSearch}>
            <Grid
              onClick={toggleActive}
              className={clsx(classes.wrapInputSearch, {
                [classes.wrapInputSearchActive]:
                  activeSearch || location.pathname !== '/',
              })}
            >
              <Search offActive={offActive} offSearchModal={onClose} />
            </Grid>
            {!activeSearch && location.pathname === '/' && (
              <>
                <div className={classes.borderSearch}></div>
                <RocketIconMobile onClick={handleClickRocketIcon} />
              </>
            )}
          </Grid>
          <Grid className={classes.wrapMenu}>
            <Grid
              className={classes.itemMenu}
              onClick={() => onDirectToStaticPage('/about')}
            >
              ABOUT
            </Grid>
            <Grid
              className={classes.itemMenu}
              onClick={() => onDirectToStaticPage('/faq/all')}
            >
              FAQ
            </Grid>
            <Grid
              className={classes.itemMenu}
              onClick={() => onDirectToStaticPage('/contact')}
            >
              CONTACT
            </Grid>
          </Grid>
          <div className={classes.borderTopIcon}></div>
          <div className={classes.borderBottomIcon}></div>
          {user.user && active && (
            <Grid
              className={classes.wrapInforUser}
              onClick={() => onDirectToStaticPage('/user')}
            >
              <Box className={classes.avatar}>
                <Avatar
                  src={makeBlockie(user.user?.address || '')}
                  className={classes.avatarIcon}
                />
              </Box>
              <Grid>
                <Grid className={classes.addressWallet}>
                  {renderShortAddress(user.user.address, 6, 4)}
                </Grid>
                <Grid className={classes.wallet}>Wallet</Grid>
              </Grid>
            </Grid>
          )}
          {renderButton}
          <Grid>
            <button
              className={classes.itemNotication}
              onClick={() => {
                setOpenNotification('notification');
              }}
              disabled={!user.user}
            >
              <NotificationsNone color="#100113" />
              <Grid className={classes.textNotication}>Notifications</Grid>
            </button>
            <button
              className={classes.itemNotication}
              onClick={() => {
                history.push('/terms-of-service', {
                  signal: 'terms-of-service',
                });
                onClose();
              }}
            >
              <PrivacyTip color="#100113" />
              <Grid className={classes.textNotication}>Privacy</Grid>
            </button>
            <button
              className={classes.itemNotication}
              onClick={() => {
                history.push('/faq/all');
                onClose();
              }}
            >
              <HelpOutline color="#100113" />
              <Grid className={classes.textNotication}>Help</Grid>
            </button>
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.wrapModal}>
          <Grid className={classes.wrapIconClose}>
            <Button onClick={onClose}>
              <CloseIcon color="#100113" />
            </Button>
          </Grid>
          {user.user && active && (
            <Grid
              className={classes.wrapInforUser}
              onClick={() => onDirectToStaticPage('/user')}
            >
              <Box className={classes.avatar}>
                <Avatar
                  src={makeBlockie(user.user?.address || '')}
                  className={classes.avatarIcon}
                />
              </Box>
              <Grid>
                <Grid className={classes.addressWallet}>
                  {renderShortAddress(user.user.address, 6, 4)}
                </Grid>
                <Grid className={classes.wallet}>Wallet</Grid>
              </Grid>
            </Grid>
          )}
          <NotificationSetting setStateSetting={setOpenNotification} />
        </Grid>
      )}
    </>
  );
}
