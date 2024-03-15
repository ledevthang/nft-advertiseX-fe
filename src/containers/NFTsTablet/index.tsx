/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { SCROLL_THRESHOLD } from 'common/constant';
import Back from 'components/Back';
import DetailNFT from 'components/Results1001/DetailNFT';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getNFTsActionScrollHorizontal,
  getNFTsHorizontalAtFirst,
} from 'store/actions/nftActions';
import { getNFTs } from 'store/selectors';
import RSC from 'react-scrollbars-custom';
import { Sponsor } from 'types/sponsor';
import SponsorService from 'services/sponsorAds';
import SponsorAds from 'components/Results1001/SponsorAds/SponsorAds';
import { NFT } from 'types/nft';
import { isEmpty } from 'lodash';
import { pair, unpair } from 'utils/cantorPairing';

declare global {
  interface Window {
    isLoadedMore: boolean;
    nftIds: number[];
    isSwiping?: boolean;
    highLight: number;
    positionIds: number[];
    heightNFT: number;
    nftsPerRow: number;
    deadzone?: boolean;
    blockNumber: number;
  }
}

export const NEXT = 'NEXT';
export const PREV = 'PREV';
interface IData {
  toggleDeadzone: (value: boolean) => void;
}

let timeout: any = null;

const NFTsDetailTablet = ({ toggleDeadzone }: IData) => {
  const nfts = useSelector(getNFTs, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialHightLight =
    JSON.parse(sessionStorage.getItem('nftHighlight') || '{}')?.id ||
    (history.location.state as any)?.nftHighlight ||
    0;
  const [scrollFirst, setScrollFirst] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [highLight, setHighLight] = useState(initialHightLight);
  const [renderLabel, setLabel] = useState('Block #');
  const [dataSponsor, setDataSponsor] = useState<Sponsor>();
  const selectedCategory =
    JSON.parse(sessionStorage.getItem('nftHighlight') || '{}')?.categories ||
    (history.location.state as any)?.categories ||
    'NFT';

  const loadMoreNFTs = useCallback(
    (value: boolean) => {
      dispatch(
        getNFTsActionScrollHorizontal(value, () => {
          window.isLoadedMore = false;
        }),
      );
    },
    [dispatch],
  );

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

  const nftData = useMemo(() => {
    if (!isEmpty(dataSponsor) && nfts.length > 0) {
      const endIndexList = Number(nfts[nfts.length - 1].position) - 1;
      const startIndexList = endIndexList - nfts.length + 1;
      const positionAdsCurrent = dataSponsor.positions
        .sort((a, b) => a - b)
        .filter(
          (position) => position > startIndexList && position <= endIndexList,
        );
      const positionAdsBefore = dataSponsor.positions
        .sort((a, b) => a - b)
        .filter((position) => position <= startIndexList);
      const nftListCurrent: (NFT | Sponsor)[] = [...nfts];

      for (let i = 0; i < positionAdsCurrent.length; i++) {
        const pos =
          positionAdsCurrent[i] - startIndexList - positionAdsBefore.length - 1;
        if (pos >= 0) {
          nftListCurrent.splice(pos, 0, dataSponsor);
        }
      }
      return nftListCurrent;
    }

    return nfts;
  }, [nfts, dataSponsor]);

  const isSponsor = (obj: any): obj is Sponsor => 'isAd' in obj;
  const isNFT = (obj: any): obj is NFT => 'blockNumber' in obj;

  const callback = useCallback(() => {
    const isTablet = 744 <= window.innerWidth && window.innerWidth < 1440;
    const scroll = document.getElementById(TABLET_SCROLL_ID);
    const width = isTablet ? WIDTH_NFT_TABLET : WIDTH_NFT_MOBILE;
    const margin = isTablet ? MARGIN_LEFT_TABLET : MARGIN_LEFT_MOBILE;
    const index = window.nftIds.findIndex((i) => i === window.highLight);
    const threshold = width + margin;
    scroll?.scrollTo({
      left: threshold * index,
      behavior: 'smooth',
    });
  }, []);

  const getDataBeforeUnload = useCallback(() => {
    let extraElement = 0;
    let idNFTBeforeUnload = highLight;
    let indexHighlight = nftData.findIndex((nft) => nft.id === highLight);

    if (indexHighlight === -1) {
      const [_, indexAds] = unpair(highLight);
      indexHighlight = indexAds - 1;
      idNFTBeforeUnload = nftData[indexHighlight].id;
    }
    if (!isEmpty(dataSponsor)) {
      const nftDataList = [...nftData];
      nftDataList.splice(indexHighlight);
      extraElement = nftDataList.reduce(
        (acc, cur) => (isSponsor(cur) ? acc + 1 : acc),
        0,
      );
    }
    const positionNft =
      Number(
        nfts[indexHighlight - extraElement].positionOnCategories?.filter(
          (posCat) => posCat.name === selectedCategory,
        )[0].position,
      ) - 1;
    return [positionNft, idNFTBeforeUnload];
  }, [highLight, nftData, dataSponsor]);

  const handleSaveSession = useCallback(
    (key: string) => {
      const [positionNft, idNFTBeforeUnload, obj] = getDataBeforeUnload();
      const nftHighlight = {
        index: positionNft,
        id: idNFTBeforeUnload,
        categories: selectedCategory,
      };
      sessionStorage.setItem(key, JSON.stringify(nftHighlight));
    },
    [getDataBeforeUnload],
  );

  const handleBeforeUnload = useCallback(
    () => handleSaveSession('nftHighlight'),
    [handleSaveSession],
  );

  const onScroll = useCallback(
    (e: any) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(callback, 200);
      const isTablet = 744 <= window.innerWidth && window.innerWidth < 1440;
      const scroll = document.getElementById(TABLET_SCROLL_ID);
      const scrollLeft = e.srcElement.scrollLeft || 0;
      const scrollWidth =
        (scroll?.scrollWidth || 0) - (scroll?.clientWidth || 0);
      const width = isTablet ? WIDTH_NFT_TABLET : WIDTH_NFT_MOBILE;
      const margin = isTablet ? MARGIN_LEFT_TABLET : MARGIN_LEFT_MOBILE;
      const threshold = width + margin;
      const value =
        Math.floor((scrollLeft - width / 2 - margin) / threshold) + 1;
      if (scrollLeft == 0 || value == 0) {
        setHighLight(window.nftIds[0]);
      } else {
        setHighLight(window.nftIds[value]);
      }
      if (scrollLeft < SCROLL_THRESHOLD && !window.isLoadedMore) {
        window.isLoadedMore = true;
        loadMoreNFTs(false);
      } else if (
        scrollWidth - scrollLeft < SCROLL_THRESHOLD &&
        !window.isLoadedMore
      ) {
        window.isLoadedMore = true;
        loadMoreNFTs(true);
      }
    },
    [dispatch, loadMoreNFTs],
  );

  useEffect(() => {
    const scroll = document.getElementById(TABLET_SCROLL_ID);
    scroll?.addEventListener('scroll', onScroll);
    if (!scroll) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY == 0) return;
      e.preventDefault();
      scroll.scrollTo({
        left: scroll.scrollLeft + e.deltaY,
        behavior: 'smooth',
      });
    };
    scroll.addEventListener('wheel', onWheel);

    return () => {
      toggleDeadzone(false);
      scroll.removeEventListener('scroll', onScroll);
      scroll.removeEventListener('wheel', onWheel);
    };
  }, []);

  useEffect(() => {
    if (!loaded || scrollFirst) return;

    const isTablet = 744 <= window.innerWidth && window.innerWidth < 1440;
    console.log('🚀 ~ file: index.tsx:233 ~ useEffect ~ isTablet:', isTablet);
    const scroll = document.getElementById(TABLET_SCROLL_ID);
    const index = nftData.findIndex((i) => i.id == initialHightLight);
    const threshold = isTablet
      ? WIDTH_NFT_TABLET + MARGIN_LEFT_TABLET
      : WIDTH_NFT_MOBILE + MARGIN_LEFT_MOBILE;
    if (scroll) {
      if (index > 0) {
        scroll.scrollTo(threshold * index, 0);
        setHighLight(nftData[index].id);
      } else {
        loadMoreNFTs(false);
        scroll.scrollTo(0, 0);
        setHighLight(nftData[0].id);
      }
      setScrollFirst(true);
    }
  }, [history.location.state, nftData, scrollFirst, loaded]);

  useEffect(() => {
    window.isLoadedMore = true;
    let locationState =
      JSON.parse(sessionStorage.getItem('nftHighlight') || '{}') ||
      (history.location.state as { index?: number });
    if (!locationState) locationState = { index: 0, categories: 'NFT' };
    const { index, categories } = locationState;
    dispatch(
      getNFTsHorizontalAtFirst(index || 0, categories, () => {
        window.isLoadedMore = false;
        setLoaded(true);
      }),
    );
  }, [history.location.state]);

  useEffect(() => {
    if (window.nftIds && window.nftIds[0] != nftData[0].id) {
      const scroll = document.getElementById(TABLET_SCROLL_ID);
      const isTablet = 744 <= window.innerWidth && window.innerWidth < 1440;
      const threshold = isTablet
        ? WIDTH_NFT_TABLET + MARGIN_LEFT_TABLET
        : WIDTH_NFT_MOBILE + MARGIN_LEFT_MOBILE;
      const index = nftData.findIndex((i) => i.id == highLight);
      scroll?.scrollTo(threshold * index, 0);
    }
    window.nftIds = nftData.map((n, index) => {
      if (isSponsor(n)) {
        return pair(n.id, index);
      }
      return n.id;
    });
  }, [nftData.length]);

  useEffect(() => {
    window.highLight = highLight;
    const index = nftData.findIndex((i) => i.id === highLight);
    let newLabel = '';
    const nft = nftData[index];
    if (nft) {
      if (isNFT(nft)) {
        if (nft.blockNumber === 13) {
          newLabel = 'DeadZone';
        } else newLabel = `Block #${nft.blockNumber || ''}`;
        if (newLabel != renderLabel) {
          setLabel(newLabel);
          if (newLabel == 'DeadZone') {
            toggleDeadzone(true);
          } else {
            toggleDeadzone(false);
          }
        }
      }
      if (isSponsor(nft)) {
        setLabel('Sponsored');
      }
    }
  }, [highLight, nftData]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const classes = useStyles({ isDeadzone: renderLabel == 'DeadZone' });

  return (
    <Box className={classes.container}>
      <Box className={classes.back}>
        <Back
          disableBtnLabel
          label={renderLabel}
          isDeadzone={renderLabel == 'DeadZone'}
        />
      </Box>
      <RSC
        noScrollY
        trackXProps={{
          renderer: (props) => {
            const { elementRef, ...restProps } = props;
            return (
              <div {...restProps} ref={elementRef} className={classes.trackX} />
            );
          },
        }}
        thumbXProps={{
          renderer: (props) => {
            const { elementRef, ...restProps } = props;
            return (
              <div {...restProps} ref={elementRef} className={classes.thumbX} />
            );
          },
        }}
        scrollerProps={{
          id: TABLET_SCROLL_ID,
        }}
        className={classes.main}
      >
        {loaded &&
          nftData.map((d, index) => {
            if (isSponsor(d)) {
              return (
                <Box className={classes.nft} key={pair(d.id, index)}>
                  <SponsorAds
                    key={pair(d.id, index)}
                    isExpand
                    isGrid4x4
                    isOnDetail
                    isHighlight={pair(d.id, index) === highLight}
                    id={d.id}
                    dataSponsor={d}
                  />
                </Box>
              );
            }
            return (
              <Box className={classes.nft} key={d.id}>
                <DetailNFT
                  isExpand={false}
                  isGrid4x4
                  id={d.id}
                  isDetail
                  isHighlight={d.id == highLight}
                  isFilterByCategory
                  selectedCategory={selectedCategory}
                  blockWipe
                  isDeadzone={Number(d.position || 0) > 1001}
                />
              </Box>
            );
          })}
      </RSC>
    </Box>
  );
};

export default NFTsDetailTablet;

export const TABLET_SCROLL_ID = 'TABLET_SCROLL_ID';

const WIDTH_NFT_TABLET = 340;
const WIDTH_NFT_MOBILE = 254;
const MARGIN_LEFT_TABLET = 40;
const MARGIN_LEFT_MOBILE = 17;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: ({ isDeadzone }: { isDeadzone: boolean }) =>
      isDeadzone ? '#DDE542' : '#FFFFFF',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      padding: '136px 0px 0px 0px !important',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '136px 0px 0px 0px !important',
    },
  },
  main: {
    marginTop: 40,
    overflowX: 'auto',
    height: '542px !important',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 310px) !important',
      marginTop: 24,
    },
    '& .ScrollbarsCustom-Content': {
      display: 'flex',
      paddingLeft: `calc(50% - ${WIDTH_NFT_TABLET / 2}px) !important`,
      '&>div:first-child': {
        marginLeft: 0,
      },
      '&::after': {
        content: '""',
        paddingRight: `calc(100% - ${WIDTH_NFT_TABLET}px) !important`,
        [theme.breakpoints.down('sm')]: {
          paddingRight: `calc(100% - ${WIDTH_NFT_MOBILE}px) !important`,
        },
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: `calc(50% - ${WIDTH_NFT_MOBILE / 2}px) !important`,
      },
    },
  },
  nft: {
    marginLeft: MARGIN_LEFT_TABLET,
    position: 'relative',
    height: 'fit-content',
    border: ({ isDeadzone }: { isDeadzone: boolean }) =>
      isDeadzone
        ? '1px solid rgba(111, 107, 197, 0.24)'
        : '1px solid rgba(111, 107, 197, 0.08)',
    [theme.breakpoints.down('sm')]: {
      marginLeft: MARGIN_LEFT_MOBILE,
    },
    '&>div': {
      width: WIDTH_NFT_TABLET - 2,
      [theme.breakpoints.down('sm')]: {
        width: WIDTH_NFT_MOBILE - 2,
      },
    },
  },
  back: {
    zIndex: 1,
    height: 60,
    backgroundColor: 'white',
    margin: '0px 16px',
  },
  trackX: {
    left: '0px !important',
    width: '100% !important',
    backgroundColor: 'transparent !important',
    height: '7px !important',
    bottom: '6px !important',
    margin: '0px 16px',
    boxSizing: 'border-box',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderTop: '1px solid #100113',
      transform: 'translateY(30%)',
    },
  },
  thumbX: {
    backgroundColor: '#FFFFFF !important',
    border: '1px solid #100113',
    height: '5px !important',
    position: 'absolute',
    zIndex: 2,
    boxSizing: 'border-box',
  },
}));
