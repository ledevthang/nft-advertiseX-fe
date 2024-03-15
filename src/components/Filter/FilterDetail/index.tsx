import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FilledInput,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { INPUT_DEBOUNCE_DURATION } from 'common/constant';
import { useDebounceCallBack } from 'hooks/useDebounceCallback';
import ArrowDropdown from 'icons/ArrowDropdown';
import BadgeDot from 'icons/BadgeDot';
import CloseIcon from 'icons/CloseIcon';
import SearchIcon from 'icons/SearchIcon';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { resetBlockCategoriesAction } from 'store/actions/blockCategoriesAction';
import { getCollectionsAction } from 'store/actions/collectionActions';
import {
  getCategories,
  getCollections,
  getFilterState,
  getPaginationCategories,
  getPaginationCollections,
} from 'store/selectors';
import { CollectionData } from 'types/collections';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';
import { updateFilterAction } from 'store/actions/filterActions';
// import { CircularProgress } from '@material-ui/core';

interface IData {
  isExpand: boolean;
  dropdownComponents: any[];
  type: 'price' | 'collectionIds' | 'chains' | 'categories';
  StartAdornment?: any;
  setIsExpand?: (value: boolean) => void;
  isDeadzone?: boolean;
  dropdown: string;
  setDropdown: (value: string) => void;
}

var collectionCache: CollectionData[] = [];

function FilterDetail({
  dropdownComponents,
  StartAdornment,
  isExpand,
  type,
  isDeadzone,
  setIsExpand,
  dropdown,
  setDropdown,
}: IData) {
  const [collectionFilter, setCollectionFilter] = useState<string>('');
  const filter = useSelector(getFilterState);
  const collections = useSelector(getCollections);
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();
  const collectionPagination = useSelector(getPaginationCollections);
  const categoriesPagination = useSelector(getPaginationCategories);
  const hasMore =
    collectionPagination.pageNumber * collectionPagination.pageSize <
    collectionPagination.total;
  const hasMoreCategories =
    categoriesPagination.pageNumber * categoriesPagination.pageSize <
    categoriesPagination.total;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const isCategoryType = useMemo(() => {
    return type === 'categories';
  }, [type]);

  const classes = useStyles({
    isExpand,
    isDropdown: dropdown === type,
    isDeadzone,
    isCategoriesHasItem:
      isCategoryType &&
      filter.categories.length > 0 &&
      !filter.categories.includes('NFT'),
    type,
    isCategoryType,
  });

  const onRemove = (value: any) => {
    if (type === 'categories') {
      dispatch(
        updateFilterAction({
          categories: ['NFT'],
        }),
      );
      dispatch(resetBlockCategoriesAction());
      history.push('/nft');
    } else {
      const filterChanged = [...filter[type]];
      const index = filterChanged.indexOf(value);
      if (index < 0) return;
      filterChanged.splice(index, 1);
      dispatch(
        updateFilterAction({
          [type]: filterChanged,
          blockNumber: undefined,
          blockCategory: undefined,
        }),
      );
    }
  };

  const getCollectionName = useCallback(
    (id: number) => {
      const collectionCurrent =
        collections.length < collectionCache.length
          ? collectionCache
          : collections;
      const collection = collectionCurrent.find((c) => c.id === id);
      if (!collection) return;
      return collection.name;
    },
    [collections],
  );

  const getRenderLabel = useCallback(
    (type: string, item: any) => {
      if (type === 'collectionIds') {
        return getCollectionName(item);
      }

      if (type === 'categories') {
        return `/${item}`;
      }

      return item;
    },
    [getCollectionName],
  );

  const renderTextByFilterType = useMemo(() => {
    switch (type) {
      case 'price':
        return 'Sort squares';
      case 'collectionIds':
        return 'All collections';
      case 'categories':
        return 'All categories';
      case 'chains':
        return 'All chains';
    }
  }, [type]);

  const debouncedOnGetCollectionByName = useDebounceCallBack(
    (v: string) => {
      dispatch(
        getCollectionsAction({
          pageNumber: 1,
          pageSize: 5,
          name: v,
        }),
      );
    },
    INPUT_DEBOUNCE_DURATION,
    [dispatch, collectionFilter],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce(debouncedOnGetCollectionByName, INPUT_DEBOUNCE_DURATION),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionFilter(event.target.value);
    debounceFn(event.target.value);
  };

  const loadMoreCollections = () => {
    // if (type === 'collectionIds') {
    //   dispatch(
    //     getCollectionsAction({
    //       pageNumber: collectionPagination.pageNumber + 1,
    //       pageSize: collectionPagination.pageSize,
    //       name: collectionFilter,
    //     }),
    //   );
    // }
    // if (type === 'categories') {
    //   dispatch(
    //     getCategoriesAction({
    //       pageNumber: categoriesPagination.pageNumber + 1,
    //       pageSize: categoriesPagination.pageSize,
    //       includeIcon: true,
    //       sortBy: 'VolumeAll',
    //       sortType: SortEnum.Desc,
    //     }),
    //   );
    // }
  };

  const openFilter = useCallback(() => {
    if (!isDeadzone && !isExpand && setIsExpand) {
      setIsExpand(!isExpand);
      setDropdown(type);
    }
  }, [isExpand, type, isDeadzone, setIsExpand, setDropdown]);

  const getColorStartAdornment = useCallback(() => {
    if (isCategoryType) {
      return !isExpand &&
        filter[type].length > 0 &&
        !filter.categories.includes('NFT')
        ? '#111'
        : '#6F6BC5';
    }

    return '#111';
  }, [type, filter, isExpand, isCategoryType]);

  useEffect(() => {
    if (collectionCache.length < collections.length) {
      collectionCache = collections;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections.length, collectionCache.length]);

  // const loader = useMemo(() => {
  //   return (
  //     <div className={classes.loader}>
  //       <CircularProgress color="secondary" size={16} />
  //     </div>
  //   );
  // }, [classes.loader]);

  const renderColorDivider = useMemo(() => {
    if (isMobile) {
      return isCategoryType
        ? 'rgba(111, 107, 197, 0.32)'
        : 'rgba(28, 2, 34, 0.6)';
    } else {
      return 'unset';
    }
  }, [isCategoryType, isMobile]);

  const closeIconColor = useMemo(() => {
    if (isMobile && !isCategoryType) {
      return '#100113';
    }

    return '#FFFFFF';
  }, [isMobile, isCategoryType]);

  const hasAtLeastActiveFilter = useMemo(() => {
    return filter[type].length > 0;
  }, [filter, type]);

  const renderActiveFilter = useMemo(() => {
    if (type === 'categories') {
      if (filter.categories.includes('NFT')) return [];
    }
    return filter[type];
  }, [filter, type]);

  return (
    <Box className={classes.main} onClick={() => openFilter()}>
      <Box
        className={clsx(classes.header, {
          [classes.categoryHeader]: isCategoryType,
        })}
      >
        <StartAdornment color={getColorStartAdornment()} />
        {!isExpand && hasAtLeastActiveFilter && (
          <BadgeDot color={isCategoryType ? '#FFF' : '#6F6BC5'} />
        )}
        {isExpand && (
          <Box className={classes.listSelectItems}>
            {renderActiveFilter?.length > 0 ? (
              renderActiveFilter.map((item, index) => (
                <Box
                  key={index}
                  className={clsx(classes.selectData, {
                    [classes.chainText]: type === 'chains',
                  })}
                >
                  <Typography>{getRenderLabel(type, item)}</Typography>
                  <IconButton onClick={() => !isDeadzone && onRemove(item)}>
                    <CloseIcon color={closeIconColor} width={16} height={16} />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography
                className={clsx(classes.selectAll, {
                  [classes.selectAllCategories]: isCategoryType,
                })}
              >
                {renderTextByFilterType}
              </Typography>
            )}
          </Box>
        )}
        {isExpand && (
          <Box display="flex" justifyContent="center">
            <Divider
              orientation="vertical"
              flexItem
              style={{
                height: 24,
                marginTop: 18,
                backgroundColor: renderColorDivider,
              }}
            />
            <Button
              className={classes.btnDrop}
              onClick={() =>
                !isDeadzone && setDropdown(dropdown === type ? '' : type)
              }
            >
              <ArrowDropdown />
            </Button>
          </Box>
        )}
      </Box>
      {type === 'collectionIds' && isExpand && dropdown === type && (
        <FilledInput
          value={collectionFilter}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="filled-weight-helper-text"
          className={classes.search}
          placeholder="Search collection"
          disableUnderline
        />
      )}
      {dropdown === type &&
        isExpand &&
        (type !== 'collectionIds' && type !== 'categories' ? (
          <Box>{dropdownComponents.map((d) => d)}</Box>
        ) : (
          <InfiniteScroll
            dataLength={
              type === 'collectionIds' ? collections.length : categories.length
            }
            next={loadMoreCollections}
            hasMore={type === 'collectionIds' ? hasMore : hasMoreCategories}
            className={classes.wrapperDetail}
            loader={null}
            height="fit-content"
          >
            {dropdownComponents.map((d) => d)}
          </InfiniteScroll>
        ))}
    </Box>
  );
}

export default FilterDetail;
