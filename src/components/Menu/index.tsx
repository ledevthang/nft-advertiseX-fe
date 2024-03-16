/* eslint-disable react/jsx-no-target-blank */
import { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import LogoIcon from 'icons/LogoIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPriceNFTBaseOnDollarAction } from 'store/actions/nftActions';
import { updateAppStateAction } from 'store/actions/appActions';
import { getBlocksCategories, scrollState } from 'store/selectors';
import IconLogoSmall from 'icons/IconLogoSmall';
import { getAllSearchCategoriesAction } from 'store/actions/categoriesActions';
import { SortEnum } from 'enums/sortEnum';
import { CategorySortOptions } from 'enums/categories';

declare global {
  interface Window {
    isScroll: boolean;
  }
}

interface IMenu {
  displayModal: () => void;
  isDeadzone: boolean;
  onSearchModal?: () => void;
  offSearchModal?: () => void;
}

interface Istyle {
  isScrolling: boolean;
  isDeadzone: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  filterCategory: boolean;
  isCategoryPage: boolean;
}

const Menu = (props: IMenu) => {
  const { isDeadzone } = props;
  const isScrolling = useSelector(scrollState);
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md')) && !isDesktop;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const blockCategories = useSelector(getBlocksCategories);

  const filterCategory = useMemo(() => {
    if (blockCategories.blockCategories.category) {
      return true;
    } else {
      return false;
    }
  }, [blockCategories]);

  const isCategoryPage = useMemo(
    () => location.pathname === '/categories',
    [location.pathname],
  );

  const classes = useStyles({
    isScrolling,
    isDeadzone,
    isDesktop,
    isTablet,
    isMobile,
    filterCategory,
    isCategoryPage,
  });

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

  const onRedirectToHome = useCallback(() => {
    if (history.location.pathname !== '/') {
      history.push('/');
    } else {
      window.location.reload();
      window.scroll({ top: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, dispatch]);

  useEffect(() => {
    if (!isDesktop) return;
    window.addEventListener('scroll', onScroll);
    return () => {
      window?.removeEventListener('scroll', onScroll);
      window.isScroll = false;
      dispatch(
        updateAppStateAction({
          isScrolling: false,
        }),
      );
    };
  }, [isDesktop, onScroll, dispatch, location.pathname]);

  useEffect(() => {
    dispatch(getPriceNFTBaseOnDollarAction());
  }, [dispatch]);

  // call api first before click side navigation
  useEffect(() => {
    dispatch(
      getAllSearchCategoriesAction({
        includeIcon: true,
        sortType: SortEnum.Desc,
        sortBy: CategorySortOptions.TOTAL_ITEMS,
      }),
    );
  }, [dispatch]);

  const logo = useMemo(() => {
    return isDesktop && isScrolling ? (
      <Box className={classes.logo} onClick={onRedirectToHome}>
        <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0' }}>NFT AdvertiseX</p>
      </Box>
    ) : isMobile ? (
      <Box className={clsx(classes.logo, classes.logoMobile)}>
        <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0' }}>NFT AdvertiseX</p>
      </Box>
    ) : (
      <Box className={classes.logo} onClick={onRedirectToHome}>
        <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '0' }}>NFT AdvertiseX</p>
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, isScrolling, isMobile, classes]);

  return (
    <Box
      className={clsx(classes.main, {
        [classes.deadzone]:
          isDeadzone && isDesktop && location.pathname === '/nft',
        [classes.deadzoneBackground]:
          isDeadzone && !isDesktop && location.pathname === '/nft',
        [classes.scrolling]: isDesktop && isScrolling && !isDeadzone,
        [classes.unscrollingInDZ]: !isScrolling && isDeadzone,
      })}
      id={TOP_MENU_ID}
    >
      {logo}
    </Box>
  );
};

export default Menu;

export const TOP_MENU_ID = 'TOP_MENU_ID';

const useStyles = makeStyles((theme) => ({
  deadzone: {
    backgroundColor: '#B7B71D !important',
    height: 40,
  },
  deadzoneBackground: {
    backgroundColor: ({ filterCategory }: Istyle) => {
      if (filterCategory) {
        return ' #8d89ce !important';
      }
      return ' #DDE542 !important';
    },
  },
  main: {
    // transition: '0.1s',
    position: 'fixed',
    zIndex: 3,
    marginTop: 60,
    paddingInline: ({ isCategoryPage }: { isCategoryPage: boolean }) =>
      isCategoryPage ? 24 : 32,
    width: '100%',
    display: 'flex',
    backgroundColor: ({ isDeadzone }: { isDeadzone: boolean }) =>
      isDeadzone ? '#DDE542' : '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: 36,
    },
    [theme.breakpoints.down('sm')]: {
      paddingInline: '16px !important',
    },
    height: ({ isScrolling, isDesktop }: Istyle) => {
      if (isDesktop && isScrolling) {
        return 76;
      }
      if (!isDesktop) {
        return 100;
      }
      return 108;
    },
  },
  unscrollingInDZ: {
    backgroundColor: ({ filterCategory }: Istyle) => {
      if (filterCategory) {
        return ' #8d89ce !important';
      }
      return ' #DDE542 !important';
    },
  },
  scrolling: {
    backgroundColor: '#6f6bc5 !important',
  },
  logo: {
    maxHeight: 60,
    marginRight: 20,
    transition: '0.2s',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      marginRight: 32,
    },
    [theme.breakpoints.down('md')]: {
      flex: 2,
    },
    [theme.breakpoints.down('sm')]: {
      flex: 4,
      marginRight: 0,
    },
  },
  menu_desktop: {
    height: 'inherit',
    flex: 4,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  menuSearch_desktop: {
    display: 'flex',
    flex: 7,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 24,
  },
  menuWrap: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
  },
  menuLeft_desktop: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginRight: '20px',
  },
  menuMid_desktop: {
    height: '24px',
    width: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
  },
  menuRight_desktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 26,
  },
  item_desktop: {
    margin: '0px 8px',
    height: '60px',
    padding: '18px 8px',
    fontSize: 16,
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: ({
        isScrolling,
        isDeadzone,
      }: {
        isScrolling: boolean;
        isDeadzone: boolean;
      }) => (isDeadzone || isScrolling ? '#100113' : '#6F6BC5'),
      fontWeight: 700,
      borderBottom: '1px solid #6F6BC5',
    },
  },
  follow: {
    margin: 18,
    fontSize: 12,
    width: 60,
  },
  icon_desktop: {
    width: 36,
    height: 36,
    margin: 4,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '&:hover': {
      backgroundColor: ({
        isScrolling,
      }: {
        isScrolling: boolean;
        isDeadzone: boolean;
      }) => (isScrolling ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
    },
  },
  menu_tablet: {
    flex: 4,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('sm')]: {},
  },

  addNft_tablet: {
    borderWidth: 1,
    height: 60,
    width: 60,
    borderColor: '#100113',
    backgroundColor: '#6F6BC5',

    [theme.breakpoints.down('md')]: {
      marginRight: 14,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 12,
      height: 48,
      width: 48,
    },
  },
  openMenu_tablet: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#100113',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      height: 48,
      width: 48,
    },
  },
  highLightText: {
    color: ({ isScrolling }: Istyle) => (isScrolling ? '#FFFFFF' : '#6F6BC5'),
    fontWeight: 700,
  },
  logoMobile: {
    width: '50%',
    '& button': {
      paddingRight: 24,
      paddingLeft: 0,
    },
    '& svg': {
      maxWidth: 180,
      width: '100%',
    },
  },
  search_tablet: {
    borderWidth: 1,
    height: 60,
    width: 60,
    borderColor: '#100113',
    backgroundColor: '#100113',

    [theme.breakpoints.down('md')]: {
      marginRight: 14,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 12,
      height: 48,
      width: 48,
    },
  },
}));
