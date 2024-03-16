/* eslint-disable */
import React, {
  forwardRef,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { isMobileFn } from 'common/helper';
import { NFTS_ID } from 'containers/Home';
import { mapLabelToValue } from 'enums/filter';
import { debounce, isEmpty } from 'lodash';
import memoize from 'memoize-one';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { VariableSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useHistory, useLocation } from 'react-router-dom';
import { updateAppStateAction } from 'store/actions/appActions';
import { getAllBlockAction } from 'store/actions/blockActions';
import { getNFTsAction } from 'store/actions/nftActions';
import {
  resetFilterAction,
  updateFilterAction,
} from 'store/actions/filterActions';
import {
  getBlocksCategories,
  getFilterState,
  getPaginationNFT,
  loadedState,
  scrollState,
  getCategories,
  getNFTs,
} from 'store/selectors';
import DetailNFT from './DetailNFT';
import NFTSkeleton from './Skeleton';
import SponsorAds from './SponsorAds/SponsorAds';
import { Sponsor } from 'types/sponsor';
import SponsorService from 'services/sponsorAds';
import { NFT, NFTGetAllRequest } from 'types/nft';
import { ClearButtonIcon } from 'icons/ClearButtonIcon';
import {
  getBlockCategoriesAction,
  resetBlockCategoriesAction,
} from 'store/actions/blockCategoriesAction';
import { initialFilterState } from 'store/reducers/filterReducer';
import { CATEGORY_LIST } from 'common/constant';

const { ReactWindowScroller } = require('react-window-scroller');

interface IResults1001 {
  isGrid4x4: boolean;
  isExpand: boolean;
  isDeadzoneZZ: boolean;
  infiniteLoaderRef: MutableRefObject<any>;
  setNFTsPerRow: (value: number) => void;
}

const GUTTER_SIZE = 16;

const Results1001 = ({
  isGrid4x4,
  isExpand,
  isDeadzoneZZ,
  infiniteLoaderRef,
  setNFTsPerRow,
}: IResults1001) => {
  const history = useHistory();
  const [maxItemsPerRow, setMaxItemsPerRow] = useState(1);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md')) && !isDesktop;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isScrolling = useSelector(scrollState);

  const nfts = useSelector(getNFTs, shallowEqual);
  const filter = useSelector(getFilterState, shallowEqual);
  const nftPagination = useSelector(getPaginationNFT, shallowEqual);
  const isLoaded = useSelector(loadedState);
  const blockNumber = filter.blockNumber;
  const [dataSponsor, setDataSponsor] = useState<Sponsor>();
  const blockCategories = useSelector(getBlocksCategories);
  const categoryOptions = useSelector(getCategories);
  const location = useLocation();

  const categoryName = location.pathname.replace('/', '').toUpperCase();

  const isFilterByCategory = useMemo(() => {
    return !filter.categories.includes('NFT');
  }, [filter.categories]);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const hasMountedRef = useRef(false);

  const hasMore = useMemo(() => {
    return (
      nftPagination.pageNumber * nftPagination.pageSize < nftPagination.total
    );
  }, [nftPagination]);

  const dispatch = useDispatch();
  const getRandomSponsorAds = useCallback(async () => {
    if (dataSponsor) return;
    try {
      let data = await SponsorService.GetRandomSponsorAds();
      setDataSponsor(data);
    } catch (error) {
      console.error(error);
    }
  }, [setDataSponsor, dataSponsor]);

  useEffect(() => {
    getRandomSponsorAds();
  }, [getRandomSponsorAds]);

  const isDeadzone = useMemo(() => {
    return isDeadzoneZZ && filter.blockNumber === 13;
  }, [isDeadzoneZZ, filter.blockNumber]);

  const loadMoreNFTs = useCallback(() => {
    let paramsQuery: NFTGetAllRequest = {
      pageNumber: nftPagination.pageNumber + 1,
      pageSize: nftPagination.pageSize,
      filterBy: mapLabelToValue[filter.price[0]],
      chains: filter.chains.map((c) => c.toLowerCase()),
      collectionIds: filter.collectionIds,
      blockNumber: filter.blockNumber,
    };
    if (filter.categories.length > 0) {
      paramsQuery.categories = filter.categories[0];
    }
    dispatch(getNFTsAction(paramsQuery));
  }, [dispatch, nftPagination.pageNumber, nftPagination.pageSize, filter]);

  const onScrollToTop = useCallback(() => {
    const listNFTs = document.getElementById(NFTS_ID);
    const scrollComponent = listNFTs?.lastElementChild;
    if (!scrollComponent) return;
    scrollComponent.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const loadPage = useCallback(() => {
    dispatch(
      updateAppStateAction({
        isLoaded: true,
      }),
    );
  }, [dispatch]);

  const refreshNFTList = useCallback(() => {
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache();
      }
    }
    if (!hasMountedRef.current && !location?.state) {
      dispatch(
        updateFilterAction({
          categories: [categoryName],
          blockNumber: undefined,
          blockCategory: undefined,
          collectionIds: [],
        }),
      );
    }
    history.replace(location.pathname);
    hasMountedRef.current = true;

    const filterQuery = {
      pageNumber: 1,
      pageSize: 20,
      blockNumber: filter.blockNumber,
      blockCategory: filter.blockCategory,
    };

    let paramsQuery: NFTGetAllRequest = {
      ...filterQuery,
      filterBy: mapLabelToValue[filter.price[0]] || 'Position',
      chains: filter.chains.map((c) => c.toLowerCase()),
      collectionIds: filter.collectionIds,
      categories: categoryName,
    };
    if (filter.blockNumber === 13) {
      paramsQuery = filterQuery;
    }
    if (filter.blockNumber !== 13 && filter.categories.length > 0) {
      paramsQuery.categories = filter.categories[0];
    }

    // get NFTS
    dispatch(getNFTsAction(paramsQuery, loadPage));
    dispatch(resetBlockCategoriesAction());
    if (categoryName !== 'NFT') {
      dispatch(getBlockCategoriesAction({ category: categoryName }));
    }
    // get 12 block images only when do not filter by category
    console.log('paramsQuery: ', paramsQuery);
    if (!paramsQuery.categories || paramsQuery.categories === 'NFT') {
      dispatch(
        getAllBlockAction({
          include12Blocks: false,
        }),
      );
    }
  }, [
    infiniteLoaderRef.current,
    filter.blockNumber,
    filter.chains,
    filter.collectionIds,
    filter.price,
    filter.categories,
    blockCategories,
    dispatch,
    loadPage,
  ]);

  const debounceRefreshNFTFn = useCallback(debounce(refreshNFTList, 500), [
    refreshNFTList,
  ]);

  useEffect(() => {
    // Dat remove to fix search feature don't work on mobile
    // if (isMobile) return;
    dispatch(
      updateAppStateAction({
        isLoaded: false,
      }),
    );
    onScrollToTop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    debounceRefreshNFTFn();
  }, [
    dispatch,
    filter.chains,
    filter.collectionIds,
    filter.price,
    filter.categories,
    filter.blockNumber,
  ]);

  // useEffect(() => {
  //   dispatch(
  //     updateAppStateAction({
  //       isLoaded: false,
  //     }),
  //   );
  //   if (!isMobile) onScrollToTop();
  //   else window.scrollTo({ top: 0, behavior: 'smooth' });
  //   console.log("trigger line 249");
  //   debounceRefreshNFTFn();
  // }, [filter.blockNumber]);

  const onScroll = useCallback(
    (e: any) => {
      if (e.srcElement.scrollTop && !window.isScroll) {
        window.isScroll = true;
        dispatch(
          updateAppStateAction({
            isScrolling: true,
          }),
        );
      }
      if (!e.srcElement.scrollTop && window.isScroll) {
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

  useEffect(() => {
    window.blockNumber = blockNumber || 0;
    const listNFTsWrapper = document.getElementById(NFTS_ID);
    const scrollComponent = (
      Number(blockNumber) || isFilterByCategory
        ? listNFTsWrapper?.lastChild?.lastChild
        : listNFTsWrapper?.lastChild?.lastChild
    ) as HTMLElement;

    if (scrollComponent)
      scrollComponent.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [blockNumber, isFilterByCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(timer);
  }, [blockNumber]);

  useEffect(() => {
    if (!isLoaded || isMobile) return;
    const listNFTsWrapper = document.getElementById(NFTS_ID);
    const scrollComponent =
      Number(blockNumber) || isFilterByCategory
        ? listNFTsWrapper?.lastChild?.lastChild
        : listNFTsWrapper?.lastChild?.lastChild;
    if (scrollComponent) {
      scrollComponent.addEventListener('scroll', onScroll);
    }
    return () => {
      window.isScroll = false;
      dispatch(
        updateAppStateAction({
          isScrolling: false,
        }),
      );
      scrollComponent?.removeEventListener('scroll', onScroll);
    };
  }, [isMobile, onScroll, dispatch, isLoaded, blockNumber, isFilterByCategory]);

  const getCellStyle = useCallback(
    (columnIndex, style) => {
      return {
        ...style,
        left: Number(
          columnIndex === 0
            ? style.left
            : Number(style.left || 0) + columnIndex * GUTTER_SIZE,
        ),
        right: Number(
          columnIndex === maxItemsPerRow
            ? style.right
            : Number(style.right || 0) + columnIndex * GUTTER_SIZE,
        ),
      };
    },
    [maxItemsPerRow],
  );

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetFilterAction());
  //   };
  // }, []);

  const isItemLoaded = useCallback(
    (index: number) => {
      return !hasMore || index < nfts.length;
    },
    [hasMore, nfts.length],
  );

  const Cell = useCallback(
    ({ columnIndex, rowIndex, style, data }: any) => {
      const index = rowIndex * maxItemsPerRow + columnIndex;
      const {
        listNft,
        isExpand,
        isGrid4x4,
        isDeadzone,
        isFilterByCategory,
        selectedCategory,
      } = data;
      const dataNFT = listNft[index];

      if (!isLoaded) {
        return (
          <div style={getCellStyle(columnIndex, style)}>
            <NFTSkeleton isGrid4x4={isGrid4x4} />
          </div>
        );
      }
      if (dataNFT) {
        const indexDataNFT = dataNFT.position;
        if (dataNFT?.isAd) {
          return (
            <div style={getCellStyle(columnIndex, style)}>
              <SponsorAds
                key={dataNFT.tokenId}
                isExpand={isExpand}
                isGrid4x4={isGrid4x4}
                id={dataNFT.tokenId}
                isDeadzone={isDeadzone}
                index={index}
                dataSponsor={dataNFT}
              />
            </div>
          );
        }

        return (
          <div style={getCellStyle(columnIndex, style)}>
            <DetailNFT
              key={dataNFT.tokenId}
              isExpand={isExpand}
              isGrid4x4={isGrid4x4}
              id={dataNFT.tokenId}
              isDeadzone={isDeadzone || dataNFT.position > 1001}
              index={indexDataNFT}
              isFilterByCategory={isFilterByCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        );
      } else {
        if (!hasMore)
          return <div style={getCellStyle(columnIndex, style)}></div>;
        return (
          <div style={getCellStyle(columnIndex, style)}>
            <NFTSkeleton isGrid4x4={isGrid4x4} />
          </div>
        );
      }
    },
    [maxItemsPerRow, hasMore, isLoaded],
  );

  const width = useMemo(() => {
    if (isDesktop) {
      if (!isExpand) return dimensions.width - 110;
      else return dimensions.width - 382;
    } else if (isTablet) {
      if (!isExpand) return dimensions.width - 110;
      else return dimensions.width - 300;
    } else {
      return dimensions.width - 16 * 2;
    }
  }, [isExpand, isDesktop, isTablet, dimensions.width]);

  const itemWidth = useMemo(() => {
    return (width - 16) / (maxItemsPerRow || 1);
  }, [width, maxItemsPerRow]);

  const renderWidthGrid = useMemo(() => {
    if (isDesktop) {
      const initWidth = dimensions.width - 60 - 24 * 2 - 16 - 16;
      if (!isExpand) return initWidth;
      return initWidth - 272;
    } else if (isTablet) {
      const initWidth = dimensions.width - 60 - 24 * 2 - 16;
      if (!isExpand) return initWidth;
      return initWidth - 190;
    }
    return dimensions.width - 16 * 2;
  }, [isDesktop, isTablet, isExpand, dimensions.width]);

  const renderNfts = useMemo(() => {
    if (!isEmpty(dataSponsor)) {
      const nftListCurrentLength = nfts.length + 1;
      const positionAdsCurrent = dataSponsor.positions
        .sort((a, b) => a - b)
        .filter((position) => position <= nftListCurrentLength);
      const nftListCurrent: (NFT | Sponsor)[] = [...nfts];

      for (let i = 0; i < positionAdsCurrent.length; i++) {
        const pos = positionAdsCurrent[i] - 1;
        nftListCurrent.splice(pos, 0, dataSponsor);
      }
      return nftListCurrent;
    }

    return nfts;
  }, [nfts, dataSponsor]);

  const itemData = useMemo(
    () =>
      memoize(
        (
          items,
          isExpand,
          isGrid4x4,
          isDeadzone,
          isFilterByCategory,
          selectedCategory,
        ) => ({
          listNft: items,
          isExpand,
          isGrid4x4,
          isDeadzone,
          isFilterByCategory,
          selectedCategory,
        }),
      )(
        renderNfts,
        isExpand,
        isGrid4x4,
        isDeadzone,
        isFilterByCategory,
        filter.categories[0],
      ),
    [
      renderNfts,
      isExpand,
      isGrid4x4,
      isDeadzone,
      isFilterByCategory,
      filter.categories,
    ],
  );

  const columnWidth = useCallback(() => {
    return (
      ((renderWidthGrid || 0) - (maxItemsPerRow - 1) * GUTTER_SIZE) /
      maxItemsPerRow
    );
  }, [maxItemsPerRow, renderWidthGrid]);

  const rowHeight = useCallback(() => {
    if (isDesktop) {
      if (isGrid4x4) return itemWidth + 80 + 3;
      else return itemWidth + 96 + 6;
    } else {
      return isMobile ? itemWidth + 76 + 8 : itemWidth + 76 + 8 - 10;
    }
  }, [itemWidth, isGrid4x4, isDesktop, isMobile]);

  const newItemsRendered = useCallback(
    (onItemsRendered: any) => (gridData: any) => {
      const {
        overscanRowStartIndex,
        overscanRowStopIndex,
        overscanColumnStopIndex,
      } = gridData;

      const endCol = overscanColumnStopIndex + 1;

      const startRow = overscanRowStartIndex;
      const endRow = overscanRowStopIndex;

      const visibleStartIndex = startRow * endCol;
      const visibleStopIndex = endRow * endCol;

      onItemsRendered({
        visibleStartIndex,
        visibleStopIndex,
      } as any);
    },
    [],
  );

  const itemKey = useCallback(
    ({ columnIndex, data, rowIndex }: any) => {
      const index = rowIndex * maxItemsPerRow + columnIndex;
      const item = data.listNft[index];
      if (!item) return columnIndex + '-' + rowIndex;
      return `${item.id}-${columnIndex}`;
    },
    [maxItemsPerRow],
  );

  const itemCount = useMemo(() => {
    return renderNfts.length + 1;
  }, [renderNfts.length]);

  useEffect(() => {
    if (isDesktop) {
      if (!isGrid4x4) setMaxItemsPerRow(3);
      else if (isExpand) setMaxItemsPerRow(5);
      else setMaxItemsPerRow(6);
    } else if (isTablet) {
      if (isExpand) setMaxItemsPerRow(2);
      else setMaxItemsPerRow(3);
    } else setMaxItemsPerRow(2);
  }, [isDesktop, isTablet, isGrid4x4, isExpand]);

  const renderHeightOfGrid = useMemo(() => {
    if (isDesktop) {
      if (isDeadzone) {
        return dimensions.height - 382 - 12; // decrease 12px due to increase height of TwelveBlock 12px.
      }
      return dimensions.height - 271.5 - 12; // decrease 12px due to increase height of TwelveBlock 12px
    } else if (isTablet) {
      if (isDeadzone) return dimensions.height - 356 - 12; // decrease 12px due to increase height of TwelveBlock 12px
      return dimensions.height - 269 - 12; // decrease 12px due to increase height of TwelveBlock 12px
    }
    if (isDeadzone) return dimensions.height - 352 - 12; // decrease 12px due to increase height of TwelveBlock 12px
    return window.outerHeight - 248 - 12; // decrease 12px due to increase height of TwelveBlock 12px
  }, [isDesktop, isTablet, dimensions.height, isDeadzone]);

  const classes = useStyles({
    isDeadzone,
    renderWidthGrid,
    isDeadzoneZZ,
    isDesktop,
    isScrolling,
  });

  const innerElementType = forwardRef(({ style, ...rest }: any, ref: any) => (
    <div
      ref={ref}
      style={{
        ...style,
        width: `${renderWidthGrid}px`,
      }}
      {...rest}
    />
  ));

  const gridRef = useRef<any>();

  useEffect(() => {
    window.nftsPerRow = maxItemsPerRow;
    if (gridRef.current) {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        rowIndex: 0,
        shouldForceUpdate: true,
      });
    }
    setNFTsPerRow(maxItemsPerRow);
  }, [width, maxItemsPerRow]);

  const updateDimension = useCallback(() => {
    const isMobile = isMobileFn();
    setDimensions({
      height: isMobile ? window.outerHeight : window.innerHeight,
      width: isMobile ? window.outerWidth : window.innerWidth,
    });
  }, [isMobileFn]);

  useEffect(() => {
    updateDimension();
    const debouncedHandleResize = debounce(function handleResize() {
      updateDimension();
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  const renderRowCount = useMemo(() => {
    const rowNumber = Math.ceil(renderNfts.length / maxItemsPerRow);
    if (!isLoaded) {
      return 2;
    }
    if (hasMore) {
      return rowNumber + 2;
    }
    return rowNumber;
  }, [maxItemsPerRow, nfts.length, hasMore, isLoaded]);

  useEffect(() => {
    if (nfts.length <= 1) return;
    window.positionIds = nfts.map((i) => Number(i.position));
  }, [nfts]);

  const getRowHeight = useCallback(() => {
    const heightItem = rowHeight();
    window.heightNFT = heightItem;
    return heightItem;
  }, [rowHeight]);

  const handleSeeAllCategories = useCallback(() => {
    history.push('/categories');
  }, [history]);

  const handleClearAllFilter = useCallback(() => {
    dispatch(
      updateFilterAction({
        ...initialFilterState,
        blockNumber: undefined,
        blockCategory: undefined,
      }),
    );
    dispatch(resetBlockCategoriesAction());
    history.push('/nft');
  }, [dispatch]);

  const titleBlock = useMemo(() => {
    if (!isFilterByCategory) {
      if (isDeadzone) {
        return (
          <Box className={classes.titleBlockWrapper}>
            <Typography
              className={classes.blockTitle}
              style={{ color: '#100113' }}
            >
              DeadZone
            </Typography>
            <Typography className={classes.blockSubTitle}>
              Items after 1001 cannot be filtered.
            </Typography>
          </Box>
        );
      }

      if (blockNumber !== undefined) {
        return (
          <div className={classes.titleBlockWrapper}>
            <Typography
              className={classes.blockTitle}
            >{`Block ${blockNumber}`}</Typography>
          </div>
        );
      }

      return null;
    } else {
      if (categoryName === 'NFT') return;
      const blockNumberTitle =
        blockNumber === 9 ? 'Continued...' : `Block ${blockNumber}`;
      const categoryDescription = CATEGORY_LIST[categoryName.toLowerCase()];
      return (
        <>
          <Grid container className={classes.titleBlockWrapperCategory}>
            <Grid container item xs={12}>
              <Grid lg={6} container item className={classes.categoryTitle}>
                <Box>
                  {!!blockNumber && (
                    <span className={classes.blockName}>
                      {blockNumberTitle}
                    </span>
                  )}
                  <span className={classes.categoryName}>/{categoryName}</span>
                </Box>
              </Grid>
              <Grid lg={6} container item>
                {!isDesktop ? (
                  <Typography className={classes.categoryDescription}>
                    {categoryDescription}
                  </Typography>
                ) : (
                  <div className={classes.buttonContainer}>
                    <button
                      className={classes.seeAllButton}
                      onClick={handleSeeAllCategories}
                    >
                      See all categories
                    </button>
                    <button
                      className={classes.clearButton}
                      onClick={handleClearAllFilter}
                    >
                      <ClearButtonIcon width={12} height={12} />
                      <span>Clear</span>
                    </button>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.secondContainer}>
              {!isDesktop ? (
                <>
                  <button
                    className={classes.seeAllButton}
                    onClick={handleSeeAllCategories}
                  >
                    See all categories
                  </button>
                  <button
                    className={classes.clearButton}
                    onClick={handleClearAllFilter}
                  >
                    <ClearButtonIcon width={12} height={12} />
                    <span>Clear</span>
                  </button>
                </>
              ) : (
                <Typography className={classes.categoryDescription}>
                  {categoryDescription}
                </Typography>
              )}
            </Grid>
          </Grid>
        </>
      );
    }
  }, [
    isDeadzone,
    isDesktop,
    blockNumber,
    isFilterByCategory,
    categoryOptions,
    filter,
    classes,
  ]);

  const style = useMemo(() => {
    let paddingBottom = 50;
    if (isFilterByCategory || blockNumber) {
      paddingBottom = 160;
    }

    return {
      paddingBottom,
    };
  }, [blockNumber, isFilterByCategory]);
  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreNFTs}
    >
      {({ onItemsRendered, ref }) => {
        return (
          <>
            {isMobile ? (
              <>
                {titleBlock}
                <ReactWindowScroller isGrid>
                  {({ ref: ref1, outerRef, style, onScroll }: any) => (
                    <VariableSizeGrid
                      itemKey={itemKey}
                      columnCount={maxItemsPerRow}
                      columnWidth={columnWidth}
                      height={window.innerHeight}
                      ref={(gridRef1: any) => {
                        gridRef.current = gridRef1;
                        ref1.current = gridRef1;
                        return ref(gridRef);
                      }}
                      innerElementType={innerElementType}
                      rowCount={renderRowCount}
                      onItemsRendered={newItemsRendered(onItemsRendered)}
                      rowHeight={getRowHeight}
                      width={renderWidthGrid + (isDesktop ? 19 : 0)}
                      itemData={itemData}
                      className={classes.container2}
                      style={style}
                      outerRef={outerRef}
                      onScroll={onScroll}
                    >
                      {Cell}
                    </VariableSizeGrid>
                  )}
                </ReactWindowScroller>
              </>
            ) : (
              <div
                style={{
                  paddingBottom: 'unset',
                  width: renderWidthGrid + (isDesktop ? 19 : 0),
                }}
              >
                {titleBlock}
                <VariableSizeGrid
                  itemKey={itemKey}
                  columnCount={maxItemsPerRow}
                  columnWidth={columnWidth}
                  height={renderHeightOfGrid}
                  ref={(gridRef1) => {
                    gridRef.current = gridRef1;
                    return ref(gridRef1);
                  }}
                  style={style}
                  innerElementType={innerElementType}
                  rowCount={renderRowCount}
                  onItemsRendered={newItemsRendered(onItemsRendered)}
                  rowHeight={getRowHeight}
                  width={renderWidthGrid + (isDesktop ? 19 : 0)}
                  itemData={itemData}
                  className={classes.container2}
                >
                  {Cell}
                </VariableSizeGrid>
              </div>
            )}
          </>
        );
      }}
    </InfiniteLoader>
  );
};

export default memo(Results1001);

interface IStyle {
  isDeadzone: boolean;
  renderWidthGrid: number;
  isDeadzoneZZ?: boolean;
  isDesktop: boolean;
  isScrolling: boolean;
}

const useStyles = makeStyles((theme) => ({
  container2: {
    transition: '0.3s',
    overflowY: 'auto !important' as any,
    overflowX: 'hidden !important' as any,
    marginLeft: 16,
    marginTop: 23.5,
    '&::-webkit-scrollbar-track': {
      borderColor: ({ isDeadzoneZZ }: IStyle) =>
        isDeadzoneZZ ? '#DDE542' : '#FFF',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 16,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      paddingBottom: ({ isDeadzone }: IStyle) => (isDeadzone ? 94 : 0),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 0,
      display: 'block !important',
    },
  },
  container: {
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#100113',
      border: ({ isDeadzoneZZ }: IStyle) =>
        isDeadzoneZZ ? '3px solid #DDE542' : '3px solid white',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: -22,
    },
    [theme.breakpoints.down('md')]: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  titleBlockWrapper: {
    marginLeft: 16,
    height: 56.5,
    display: ({ isScrolling }: IStyle) => (isScrolling ? 'none' : 'block'),
    backgroundColor: ({ isDeadzone }: IStyle) => {
      if (isDeadzone) {
        return '#DDE542';
      } else {
        return 'unset';
      }
    },
    [theme.breakpoints.down('md')]: {
      height: 75.5,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: 16,
      height: 87,
    },
  },
  blockTitle: {
    color: '#C6C2C6',
    fontSize: 42,
    fontWeight: 700,
    lineHeight: '58.8px',
    height: 60,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      bottom: ({ isDesktop }: IStyle) => (isDesktop ? 7 : -5),
    },
  },
  blockSubTitle: {
    fontSize: 16,
    color: '#100113',
    fontWeight: 400,
    lineHeight: '22.4px',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      bottom: ({ isDesktop }: IStyle) => (isDesktop ? 10 : 5),
    },
  },
  placeholder: {
    marginTop: 16,
  },
  titleBlockWrapperCategory: {
    height: 96,
    marginLeft: 16,
    background: 'unset',
    display: ({ isScrolling }: IStyle) => (isScrolling ? 'none' : 'flex'),
    [theme.breakpoints.down('md')]: {
      height: 'unset',
      marginBottom: 16,
      display: 'flex',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'unset',
      marginLeft: 'unset',
      marginBottom: 16,
    },
  },
  secondContainer: {
    [theme.breakpoints.down('md')]: {
      paddingTop: 16,
    },
  },
  categoryTitle: {
    flexDirection: 'column',
  },
  blockName: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 1.4,
    color: '#C6C2C6',
    paddingRight: 8,
  },
  categoryName: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: 42,
    lineHeight: 1.4,
    color: '#6F6BC5',
  },
  categoryDescriptionContainer: {
    marginTop: 'auto',
  },
  categoryDescription: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 1.4,
    color: '#706771',
  },
  buttonContainer: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15.5,
  },
  seeAllButton: {
    width: 155,
    height: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#6F6BC5',
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    border: 'none',
    marginRight: 16,
    cursor: 'pointer',
  },
  clearButton: {
    width: 87,
    height: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px 8px 10px',
    border: 'none',
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1,
    textTransform: 'uppercase',
    color: '#6F6BC5',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    margingRight: 32,
    '& svg': {
      marginRight: 10,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 16,
    },
  },
}));
