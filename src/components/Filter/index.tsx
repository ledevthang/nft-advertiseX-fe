import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { EChain, EPriceFilter } from 'enums/filter';
import ArrowBackIcon from 'icons/ArrowBackIcon';
import ArrowDownward from 'icons/ArrowDownward';
import BadgeDot from 'icons/BadgeDot';
import ChangeHistory from 'icons/ChangeHistory';
import FilterIcon from 'icons/FilterIcon';
import FormatListBulleted from 'icons/FormatListBulleted';
import Grid3x3 from 'icons/Grid3x3';
import Grid4x4 from 'icons/Grid4x4';
import { shallowEqual, useSelector } from 'react-redux';
import {
  getCategories,
  getCollections,
  getFilterState,
  scrollState,
} from 'store/selectors';
import ChainFilter from './ChainFilter';
import CollectionFilter from './CollectionFilter';
import FilterDetail from './FilterDetail';
import PriceFilter from './PriceFilter';
import GridView from 'icons/GridView';
import CategoriesFilter from './CategoriesFilter';
import EthIconNew from 'icons/EthIconNew';
interface IFilter {
  isGrid4x4: boolean;
  isExpand: boolean;
  isMobile?: boolean;
  setIsGrid4x4?: (value: boolean) => void;
  setIsExpand?: (value: boolean) => void;
  onFilterNFT?: () => void;
  isDeadzoneZZ?: boolean;
  isDesktop?: boolean;
}

interface IStyle {
  isExpand: boolean;
  isDeadzone?: boolean;
  isDesktop?: boolean;
  isScrolling: boolean;
  isDeadzoneZZ?: boolean;
}

function Filter({
  isGrid4x4,
  setIsGrid4x4,
  isExpand,
  setIsExpand,
  isMobile,
  onFilterNFT,
  isDeadzoneZZ,
  isDesktop,
}: IFilter) {
  const filter = useSelector(getFilterState, shallowEqual);
  const isScrolling = useSelector(scrollState);
  const isDeadzone = useMemo(() => {
    return isDeadzoneZZ && filter.blockNumber === 13;
  }, [isDeadzoneZZ, filter.blockNumber]);

  const classes = useStyles({
    isExpand,
    isDeadzone,
    isDesktop,
    isScrolling,
    isDeadzoneZZ,
  });

  const hasAtLeastActiveFilter = useMemo(() => {
    const isFilterByChain = filter.chains.length > 0;
    const isFilterByCollection = filter.collectionIds.length > 0;
    const isFilterByPrice = filter.price.length > 0;
    const isFilterByCategory =
      filter.categories.length > 0 && !filter.categories.includes('NFT');

    return (
      isFilterByChain ||
      isFilterByCollection ||
      isFilterByPrice ||
      isFilterByCategory
    );
  }, [filter]);

  const collections = useSelector(getCollections);
  const categories = useSelector(getCategories);
  const [dropdown, setDropdown] = useState('');

  const renderCategories = useMemo(() => {
    const categoryList = categories.sort(
      (a, b) => b.totalItem.value - a.totalItem.value,
    );
    return categoryList;
  }, [categories]);

  useEffect(() => {
    if (isDeadzone) {
      setIsExpand && setIsExpand(false);
    }
  }, [isDeadzone, setIsExpand, setIsGrid4x4]);

  const onExpandFilter = useCallback(() => {
    if (isDeadzoneZZ || !setIsExpand) return;
    setIsExpand(!isExpand);
    setDropdown('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeadzoneZZ, isExpand]);

  return (
    <Box className={classes.main}>
      <Box className={classes.grid}>
        <IconButton
          className={clsx(
            isGrid4x4
              ? classes.layout4x4Selected
              : classes.layout4x4NotSelected,
            { [classes.DZbackground]: isDeadzoneZZ && !isGrid4x4 },
          )}
          onClick={() => setIsGrid4x4 && setIsGrid4x4(true)}
        >
          <Grid4x4
            color={
              !isGrid4x4 ? '#100113' : isDeadzoneZZ ? '#DDE542' : '#FFFFFF'
            }
          />
        </IconButton>
        <IconButton
          className={clsx(
            !isGrid4x4
              ? classes.layout4x4Selected
              : classes.layout4x4NotSelected,
            { [classes.DZbackground]: isDeadzoneZZ && isGrid4x4 },
          )}
          onClick={() => setIsGrid4x4 && setIsGrid4x4(false)}
        >
          <Grid3x3
            color={isGrid4x4 ? '#100113' : isDeadzoneZZ ? '#DDE542' : '#FFFFFF'}
          />
        </IconButton>
      </Box>
      <Box className={classes.wrapper}>
        <Box className={classes.filter} onClick={onExpandFilter}>
          <Box display="flex">
            <FilterIcon width={24} height={24} color="#FFFFFF" />
            {!isExpand && hasAtLeastActiveFilter && (
              <BadgeDot color="#6F6BC5" />
            )}
            {isExpand && <Typography>Filter</Typography>}
          </Box>
          {isExpand &&
            (isMobile ? (
              <Button
                style={{
                  padding: 0,
                  minWidth: 0,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
                onClick={onFilterNFT}
              >
                Done
              </Button>
            ) : (
              <ArrowBackIcon />
            ))}
        </Box>
        <FilterDetail
          dropdownComponents={renderCategories.map((d, i) => (
            <CategoriesFilter key={d.name} value={d} />
          ))}
          type="categories"
          StartAdornment={GridView}
          isExpand={isExpand}
          setIsExpand={setIsExpand}
          isDeadzone={isDeadzoneZZ}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
        <FilterDetail
          dropdownComponents={Object.values(EPriceFilter).map((d) => (
            <PriceFilter key={d} value={d} />
          ))}
          type="price"
          StartAdornment={ArrowDownward}
          isExpand={isExpand}
          isDeadzone={isDeadzoneZZ}
          setIsExpand={setIsExpand}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
        <FilterDetail
          dropdownComponents={collections.map((d, i) => (
            <CollectionFilter key={d.id} value={{ ...d, index: i }} />
          ))}
          type="collectionIds"
          StartAdornment={FormatListBulleted}
          isExpand={isExpand}
          setIsExpand={setIsExpand}
          isDeadzone={isDeadzoneZZ}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
        <FilterDetail
          dropdownComponents={Object.values(EChain)
            .filter((chain) => chain !== EChain.POLYGON)
            .map((d) => (
              <ChainFilter
                key={d}
                value={d}
                Icon={mapIconToChain[d]}
                chain={d}
              />
            ))}
          type="chains"
          StartAdornment={ChangeHistory}
          isExpand={isExpand}
          setIsExpand={setIsExpand}
          isDeadzone={isDeadzoneZZ}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
      </Box>
    </Box>
  );
}

export default Filter;

const mapIconToChain: any = {
  ethereum: <EthIconNew width={16} height={16} />,
};

const useStyles = makeStyles((theme) => ({
  main: {
    height: ({ isScrolling }: any) =>
      isScrolling ? 'calc(100vh - 120px)' : 'calc(100vh - 160px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      height: 'calc(100vh - 300px) !important',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      overflow: 'auto',
      height: '380px !important',
      paddingTop: 0,
      marginTop: 0,
    },
  },
  wrapper: {
    opacity: ({ isDeadzoneZZ }: IStyle) => (isDeadzoneZZ ? 0.2 : 1),
  },
  grid: {
    marginTop: 54,
    marginBottom: 40,
    [theme.breakpoints.down('md')]: {
      display: 'none',
      marginTop: 0,
    },
    '& button': {
      height: 30,
      width: 30,
      borderRadius: 0,
      '& svg': {
        width: 16,
        height: 16,
      },
    },
  },
  filter: {
    cursor: 'pointer',
    width: ({ isExpand }: IStyle) => (isExpand ? 332 : 60),
    minWidth: 60,
    boxSizing: 'border-box',
    height: 60,
    disable: ({ isDeadzone }: IStyle) => (isDeadzone ? 'true' : 'false'),
    padding: '0px 17px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    transition: 'all .2s linear',
    justifyContent: 'space-between',
    backgroundColor: '#100113',
    '& *': {
      color: ({ isDeadzoneZZ }: IStyle) =>
        isDeadzoneZZ ? '#DDE542' : '#FFFFFF',
    },
    '& p': {
      textTransform: 'none',
      marginLeft: 20,
      fontWeight: 600,
    },
    '& svg:nth-child(2)': {
      marginLeft: -3,
      marginTop: -3,
    },
    [theme.breakpoints.down('md')]: {
      width: ({ isExpand }: IStyle) => (isExpand ? 251 : 60),
    },
    [theme.breakpoints.down('sm')]: {
      width: 'inherit !important',
      '& *': {
        color: '#6F6BC5',
      },
    },
  },
  layout4x4Selected: {
    backgroundColor: '#100113',
    border: 'none',
  },
  layout4x4NotSelected: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #100113',
  },
  DZbackground: {
    backgroundColor: '#DDE542',
    border: '1px solid #100113',
  },
  chainFilter: {
    [theme.breakpoints.down('sm')]: {
      '&>svg': {
        stroke: 'white',
        '& path': {
          fill: 'white',
        },
      },
    },
  },
}));
