import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { renderShortAddress } from 'common/helper';
import LogoutIcon from 'icons/LogoutIcon';
import { isMobileFn } from 'common/helper';
import OpenApp from 'react-open-app';
import React from 'react';

interface IConnectMethod {
  data: {
    logoUrl: string;
    name: string;
  };
  active: boolean;
  address?: string;
  disabled: boolean;
  onLogin: (name: string) => void;
  onLogout: () => void;
}

const ConnectMethod = ({
  data,
  onLogin,
  active,
  onLogout,
  address,
  disabled,
}: IConnectMethod) => {
  const classes = useStyles();
  const isMobile = isMobileFn();
  const { ethereum } = window;
  const renderAddress = () => {
    return (active && address && renderShortAddress(address, 6, 17)) || '';
  };

  const onChangeWallet = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isMobile && !ethereum && data.name === 'MetaMask') {
      return;
    }
    e.stopPropagation();
    !disabled && onLogin(data.name);
  };

  const onRemoveLoginSession = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    onLogout();
  };
  return (
    <Box
      className={clsx(classes.main, {
        [classes.backgroundActive]: active,
        [classes.disabled]: disabled,
      })}
      onClick={onChangeWallet}
    >
      {isMobile && !ethereum && data.name === 'MetaMask' ? (
        <OpenApp
          style={{ textDecoration: 'none' }}
          href="https://metamask.app.link/dapp/mintedgem.com"
        >
          <Box display="flex" alignItems="center">
            <Avatar src={data.logoUrl} className={classes.img} />
            <Box className={classes.wrapper}>
              <Typography>{data.name}</Typography>
              <Typography>{renderAddress()}</Typography>
            </Box>
          </Box>
        </OpenApp>
      ) : (
        <Box display="flex" alignItems="center">
          <Avatar src={data.logoUrl} className={classes.img} />
          <Box className={classes.wrapper}>
            <Typography>{data.name}</Typography>
            <Typography>{renderAddress()}</Typography>
          </Box>
        </Box>
      )}
      {active && (
        <Button className={classes.logout} onClick={onRemoveLoginSession}>
          <LogoutIcon />
        </Button>
      )}
    </Box>
  );
};

export default ConnectMethod;

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: 64,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 0,
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    '&>div': {
      marginLeft: 6,
    },
    cursor: 'pointer',
  },
  backgroundActive: {
    backgroundColor: 'rgba(111, 107, 197, 0.04)',
  },
  wrapper: {
    marginLeft: 10,
    '& p:first-child': {
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'none',
      width: 'fit-content',
    },
    '& p:nth-child(2)': {
      fontSize: 11,
      fontWeight: 400,
      color: '#6F6BC5',
    },
  },
  logout: {
    minWidth: 0,
    height: 'fit-content',
    '& svg': {
      width: 16,
      height: 16,
      color: '#6F6BC5',
    },
  },
  disabled: {
    opacity: 0.7,
  },
  img: {
    width: 40,
    height: 40,
    // border: '2px solid rgba(111, 107, 197, 0.16)',
    '& img': {
      objectFit: 'contain',
    },
  },
}));
