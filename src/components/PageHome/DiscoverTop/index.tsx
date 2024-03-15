import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Avatar, Box, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useStyles } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import { TypeAnimation } from 'react-type-animation';
import { useDispatch } from 'react-redux';
import IconExplore from 'assets/icon-explore.svg';
import { DataCategories } from 'types/categories';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { MarketPlace } from 'types/nft';
import { EChain } from 'enums/filter';
import { numberWithCommas } from 'utils/formatNumber';
import { convertWeiToEth } from 'common/helper';
import EthIconNew from 'icons/EthIconNew';
import Polygon from 'icons/Polygon';
import Solana from 'icons/Solana';
import sampleSize from 'lodash/sampleSize';
import { resetBlockCategoriesAction } from 'store/actions/blockCategoriesAction';
import { updateFilterAction } from 'store/actions/filterActions';
import { Swiper as SwiperType } from 'swiper/types';

export interface DiscoverTopProps {
  categories: DataCategories[];
}

export default function DiscoverTop(props: DiscoverTopProps) {
  const { categories } = props;
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const swiper = useRef<SwiperType>();
  const [widthSwipper, setWidthSwipper] = useState<string>('33.333%');
  const [marginLeftSwipper, setMarginLeftSwipper] = useState<string>('0px');

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const renderCategories = useMemo(() => {
    const nftCategory = categories.find((cat) => cat.name === 'NFT');
    const othersCategories = categories.filter((cat) => {
      return cat.name !== 'NFT' && cat.totalItem.value > 0;
    });

    const fourRandomCategories = sampleSize(othersCategories, 4);
    return nftCategory
      ? [nftCategory, ...fourRandomCategories]
      : fourRandomCategories;
  }, [categories]);

  const handleNavigate = useCallback(
    (pathname) => {
      history.push(pathname);
    },
    [history],
  );

  const onClickCategory = useCallback(
    (category: DataCategories) => {
      dispatch(
        updateFilterAction({
          categories: [category.name],
          blockNumber: undefined,
          blockCategory: undefined,
          collectionIds: [],
        }),
      );
      dispatch(resetBlockCategoriesAction());
      history.push({
        pathname: `/${category.name.toLowerCase()}`,
        state: { isNftFilter: true },
      });
    },
    [dispatch, history],
  );

  const renderLogoImage = useCallback((value: DataCategories) => {
    switch (value?.imgFirstPlace.marketplace) {
      case MarketPlace.LOOKSRARE:
        return '/images/looksrare-marketplace-logo.svg';
      case MarketPlace.OPENSEA:
        return '/images/opensea.svg';
      case MarketPlace.SOLANART:
        return '/images/solanartIcon.png';
      case MarketPlace.MAGICEDEN:
        return '/images/magiceden.png';
    }
  }, []);

  const getPrice = useCallback((chain?: string, price?: string) => {
    if (chain === EChain.ETHEREUM)
      return numberWithCommas(
        convertWeiToEth(parseInt(price ? price : '') || 0),
      );
    if (chain === EChain.SOLANA) return numberWithCommas(price || 0);
  }, []);

  const renderChainIcon = useCallback((value?: string) => {
    switch (value) {
      case EChain.ETHEREUM:
        return <EthIconNew width={12.5} height={12.5} />;
      case EChain.POLYGON:
        return <Polygon width={12.5} height={12.5} />;
      case EChain.SOLANA:
        return <Solana width={12.5} height={12.5} />;
    }
  }, []);

  const getRenderInfo = useCallback(
    (item: DataCategories) => {
      return (
        <Grid container className={classes.wrapInfor}>
          {Number(
            getPrice(item?.imgFirstPlace.chain, item?.imgFirstPlace.price),
          ) !== 0 && (
            <Grid container className={classes.wrapPrice}>
              <Grid className={classes.ethIcon}>
                {renderChainIcon(item?.imgFirstPlace.chain)}
              </Grid>

              <Grid className={classes.priceItem}>
                {getPrice(item?.imgFirstPlace.chain, item?.imgFirstPlace.price)}
              </Grid>

              <Grid className={classes.titlePrice}>Price</Grid>
            </Grid>
          )}
          <Grid container className={classes.wrapInforNFT}>
            <Grid className={classes.imgNFTItem}>
              <Avatar src={item?.icon} />
            </Grid>
            <Grid className={classes.nameNFT}>{item?.name}</Grid>
            <Grid className={classes.titlePrice}>#1</Grid>
          </Grid>
        </Grid>
      );
    },
    [classes, getPrice, renderChainIcon],
  );

  const handleResize = useCallback(() => {
    if (swiperRef) {
      const style = getComputedStyle(swiperRef.current as any);
      setWidthSwipper((Number(style.width) / 3).toString());
      setMarginLeftSwipper(style.marginLeft);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (renderCategories.length > 0) {
      setTimeout(() => swiper.current!.slideNext(), 1000);
    }
  }, [renderCategories, swiper]);

  const renderSwiperSlide = useMemo(() => {
    return renderCategories.map((item, index) => {
      const metadata = JSON.parse(item?.imgFirstPlace?.metaData || '{}');
      return (
        <SwiperSlide key={item.name} onClick={() => onClickCategory(item)}>
          {metadata?.ext === 'webm' || metadata?.ext === 'mp4' ? (
            <Box className={classes.wrapItemNFTImg}>
              <img
                src={item?.imgFirstPlace.marketplace && renderLogoImage(item)}
                alt=""
                className={classes.imgMarketplace}
              />
              <video
                controls={false}
                preload="auto"
                loop
                playsInline
                className={classes.media}
                autoPlay
                muted
              >
                <source
                  src={`${item?.imgFirstPlace.url}#t=0.001`}
                  type={metadata.contentType}
                />
                <img
                  src={item?.imgFirstPlace.marketplace && renderLogoImage(item)}
                  alt=""
                  className={classes.imgMarketplace}
                />
              </video>
              {getRenderInfo(item)}
            </Box>
          ) : (
            <div
              className={classes.wrapItemNFTImg}
              style={{
                backgroundImage: `url(${item?.imgFirstPlace.url})`,
              }}
            >
              <img
                src={item?.imgFirstPlace.marketplace && renderLogoImage(item)}
                alt=""
                className={classes.imgMarketplace}
              />
              {getRenderInfo(item)}
            </div>
          )}
        </SwiperSlide>
      );
    });
  }, [
    renderCategories,
    classes,
    renderLogoImage,
    getRenderInfo,
    onClickCategory,
  ]);

  return (
    <Grid container className={classes.wrapDiscover}>
      <Grid item lg={7} md={6} sm={12} className={classes.wrapDiscoverLeft}>
        <Grid item className={classes.textDiscover}>
          <span>
            Explore the 1001 squares of{' '}
            <TypeAnimation
              sequence={[
                '/NFT',
                5000,
                '/BAYC',
                5000,
                '/ENS',
                5000,
                '/AZUKI',
                5000,
                '/SOL',
                5000,
              ]}
              speed={1}
              wrapper="span"
              repeat={Infinity}
              className={classes.textNFT}
            />
          </span>
        </Grid>
        <Grid item className={classes.textDes}>
          Add NFT links from $0.00 a day.
        </Grid>
        <Grid
          container
          onClick={() => handleNavigate('/nft')}
          className={classes.wrapExplore}
        >
          <Grid>explore</Grid>
          <img src={IconExplore} alt="" className={classes.iconExplore} />
        </Grid>
      </Grid>

      <Grid item lg={5} md={6} sm={12} className={classes.wrapDiscoverRight}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          onSlideChange={(item) => {
            setActiveItemIndex(item.activeIndex);
          }}
          onSwiper={(swp) => (swiper.current = swp)}
          ref={swiperRef}
        >
          {renderSwiperSlide}
        </Swiper>
        <Grid
          container
          sm={12}
          className={classes.wrapLineProgress}
          style={{
            width: isDesktop ? undefined : widthSwipper,
            marginLeft: isDesktop ? undefined : marginLeftSwipper,
          }}
        >
          {renderCategories.map((item, index) => {
            return (
              <Grid
                key={item.name}
                className={clsx(classes.line, {
                  [classes.lineActive]: index === activeItemIndex,
                })}
              ></Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
