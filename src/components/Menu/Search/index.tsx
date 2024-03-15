import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Avatar, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchAllCategories,
  getSearchState,
  scrollState,
} from 'store/selectors';
import clsx from 'clsx';
import CloseIcon from 'icons/CloseIcon';
import {
  resetSearchAction,
  searchCategoriesAction,
} from 'store/actions/searchActions';
import { DataSearchCategories, ResCategoriesCollections } from 'types/search';
import secureStorage from 'utils/secureStorage';
import { SecureStorageEnum } from 'enums/auth';
import { useHistory } from 'react-router-dom';
import { CategorySortOptions, TypeSearch } from 'enums/categories';
import { updateFilterAction } from 'store/actions/filterActions';
import {
  getBlockCategoriesAction,
  resetBlockCategoriesAction,
} from 'store/actions/blockCategoriesAction';
import { debounce } from 'lodash';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { numberWithCommas } from 'utils/formatNumber';
import { EChain } from 'enums/filter';
import { convertWeiToEth } from 'common/helper';
import { getAllSearchCategoriesAction } from 'store/actions/categoriesActions';
import { SortEnum } from 'enums/sortEnum';

export interface SearchProps {
  offSearchModal?: () => void;
  offActive?: () => void;
}

export default function Search(props: SearchProps) {
  const { offSearchModal, offActive } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isScrolling = useSelector(scrollState);
  const [recent, setRecent] = useState<boolean>(true);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [historySearch, setHistorySearch] = useState<DataSearchCategories>({
    categories: [],
    collections: [],
  });
  const dataSearch = useSelector(getSearchState);
  const allCategories = useSelector(getSearchAllCategories);
  const history = useHistory();
  const [valueInput, setValueInput] = useState<string>('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState<boolean>(false);

  const setLocal = useCallback(() => {
    secureStorage.setItem(
      SecureStorageEnum.ARRAY_HISTORY_SEARCH,
      JSON.stringify(historySearch),
    );
  }, [historySearch]);

  const getDataSearch = useCallback(
    (value: string) => {
      dispatch(searchCategoriesAction(value));
      setRecent(false);
    },
    [dispatch],
  );

  // dispatch action get NFT by category or collection
  const onSelect = useCallback(
    (value: ResCategoriesCollections, type: TypeSearch) => {
      if (
        type === TypeSearch.CATEGORIES ||
        type === TypeSearch.TOP_CATEGORIES
      ) {
        dispatch(
          updateFilterAction({
            categories: [value.name],
          }),
        );
        dispatch(resetBlockCategoriesAction());
        if (value.name !== 'NFT') {
          dispatch(getBlockCategoriesAction({ category: value.name }));
        }
        history.push(`/${value.name.toLowerCase()}`);
      } else {
        dispatch(resetBlockCategoriesAction());
        dispatch(getBlockCategoriesAction({}));
        dispatch(
          updateFilterAction({
            collectionIds: [value.id],
          }),
        );
      }
    },
    [dispatch, history],
  );

  // save history search to session storage and navigate to NFT page
  const handleNavigate = useCallback(
    async (value: ResCategoriesCollections, type: TypeSearch) => {
      if (
        type === TypeSearch.CATEGORIES ||
        type === TypeSearch.TOP_CATEGORIES
      ) {
        const index = historySearch.categories.findIndex(
          (obj) => obj.name === value.name,
        );
        if (index !== -1) {
          historySearch.categories.splice(index, 1);
          historySearch.categories.push(value);
        } else {
          historySearch.categories.push(value);
        }
        history.push({
          pathname: `/${value.name.toLowerCase()}`,
          state: { category: value.name },
        });
      } else if (type === TypeSearch.COLLECTION) {
        const index = historySearch.collections.findIndex(
          (obj) => obj.name === value.name,
        );
        if (index !== -1) {
          historySearch.collections.splice(index, 1);
          historySearch.collections.push(value);
        } else {
          historySearch.collections.push(value);
        }
        history.push('/nft');
      }
      setLocal();
      setActiveSearch(false);
      setValueInput('');
      setRecent(false);
      setOpen(false);
      dispatch(resetSearchAction());
      offSearchModal && offSearchModal();
    },
    [historySearch, setLocal, dispatch, history, offSearchModal],
  );

  const handleSearchNavigate = useCallback(
    async (value: ResCategoriesCollections, type: TypeSearch) => {
      onSelect(value, type);
      await handleNavigate(value, type);
    },
    [handleNavigate, onSelect],
  );

  const handleActiveSearch = useCallback(() => {
    setOpen(true);
    if (!valueInput) {
      setRecent(true);
    }
    const history = localStorage.getItem(
      SecureStorageEnum.ARRAY_HISTORY_SEARCH,
    );
    if (history) {
      setHistorySearch(JSON.parse(history));
    }
    setActiveSearch(true);
  }, [valueInput]);

  const handleRemoveHistory = useCallback(
    (value: ResCategoriesCollections, type: TypeSearch) => {
      if (type === TypeSearch.CATEGORIES) {
        const index = historySearch.categories.findIndex(
          (obj) => obj.name === value.name,
        );
        if (index !== -1) {
          historySearch.categories.splice(index, 1);
        }
        setLocal();
        handleActiveSearch();
      } else if (type === TypeSearch.COLLECTION) {
        const index = historySearch.collections.findIndex(
          (obj) => obj.name === value.name,
        );
        if (index !== -1) {
          historySearch.collections.splice(index, 1);
        }
        setLocal();
        handleActiveSearch();
      }
    },
    [historySearch, setLocal, handleActiveSearch],
  );

  const resetValueInput = useCallback(() => {
    setValueInput('');
  }, []);

  const handleGetAllCategories = useCallback(() => {
    dispatch(
      getAllSearchCategoriesAction({
        includeIcon: true,
        sortType: SortEnum.Desc,
        sortBy: CategorySortOptions.TOTAL_ITEMS,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    handleGetAllCategories();
  }, [handleGetAllCategories]);

  const endAdornment = useMemo(() => {
    return (
      <Grid className={classes.wrapTextNFT}>
        <span
          className={clsx(classes.textSearchNFT, {
            [classes.textSearchNFTScroll]: isScrolling || isMobile,
          })}
        >
          {valueInput && (
            <Grid onClick={resetValueInput} className={classes.iconClear}>
              <CloseIcon width={18} height={18} color="#9F99A1" />
            </Grid>
          )}
          <span
            className={clsx(classes.slash, {
              [classes.slashMobile]: isMobile,
            })}
          >
            /
          </span>
          NFT
        </span>
      </Grid>
    );
  }, [classes, isScrolling, isMobile, valueInput, resetValueInput]);

  const startAdornment = useMemo(() => {
    return (
      <Grid className={classes.wrapIconSearch}>
        <SearchIcon />
      </Grid>
    );
  }, [classes]);

  const getLowestPrice = useCallback((collection: ResCategoriesCollections) => {
    if (collection.chain === EChain.ETHEREUM) {
      return `${numberWithCommas(
        convertWeiToEth(collection.lowestPrice || 0),
      )} ETH`;
    }

    if (collection.chain === EChain.SOLANA) {
      return `${numberWithCommas(collection.lowestPrice || 0)} SOL`;
    }
  }, []);

  const renderItemSearch = useMemo(
    () =>
      (
        value: ResCategoriesCollections,
        type: TypeSearch,
        iconClose?: boolean,
      ) => {
        return (
          <>
            <Grid
              onClick={() => handleSearchNavigate(value, type)}
              className={clsx(classes.wrapItemList)}
            >
              <Grid className={classes.wrapImgItem}>
                <Avatar
                  src={
                    type === TypeSearch.CATEGORIES ||
                    type === TypeSearch.TOP_CATEGORIES
                      ? value?.icon
                      : value?.imgUrl
                  }
                  alt=""
                />
              </Grid>
              <Grid
                className={clsx(classes.valueSearch, {
                  [classes.categoryName]: type === TypeSearch.CATEGORIES,
                })}
              >
                {type === TypeSearch.CATEGORIES ||
                type === TypeSearch.TOP_CATEGORIES
                  ? `/${value?.name}`
                  : `${value?.name}`}
              </Grid>
              <Grid className={classes.countItemList}>{value?.totalItem}</Grid>
              {type === TypeSearch.COLLECTION && (
                <Grid
                  className={clsx(classes.wrapPrice, {
                    [classes.renderRecent]: recent,
                  })}
                >
                  {getLowestPrice(value)}
                </Grid>
              )}
              {(type === TypeSearch.TOP_CATEGORIES ||
                type === TypeSearch.CATEGORIES) && (
                <Grid
                  className={clsx(classes.wrapPrice, {
                    [classes.renderRecent]: recent,
                  })}
                >
                  ${value.firstPlace?.toFixed(2)}
                </Grid>
              )}
              {recent && (
                <Grid
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveHistory(value, type);
                  }}
                  className={clsx(classes.wrapIconClose, {
                    [classes.hiddenRemove]: type === TypeSearch.TOP_CATEGORIES,
                  })}
                >
                  <CloseIcon width={16} height={16} color="#9F99A1" />
                </Grid>
              )}
            </Grid>
          </>
        );
      },
    [
      recent,
      classes,
      handleRemoveHistory,
      handleSearchNavigate,
      getLowestPrice,
    ],
  );

  const allCategoriesConvert: ResCategoriesCollections[] = useMemo(
    () =>
      allCategories.data?.map((category) => ({
        name: category.name,
        icon: category.icon,
        imgUrl: category.imgUrl,
        totalItem: category.totalItem.value.toString(),
        chain: '',
        id: 0,
        lowestPrice: 0,
        firstPlace: category.firstPlace.value,
      })),
    [allCategories.data],
  );

  const renderHistoryCategory = useMemo(
    () => (group: string) => {
      return (
        <Grid className={classes.wrapListSearch}>
          {historySearch && (
            <>
              {historySearch.categories.length !== 0 && (
                <Grid>
                  <Grid className={classes.textGroup}>{group} categories</Grid>
                  {historySearch.categories.map((item) => {
                    return renderItemSearch(item, TypeSearch.CATEGORIES);
                  })}
                </Grid>
              )}
              {historySearch.collections.length !== 0 && (
                <Grid>
                  <Grid className={classes.textGroup}>{group} collections</Grid>
                  {historySearch.collections.map((item) => {
                    return renderItemSearch(item, TypeSearch.COLLECTION);
                  })}
                </Grid>
              )}
            </>
          )}
          <Grid>
            <Grid className={classes.textGroup}>Top categories</Grid>
            {allCategoriesConvert.map((item) => {
              return renderItemSearch(item, TypeSearch.TOP_CATEGORIES);
            })}
          </Grid>
        </Grid>
      );
    },
    [classes, historySearch, renderItemSearch, allCategoriesConvert],
  );

  const checkItem = useMemo(
    () => (value: ResCategoriesCollections, type: TypeSearch) => {
      if (type === TypeSearch.CATEGORIES) {
        const index = historySearch.categories.findIndex(
          (obj) => obj.name === value.name,
        );
        if (index !== -1) {
          return true;
        } else return false;
      }
      if (type === TypeSearch.COLLECTION) {
        const index = historySearch.collections.findIndex(
          (obj) => obj.name === value.name,
        );
        if (index !== -1) {
          return true;
        } else return false;
      }
    },
    [historySearch],
  );

  const renderSearch = useMemo(
    () => (group: string) => {
      return (
        <Grid className={classes.wrapListSearch}>
          {dataSearch.categories.length !== 0 && (
            <Grid>
              <Grid className={classes.textGroup}>{group}</Grid>
              {dataSearch.categories.map((item) => {
                return renderItemSearch(
                  item,
                  TypeSearch.CATEGORIES,
                  checkItem(item, TypeSearch.CATEGORIES),
                );
              })}
            </Grid>
          )}

          {dataSearch.collections.length !== 0 && (
            <Grid>
              <Grid className={classes.textGroup}>Collections</Grid>
              {dataSearch.collections.map((item) => {
                return renderItemSearch(
                  item,
                  TypeSearch.COLLECTION,
                  checkItem(item, TypeSearch.COLLECTION),
                );
              })}
            </Grid>
          )}
        </Grid>
      );
    },
    [classes, dataSearch, renderItemSearch, checkItem],
  );

  const renderArrayOption = useMemo(() => {
    if (recent) {
      if (
        historySearch?.categories.length !== 0 ||
        historySearch?.collections.length !== 0
      ) {
        return [...historySearch?.categories, ...historySearch?.collections];
      } else {
        return allCategoriesConvert;
      }
    } else {
      if (dataSearch.categories.length !== 0) {
        return dataSearch.categories;
      } else {
        return dataSearch.collections;
      }
    }
  }, [recent, historySearch, dataSearch, allCategoriesConvert]);

  const onBlurAuto = useCallback(() => {
    setActiveSearch(false);
    setOpen(false);
    offActive && offActive();
  }, [setActiveSearch, offActive]);

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.value) {
        getDataSearch(e.target.value);
      } else {
        setRecent(true);
      }
    }, 500),
    [getDataSearch],
  );

  const endAdornmentActive = useMemo(() => {
    if (activeSearch) {
      if (valueInput) {
        return (
          <Grid onClick={resetValueInput} className={classes.iconClear}>
            <CloseIcon width={18} height={18} color="#9F99A1" />
          </Grid>
        );
      } else {
        return '';
      }
    } else {
      return endAdornment;
    }
  }, [activeSearch, valueInput, endAdornment, classes, resetValueInput]);

  return (
    <ClickAwayListener onClickAway={onBlurAuto}>
      <Grid
        className={clsx({
          [classes.wrapSearch]: isDesktop && !isScrolling && !activeSearch,
          [classes.wrapSearchScroll]: isDesktop && isScrolling && !activeSearch,
          [classes.wrapSearchActive]: isDesktop && !isScrolling && activeSearch,
          [classes.wrapSearchScrollActive]:
            isDesktop && isScrolling && activeSearch,
        })}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={
            renderArrayOption
              ? renderArrayOption?.map((option) => option.name)
              : []
          }
          groupBy={() => (recent ? 'Recent' : 'Categories')}
          renderGroup={(item) => {
            const { group } = item;
            // eslint-disable-next-line
            if (group === 'Recent') {
              return renderHistoryCategory(group);
            } else {
              return renderSearch(group);
            }
          }}
          disablePortal={true}
          classes={{
            popper: classes.listbox,
            popperDisablePortal: classes.listbox,
          }}
          className={classes.autocomplete}
          ListboxProps={{ style: { maxHeight: '60vh' } }}
          value={valueInput}
          open={open}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                placeholder="Search categories"
                margin="normal"
                variant="outlined"
                onClick={() => handleActiveSearch()}
                onChange={(e) => {
                  setValueInput(e.target.value);
                  debounceSearch(e);
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: endAdornmentActive,
                  startAdornment,
                }}
              />
            );
          }}
        />
      </Grid>
    </ClickAwayListener>
  );
}
