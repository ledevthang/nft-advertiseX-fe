/* eslint-disable */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import Filter from 'components/Filter';
import FilterMobile from 'components/Filter/FilterMobile';
import Results1001 from 'components/Results1001';
import TwelveBlocks from 'components/TwelveBlocks';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateAppStateAction } from 'store/actions/appActions';
import {
  getBlocksCategories,
  getFilterState,
  scrollState,
} from 'store/selectors';
import { useLocation } from 'react-router-dom';
import {
  getCollectionsAction,
  resetCollectionsAction,
} from 'store/actions/collectionActions';
import {
  getCategoriesAction,
  resetFilterCategoriesAction,
} from 'store/actions/categoriesActions';
import { SortEnum } from 'enums/sortEnum';

interface IHome {
  toggleDeadzone: (value?: boolean) => void;
  isDeadzone: boolean;
}

interface IsStyle {
  isExpand: boolean;
  isScrolling: boolean;
  isDesktop: boolean;
}

const Home = ({ toggleDeadzone, isDeadzone }: IHome) => {
  const [isGrid4x4, setIsGrid4x4] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isScrolling = useSelector(scrollState);
  const classes = useStyles({ isExpand, isScrolling, isDesktop });
  const [maxNFTsPerRow, setNFTsPerRow] = useState(6);
  const dispatch = useDispatch();
  let firstRender = useRef(true);
  const infiniteLoaderRef = useRef<any>(null);
  const blockCategories = useSelector(getBlocksCategories);
  const filter = useSelector(getFilterState, shallowEqual);
  const location = useLocation();

  const categoryName = location.pathname.replace('/', '').toUpperCase();

  const onScroll = useCallback(
    (e: any) => {
      if (window.blockNumber == 13) return;
      const dzId = window.positionIds.findIndex((i) => i == 1002);
      if (dzId < 0) {
        toggleDeadzone(false);
        return;
      }
      const row =
        ((e.srcElement || e).scrollTop + (e.srcElement || e).clientHeight / 2) /
        (window.heightNFT || 1);
      if (Math.ceil(row) >= (dzId + 1) / window.nftsPerRow) {
        if (!window.deadzone) {
          window.deadzone = true;
          toggleDeadzone(true);
        }
      } else {
        if (window.deadzone) {
          window.deadzone = false;
          toggleDeadzone(false);
        }
      }
    },
    [toggleDeadzone],
  );

  const onScrollMobile = useCallback(() => {
    if (window.blockNumber == 13) return;
    const dzId = window.positionIds.findIndex((i) => i == 1002);
    if (dzId < 0) {
      toggleDeadzone(false);
      return;
    }
    const row =
      (window.scrollY + window.innerHeight / 2) / (window.heightNFT || 1);
    if (Math.ceil(row) >= (dzId + 1) / window.nftsPerRow) {
      if (!window.deadzone) {
        window.deadzone = true;
        toggleDeadzone(true);
      }
    } else {
      if (window.deadzone) {
        window.deadzone = false;
        toggleDeadzone(false);
      }
    }
  }, [toggleDeadzone]);

  useEffect(() => {
    firstRender.current = false;
    const listNFTsWrapper = document.getElementById(NFTS_ID);
    const scrollComponent = listNFTsWrapper?.lastChild;
    if (!isMobile && scrollComponent) {
      window.positionIds = [];
      scrollComponent.addEventListener('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScrollMobile);
    }
    return () => {
      window.positionIds = [];
      toggleDeadzone(false);
      scrollComponent?.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScrollMobile);
    };
  }, [isMobile]);

  if (firstRender.current) {
    dispatch(
      updateAppStateAction({
        isLoaded: false,
      }),
    );
    // dispatch(
    //   updateFilterAction({
    //     ...initialFilterState,
    //     blockNumber: undefined,
    //   }),
    // );
  }

  useEffect(() => {
    const listNFTsWrapper = document.getElementById(NFTS_ID);
    const scrollComponent = listNFTsWrapper?.lastElementChild;
    if (scrollComponent) {
      onScroll(scrollComponent);
    }
  }, [maxNFTsPerRow]);

  useEffect(() => {
    document.title = `/${categoryName}`;
  }, [categoryName]);

  const filterCategory = useMemo(() => {
    if (blockCategories.blockCategories.category) {
      return true;
    } else {
      return false;
    }
  }, [blockCategories]);

  const getListCollections = useCallback(() => {
    dispatch(getCollectionsAction({}));
  }, [dispatch]);

  const resetListCollections = useCallback(() => {
    dispatch(resetCollectionsAction());
  }, [dispatch]);

  const getListCategories = useCallback(() => {
    dispatch(
      getCategoriesAction({
        includeIcon: true,
        sortBy: 'VolumeAll',
        sortType: SortEnum.Desc,
      }),
    );
  }, [dispatch]);

  const resetFilterCategories = useCallback(() => {
    dispatch(resetFilterCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    getListCollections();
    getListCategories();
    return () => {
      resetFilterCategories();
      resetListCollections();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      className={clsx(classes.container, {
        [classes.deadzone]: isDeadzone,
        [classes.deadzoneFilter]: isDeadzone && filterCategory,
      })}
    >
      {!isDesktop && (
        <TwelveBlocks isDeadzone={isDeadzone} toggleDeadzone={toggleDeadzone} />
      )}
      <Box className={classes.main}>
        {!isMobile && (
          <Filter
            isGrid4x4={isGrid4x4}
            setIsGrid4x4={setIsGrid4x4}
            isExpand={isExpand}
            setIsExpand={setIsExpand}
            isDeadzoneZZ={isDeadzone}
            isDesktop={isDesktop}
          />
        )}
        <Box id={NFTS_ID}>
          {isDesktop && (
            <TwelveBlocks
              isDeadzone={isDeadzone}
              toggleDeadzone={toggleDeadzone}
            />
          )}
          <Results1001
            infiniteLoaderRef={infiniteLoaderRef}
            isGrid4x4={isGrid4x4}
            isExpand={isExpand}
            isDeadzoneZZ={isDeadzone}
            setNFTsPerRow={setNFTsPerRow}
          />
        </Box>
        {isMobile && (
          <FilterMobile
            isDeadzone={isDeadzone}
            infiniteLoaderRef={infiniteLoaderRef}
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(Home);

export const NFTS_ID = 'NFTS_ID';

const useStyles = makeStyles((theme) => ({
  container: {
    transition: '0.3s',
  },
  main: {
    display: 'flex',
    '&>div:nth-child(2)': {
      width: ({ isExpand }: IsStyle) =>
        isExpand ? 'calc(100% - 332px)' : 'calc(100% - 60px)',
      [theme.breakpoints.down('md')]: {
        width: ({ isExpand }: { isExpand: boolean }) =>
          isExpand ? 'calc(100% - 251px)' : 'calc(100% - 60px)',
        marginTop: -16,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'fit-content !important',
      },
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 40,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      '&>div:first-child': {
        width: '100%',
      },
    },
    marginTop: ({ isScrolling, isDesktop }: IsStyle) => {
      if (isDesktop) {
        if (isScrolling) {
          return 46;
        } else {
          return 0;
        }
      }
    },
  },
  deadzone: {
    backgroundColor: '#DDE542',
    height: '100vh',
  },
  deadzoneFilter: {
    backgroundColor: '#8d89ce',
    height: '100vh',
  },
}));
