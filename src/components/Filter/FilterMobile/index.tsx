import { MutableRefObject, useCallback, useMemo, useState } from 'react';
import { Box, Button, Paper, Slide } from '@material-ui/core';
import ArrowDownward from 'icons/ArrowDownward';
import FilterIcon from 'icons/FilterIcon';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterAction } from 'store/actions/filterActions';
import { getFilterState } from 'store/selectors';
import Filter from '..';
import clsx from 'clsx';
import BadgeDot from 'icons/BadgeDot';
import CloseIcon from 'icons/CloseIcon';
import { useStyles } from './styles';
import { useHistory, useLocation } from 'react-router-dom';
// import { NFTGetAllRequest } from 'types/nft';
// import { getNFTsAction } from 'store/actions/nftActions';
// import { updateAppStateAction } from 'store/actions/appActions';
// import { mapLabelToValue } from 'enums/filter';

interface IFilterMobile {
  isDeadzone?: boolean;
  infiniteLoaderRef: MutableRefObject<any>;
}

function FilterMobile({ isDeadzone, infiniteLoaderRef }: IFilterMobile) {
  const [showed, setShowed] = useState(false);
  const filter = useSelector(getFilterState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const categoryName = location.pathname.replace('/', '').toUpperCase();

  const onScrollToTop = useCallback(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const hasAtLeastActiveFilter = useMemo(() => {
    const isFilterByCategory = categoryName !== 'NFT';
    return (
      filter.chains.length ||
      filter.collectionIds.length ||
      filter.price.length ||
      isFilterByCategory
    );
  }, [categoryName, filter]);

  const onResetFilter = useCallback(() => {
    dispatch(
      updateFilterAction({
        categories: [],
        chains: [],
        collectionIds: [],
        price: [],
        blockNumber: undefined,
        blockCategory: undefined,
      }),
    );
    history.push('/nft');
  }, [dispatch, history]);

  // const loadPage = useCallback(() => {
  //   dispatch(
  //     updateAppStateAction({
  //       isLoaded: true,
  //     }),
  //   );
  // }, [dispatch]);

  const onFilterNFT = () => {
    if (infiniteLoaderRef.current) {
      infiniteLoaderRef.current.resetloadMoreItemsCache();
    }
    setShowed(false);
    /* Comment the below code because I changed behavior, when select item, call API instantly */

    // dispatch(
    //   updateAppStateAction({
    //     isLoaded: false,
    //   }),
    // );
    // onScrollToTop();
    // const params: NFTGetAllRequest = {
    //   pageNumber: 1,
    //   pageSize: 20,
    //   filterBy: mapLabelToValue[filter.price[0]],
    //   chains: filter.chains.map((c) => c.toLowerCase()),
    //   collectionIds: filter.collectionIds,
    //   blockNumber: filter.blockNumber,
    // };

    // // when filter by category
    // if (filter.blockNumber !== 13 && filter.categories.length > 0) {
    //   params.categories = filter.categories[0];
    // }

    // dispatch(getNFTsAction(params, loadPage));
  };

  return (
    <Box className={classes.filter}>
      <Button className="center-root" onClick={onScrollToTop}>
        <ArrowDownward color="#6F6BC5" />
      </Button>
      <Button
        onClick={() => !isDeadzone && setShowed(true)}
        className={clsx(classes.filterButton, 'center-root', {
          [classes.hiden]: isDeadzone,
        })}
      >
        <FilterIcon />
        {hasAtLeastActiveFilter ? <BadgeDot color="#FFFFFF" /> : ''}
      </Button>
      <Slide direction="up" in={showed} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <Filter isGrid4x4 isExpand isMobile onFilterNFT={onFilterNFT} />
          <Box className={classes.wrapperBtn}>
            <Button className={classes.clearButton} onClick={onResetFilter}>
              <CloseIcon width={16} height={16} />
              <span className={classes.clearButtonLabel}>CLEAR ALL</span>
            </Button>
            <Button className={classes.applyButton} onClick={onFilterNFT}>
              APPLY FILTERS
            </Button>
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
}

export default FilterMobile;
