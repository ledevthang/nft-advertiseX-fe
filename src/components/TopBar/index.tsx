import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import ConnectWalletDialog, {
  activateInjectedProvider,
} from 'components/ConnectWallet';
import { SecureStorageEnum } from 'enums/auth';
import AccountBalanceWallet from 'icons/AccountBalanceWallet';
import AddIcon from 'icons/AddIcon';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateAppStateAction } from 'store/actions/appActions';
import {
  injected,
} from 'services/wallet/connector';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getNotificationsAction } from 'store/actions/notificationActions';
import { getSummarizeAction } from 'store/actions/summarizeActions';
import {
  getUserAction,
  loginUserAction,
  logoutUserAction,
} from 'store/actions/userActions';
import { getSummarize, getUserState } from 'store/selectors';
import secureStorageUtils from 'utils/secureStorage';
import TopBarData from './TopBarData';
import User from './User';
import { WalletEnum } from 'enums/wallet';
import RocketIcon from 'icons/RocketIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
// import 'swiper/swiper.min.css';
// import 'swiper/modules/pagination/pagination.min.css';
import EthStatsBarIcon from 'icons/EthStatsBarIcon';
import { clientRoutesEnum } from 'enums/routes';

interface ITopBar {
  isDeadzone: boolean;
}

function TopBar(props: ITopBar) {
  const { isDeadzone } = props;
  const summarize: any = useSelector(getSummarize);

  const classes = useStyles(props);
  const history = useHistory();
  const dispatch = useDispatch();
  const autoLogin = useRef(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useSelector(getUserState, shallowEqual);

  const map: any = useMemo(
    () => ({
      MetaMask: injected,
    }),
    [],
  );

  const { active, error, account, activate, deactivate } = useWeb3React();

  const onRouterToAdNFT = () => {
    if (history.location.pathname === '/add-nft') {
      const nftToEstimate = JSON.parse(
        secureStorageUtils.getItemSS(SecureStorageEnum.NFT_TO_ESTIMATE) || '',
      );

      if (nftToEstimate) {
        secureStorageUtils.removeItemSS(SecureStorageEnum.ADD_NFT_STATUS);
        secureStorageUtils.removeItemSS(SecureStorageEnum.NFT_TO_ESTIMATE);
        window.location.reload();
        window.scrollTo(0, 0);
      }
      return;
    }
    history.push('/add-nft');
  };

  const onRedirectToUserPage = () => {
    if (history.location.pathname === '/user') return;
    history.push('/user');
  };

  const onLogin = () => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: ConnectWalletDialog,
        props: undefined,
      }),
    );
  };

  const isUnlocked = async (market: WalletEnum) => {
    // coin base
    let provider = window.ethereum;
    if (market === WalletEnum.META_MASK) {
      window.ethereum.providers?.forEach((p: any) => {
        // meta mask
        if (p.isMetaMask) provider = p;
      });
    }

    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
        params: [],
      });
      return accounts.length > 0;
    } catch (e) {
      return false;
    }
  };

  const onLogout = useCallback(() => {
    deactivate();
    dispatch(logoutUserAction());
    if (history.location.pathname === '/user') {
      history.push('/');
    }
  }, [history, deactivate, dispatch]);

  const connectWallet = async () => {
    const accessToken = secureStorageUtils.getItem(
      SecureStorageEnum.ACCESS_TOKEN,
    );
    const { market } = JSON.parse(
      secureStorageUtils.getItem(SecureStorageEnum.ACCOUNT) || '{}',
    );
    if (!autoLogin.current && !active && accessToken) {
      onLogout();
      return;
    }

    autoLogin.current = false;
    if (!market || !accessToken || active || error) return;
    if (market === WalletEnum.META_MASK || market === WalletEnum.COIN_BASE) {
      const isUnlock = await isUnlocked(market);
      if (!isUnlock) {
        return;
      }
      activateInjectedProvider(market);
    }
    activate(map[market]);
  };

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const updateUserLocal = () => {
    const accountLocal = JSON.parse(
      secureStorageUtils.getItem(SecureStorageEnum.ACCOUNT) || '{}',
    );
    localStorage.setItem(
      SecureStorageEnum.ACCOUNT,
      JSON.stringify({
        ...accountLocal,
        account,
      }),
    );
  };

  useEffect(() => {
    if (!account) return;
    const { account: accountLocal } = JSON.parse(
      secureStorageUtils.getItem(SecureStorageEnum.ACCOUNT) || '{}',
    );
    if (account === accountLocal) return;
    dispatch(
      loginUserAction(
        {
          username: account,
        },
        () => {},
        updateUserLocal,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, dispatch]);

  const summarizeNew: any = useMemo(() => {
    const replacements = Object.keys(summarize).map((s) => ({
      [mapKeyToLabel[s]]: summarize[s],
    }));
    return replacements.reduce((a, b) => Object.assign({}, a, b));
  }, [summarize]);

  useEffect(() => {
    dispatch(getSummarizeAction());
    if (secureStorageUtils.getItem(SecureStorageEnum.ACCESS_TOKEN)) {
      dispatch(getUserAction());
      dispatch(getNotificationsAction());
    } else {
      secureStorageUtils.removeItem(SecureStorageEnum.ACCOUNT);
    }
  }, [user.user?.address, dispatch]);

  useEffect(() => {
    dispatch(getSummarizeAction());
  }, [history.location.pathname, dispatch]);

  useEffect(() => {
    if (error) {
      if (error.name === 'UnsupportedChainIdError') {
        onLogout();
      }
    }
  }, [error, onLogout]);

  const renderValue = useMemo(() => {
    return Object.keys(summarizeNew).map((key: string) => {
      return {
        label: key,
        value: summarizeNew[key],
      };
    });
  }, [summarizeNew]);

  const renderIconEthStats = useMemo(
    () => (value: string) => {
      if (
        value === 'First place' ||
        value === 'Last place' ||
        value === '24H volume' ||
        value === 'All time volume'
      ) {
        return <EthStatsBarIcon />;
      }
    },
    [],
  );

  const renderValueMobile = useCallback((label, value) => {
    if (!value) return 0;
    if (label === 'NFTs' || label === 'Owners' || label === 'Collections') {
      return Math.min(value, 1001);
    }
    if (label === 'First place' || label === 'Last place') {
      return Number(value).toFixed(5);
    } else if (label === '24H volume' || label === 'All time volume') {
      if (value < 0.001) return '< 0.001';
      return Number(value).toFixed(3);
    }
    return value;
  }, []);

  const renderItemSwiper = useMemo(() => {
    return renderValue.map((item, key) => {
      return (
        <SwiperSlide key={key}>
          <Box className={classes.wrapItem}>
            {renderIconEthStats(item.label)}
            <Box display="flex" alignItems="baseline">
              <Typography className={classes.value}>
                {renderValueMobile(item.label, item.value)}
              </Typography>
              <Typography className={classes.label}>{item.label}</Typography>
            </Box>
          </Box>
        </SwiperSlide>
      );
    });
  }, [renderValue, classes, renderIconEthStats, renderValueMobile]);

  const swiperTopBar = useMemo(() => {
    return (
      <>
        <Swiper
          direction={'vertical'}
          className={classes.swiper}
          id={'always-be-swipin'}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation]}
        >
          {renderItemSwiper}
        </Swiper>
      </>
    );
  }, [renderItemSwiper, classes]);

  const onScroll = useCallback(
    (e: any) => {
      if (window.scrollY && !window.isScroll) {
        window.isScroll = true;
        dispatch(
          updateAppStateAction({
            isScrolling: true,
          }),
        );
      }
      if (!window.scrollY && window.isScroll) {
        window.isScroll = false;
        dispatch(
          updateAppStateAction({
            isScrolling: false,
          }),
        );
      }
    },
    [dispatch],
  );

  const handleClickRocketButton = useCallback(() => {
    history.push(clientRoutesEnum.NFT);
  }, [history]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <Box className={classes.main}>
      <Box
        className={clsx(classes.container, {
          [classes.mobileContainer]: isMobile,
        })}
      >
        {summarizeNew && !isMobile
          ? Object.keys(summarizeNew).map((key: string) => (
              <TopBarData key={key} value={summarizeNew[key]} label={key} />
            ))
          : swiperTopBar}
      </Box>
      <Box className={classes.wrapper}>
        <Button
          className={clsx(classes.addNft, {
            [classes.deadzone]: isDeadzone,
          })}
          onClick={onRouterToAdNFT}
        >
          <AddIcon color="#FFFFFF" />
          <Typography>ADD NFT</Typography>
        </Button>
        {user.user && active ? (
          <Box onClick={onRedirectToUserPage}>
            <User className={classes.user} account={account || ''} />
          </Box>
        ) : (
          <Button className={classes.login} onClick={onLogin}>
            <AccountBalanceWallet color="#FFFFFF" />
          </Button>
        )}
        {history.location.pathname === '/' && (
          <>
            <div className={classes.betweenIcon}></div>
            <Button
              className={classes.rocketButton}
              onClick={handleClickRocketButton}
            >
              <RocketIcon />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default TopBar;

const mapKeyToLabel: any = {
  nfts: 'NFTs',
  owners: 'Owners',
  collections: 'Collections',
  firstPlace: 'First place',
  lastPlace: 'Last place',
  _24HrVolume: '24H volume',
  allTimeVolume: 'All time volume',
};

const useStyles = makeStyles((theme) => ({
  main: {
    height: 60,
    width: '100%',
    position: 'fixed',
    zIndex: 3,
    backgroundColor: '#100113',
    padding: '12px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      height: 36,
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  deadzone: {
    backgroundColor: '#B7B71D !important',
  },
  addNft: {
    backgroundColor: '#6F6BC5',
    height: 60,
    borderRadius: 0,
    padding: '0px 32px 0px 24px',
    '& p': {
      fontWeight: 600,
      color: '#FFFFFF',
      marginLeft: 8,
    },
    '&:hover': {
      backgroundColor: '#6F6BC5',
    },
  },
  user: {
    marginLeft: 20,
  },
  login: {
    width: 32,
    height: 32,
    border: '2px solid #FFFFFF',
    borderRadius: 30,
    minWidth: 0,
    marginLeft: 34,
    marginRight: 16,
    '& svg': {
      width: '0.8em',
      height: '0.8em',
    },
  },
  rocketButton: {
    minWidth: 0,
    marginRight: 30,
    marginLeft: 16,
    padding: 0,
  },
  betweenIcon: {
    height: '24px',
    width: '1px',
    backgroundColor: '#706771',
  },
  wrapItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    '& *': {
      color: '#FFFFFF',
    },
    '& svg': {
      width: 8,
      height: 16,
    },
  },
  value: {
    fontWeight: 700,
    marginLeft: 8,
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 80,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    marginLeft: 8,
    width: 'auto',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  mobileContainer: {
    width: '100%',
  },
  swiper: {
    height: '22px',
    width: '100%',
  },
}));
