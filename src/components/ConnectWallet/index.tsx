import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import CommonDialog from 'components/common/CommonDialog';
// import WarningEditPopup from 'components/Popup/WarningEditPopup';
import { SecureStorageEnum } from 'enums/auth';
import CloseIcon from 'icons/CloseIcon';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppStateAction } from 'store/actions/appActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
// import { loginUserAction } from 'store/actions/userActions';
import {
  getDialogState,
  getEditNFT,
  getNFTEstimate,
  getUserState,
} from 'store/selectors';
import secureStorageUtils from 'utils/secureStorage';
import {
  injected,
} from '../../services/wallet/connector';
import ConnectMethod from './ConnectMethod';
import { isMobileFn } from 'common/helper';

declare global {
  interface Window {
    web3: any;
    ethereum: any;
  }
}

const ConnectWalletDialog = () => {
  const classes = useStyles();

  const { account, library, chainId, error, active, activate, deactivate } =
    useWeb3React();
  const [blockNumber, setBlockNumber] = useState<number | undefined | null>();
  const [market, setMarket] = useState<undefined | string>();
  const dispatch = useDispatch();
  const user = useSelector(getUserState);
  const dialog = useSelector(getDialogState);
  const nftAddEstimate = useSelector(getNFTEstimate);
  const nftEditEstimate = useSelector(getEditNFT);

  useEffect(() => {
    if (error) {
      const isMobile = isMobileFn();
      const snackContent = !isMobile
        ? 'An unknown error occurred. Check the console for more details'
        : 'No Ethereum browser extension  deected, install MetaMask on desktop or visit from a dApp browser on Mobile.';
      dispatch(
        updateAppStateAction({
          isShowSnack: true,
          snackContent,
          type: 'error',
          snackLabel: 'Connection error',
        }),
      );
      setMarket(undefined);
      // setIsConnecting(false);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (library) {
      let stale = false;
      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber);
      };
      library.on('block', updateBlockNumber);

      return () => {
        library.removeListener('block', updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]);

  const onLogin = (name: string) => {
    if (name === market) return;
    setMarket(name);
    // setIsConnecting(true);
    try {
      switch (name) {
        case 'MetaMask':
          activateInjectedProvider('MetaMask');
          activate(injected);
          break;
      }
    } catch (e) {
      // setIsConnecting(false);
    }
  };

  const onLogout = () => {
    deactivate();
    setMarket(undefined);
    secureStorageUtils.removeItem(SecureStorageEnum.ACCOUNT);
  };

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
    dispatch(
      updateAppStateAction({
        isShowSnack: false,
      }),
    );
  };

  const isActive = (name: string) => {
    return market === name && !!user.user && active;
  };

  // const loginErrorCallback = useCallback(() => {
  //   setMarket(undefined);
  //   dispatch(
  //     updateDialogStateAction({
  //       open: true,
  //       component: WarningEditPopup,
  //       props: {
  //         text: 'You have disconnected the access permission. Please contact the admin',
  //         buttonText: 'Agree',
  //       },
  //     }),
  //   );
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!active) return;
  //   dispatch(
  //     loginUserAction(
  //       {
  //         username: account || '',
  //       },
  //       loginErrorCallback,
  //     ),
  //   );
  // }, [active, account, dispatch, loginErrorCallback]);

  useEffect(() => {
    if (!user.user || !active) return;
    // const { market: nMarket } = JSON.parse(
    //   secureStorageUtils.getItem(SecureStorageEnum.ACCOUNT) || '{}',
    // );
    // const newMarket = market || nMarket;
    // secureStorageUtils.setItem(
    //   SecureStorageEnum.ACCOUNT,
    //   JSON.stringify({
    //     market: newMarket,
    //     blockNumber,
    //     account,
    //     chainId,
    //     isAdmin: user.user.isAdmin,
    //   }),
    // );
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, active]);

  const renderBottom = useMemo(() => {
    if (!active || !user.user)
      return (
        <>
          <Typography>Don’t see your wallet provider?</Typography>
          <Typography>If you're on desktop, try Metamask</Typography>
          <Typography>If you're on mobile, try WalletConnect</Typography>
        </>
      );
  }, [active, user]);

  useEffect(() => {
    if (!dialog.props) return;
  }, [dialog, nftAddEstimate, nftEditEstimate, chainId]);

  return (
    <CommonDialog>
      <Box className={classes.main}>
        <Box>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography>Connect wallet</Typography>
        <Box className={classes.method}>
          {connectMethods.map((c) => (
            <ConnectMethod
              address={user.user?.address}
              data={c}
              key={c.name}
              active={isActive(c.name)}
              onLogin={onLogin}
              onLogout={onLogout}
              disabled={!!market}
            />
          ))}
        </Box>
        <Box className={classes.bottom}>{renderBottom}</Box>
      </Box>
    </CommonDialog>
  );
};

export default ConnectWalletDialog;

export const activateInjectedProvider = (
  providerName: 'MetaMask' | 'Coinbase',
) => {
  const { ethereum } = window;
  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case 'Coinbase':
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }: { isCoinbaseWallet: boolean }) =>
          isCoinbaseWallet,
      );
      break;
    case 'MetaMask':
      provider = ethereum.providers.find(
        ({ isMetaMask }: { isMetaMask: boolean }) => isMetaMask,
      );
      break;
  }
  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
};

const connectMethods = [
  {
    logoUrl: '/images/metamask-fox.png',
    name: 'MetaMask',
  },
  {
    logoUrl: '/images/wallet-connect.png',
    name: 'WalletConnect',
  },
  {
    logoUrl: '/images/coinbase-wallet.png',
    name: 'Coinbase',
  },
];

const useStyles = makeStyles((theme) => ({
  main: {
    padding: 29,
    width: 337,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    '&>div:nth-child(1)': {
      display: 'flex',
      justifyContent: 'flex-end',
      '& button': {
        padding: 0,
        minWidth: 24,
      },
    },
    '&>p:nth-child(2)': {
      fontSize: 16,
      fontWeight: 700,
      marginTop: 29,
    },
    '&>p:nth-child(3)': {
      marginTop: 24,
      color: 'rgba(16, 1, 19, 0.6)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  method: {
    margin: '24px 0px',
    '&>div:first-child img': {
      width: 32,
      height: 32,
    },
    '&>div:nth-child(2) img': {
      width: 29,
      height: 18,
    },
    '&>div:nth-child(3) img': {
      width: 24,
      height: 24,
    },
    '&>div:nth-child(4) img': {
      width: 24,
      height: 24,
    },
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '& p': {
      color: 'rgba(16, 1, 19, 0.6)',
      fontSize: 13,
    },
    '& p:nth-child(1)': {
      fontWeight: 700,
      marginBottom: 8,
    },
    '& button span p': {
      color: '#6F6BC5 !important',
      fontWeight: '600 !important',
      textTransform: 'none',
      fontSize: '14px !important',
    },
  },
  payBtn: {
    backgroundColor: '#6F6BC5',
    height: 40,
    width: '100%',
    color: '#FFFFFF',
    fontWeight: 600,
    lineHeight: 12,
    textTransform: 'none',
  },
}));
