import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Card,
  CardMedia,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNFTById } from 'store/selectors';
import { parseTimeDuration } from 'utils/date';
import AdditionalInfo from './AdditionalInfo';
import NFTAction from './NFTAction';
import NFTContent from './NFTContent';
import { MarketPlace } from 'types/nft';
import EthIconNew from 'icons/EthIconNew';

interface IDetailNFT {
  isGrid4x4: boolean;
  isExpand: boolean;
  possess?: boolean;
  isDeadzone?: boolean;
  isDetail?: boolean;
  isHighlight?: boolean;
  blockWipe?: boolean;
  index?: number;
  id: any;
  isProfile?: boolean;
  isFilterByCategory?: boolean;
  selectedCategory?: string;
}

interface IStyle {
  isGrid4x4: boolean;
  isExpand: boolean;
  possess?: boolean;
  isActive?: boolean;
  image: string;
  isDetail?: boolean;
  isDeadzone?: boolean;
  isHighlight?: boolean;
  blockWipe?: boolean;
  isProcessPayment?: boolean;
  isProfile?: boolean;
}

function DetailNFT({
  id,
  isGrid4x4,
  isExpand,
  possess,
  isDetail,
  isDeadzone,
  isHighlight,
  blockWipe,
  index,
  isProfile,
  isFilterByCategory,
  selectedCategory,
}: IDetailNFT) {
  const data: any = useSelector((store) => getNFTById(store, id) || {});
  const [showPoster, setShowPoster] = useState(true);

  const deadzonePossess = useMemo(() => {
    return possess && Number(data.position || 0) > 1001;
  }, [possess, data.position]);

  const classes = useStyles({
    isGrid4x4,
    isExpand,
    possess,
    isActive: data.isActive,
    image: data.imageUrl,
    isDetail,
    isDeadzone: isDeadzone || deadzonePossess,
    isHighlight,
    blockWipe,
    isProcessPayment: data.isProcessPayment,
    isProfile,
  });

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const history = useHistory();
  const videoRef = useRef<any>();

  const onRouteChange = useCallback(() => {
    if (history.location.pathname.startsWith('/my-detail-nft')) return;
    if (isDesktop) {
      return;
    } else if (possess) {
      if (!data.isActive && data.isProcessPayment) return;
      history.push(`my-detail-nft/${data.id}`);
    } else {
      if (history.location.pathname === '/detail-nfts') return;
      history.push(`detail-nfts`, {
        index,
        nftHighlight: data.id,
        categories: selectedCategory,
      });
      const nftHighlight = {
        index,
        id: data.id,
        categories: selectedCategory,
      };
      sessionStorage.setItem('nftHighlight', JSON.stringify(nftHighlight));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isDesktop,
    history.location.pathname,
    possess,
    data.id,
    data.isActive,
    data.isProcessPayment,
    index,
  ]);

  const getTimeLeft = useCallback(() => {
    const time = moment(data.endDate).diff(moment(), 'seconds');
    const [months, days, hours] = parseTimeDuration(time);
    const diffYear = Math.floor(months / 12);
    if (diffYear > 0)
      return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} left`;

    const diffMonth = Math.floor(months);
    if (diffMonth > 0)
      return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} left`;

    const diffDays = Math.floor(days);
    if (diffDays > 0)
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;

    const diffHours = Math.floor(hours);

    if (hours < 1) {
      const minutes = hours * 60;
      if (minutes > 1) return `${Math.floor(minutes)} minutes left`;
      return 'last seconds left';
    }

    if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hr' : 'hrs'} left`;
    }
  }, [data.endDate]);

  const timeLeft = getTimeLeft();

  const renderTimeLeft = useMemo(() => {
    if (!data.isActive) return '-';
    return timeLeft || '-';
  }, [timeLeft, data.isActive]);

  const renderStatus = useMemo(() => {
    if (!data.status || !data.price) return null;
    const text = data.status.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }, [data]);

  const [metadata, isVideo] = useMemo(() => {
    const metadata = JSON.parse(data.metadata || '{}');
    const isVideo = metadata.ext === 'webm' || metadata.ext === 'mp4';

    return [metadata, isVideo];
  }, [data]);

  const onPreventClick = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const onShowVideo = useCallback(() => {
    setShowPoster(false);
  }, [setShowPoster]);

  const renderVideo = useMemo(() => {
    return (
      <Box className={clsx(classes.media, { [classes.detailNFT]: isDetail })}>
        {showPoster ? (
          <>
            <CardMedia
              onClick={onShowVideo}
              className={clsx(classes.media, {
                [classes.detailNFT]: isDetail,
                [classes.posterVideo]: isDetail,
              })}
              image={data.thumbnailUrl}
            />
            <CardMedia
              image={'images/playButton.png'}
              className={classes.playVideoIcon}
              onClick={onShowVideo}
            />
          </>
        ) : (
          <video
            controls
            preload="metadata"
            loop
            className={classes.video}
            ref={videoRef}
            playsInline
            poster={data?.thumbnailUrl}
            onClick={onPreventClick}
            autoPlay
          >
            <source
              src={`${data.imageUrl}#t=0.001`}
              type={metadata.contentType}
            />
          </video>
        )}
      </Box>
    );
  }, [
    classes,
    data,
    metadata,
    isDetail,
    showPoster,
    onShowVideo,
    onPreventClick,
  ]);

  const onRouteChangeBuyNow = () => {
    if (!isDesktop) return;
    window.open(data.originalUrl, '_blank');
  };

  const renderChainIcon = useMemo(() => {
    return <EthIconNew />;
  }, [data.chain]);

  const renderNFTContent = useMemo(() => {
    return (
      <NFTContent
        isDeadzone={isDeadzone}
        data={data}
        isGrid4x4={isGrid4x4}
        renderStatus={renderStatus}
        renderChainIcon={renderChainIcon}
        renderTimeLeft={renderTimeLeft}
        isDetail={isDetail}
        isProfile={isProfile}
        isFilterByCategory={isFilterByCategory}
        selectedCategory={selectedCategory}
      />
    );
  }, [
    data,
    isDeadzone,
    isGrid4x4,
    renderStatus,
    renderChainIcon,
    renderTimeLeft,
    isDetail,
    isFilterByCategory,
    selectedCategory,
    isProfile,
  ]);

  useEffect(() => {
    if (!blockWipe) return;
    if (!isHighlight) {
      videoRef.current?.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHighlight]);

  const renderLogoImage = useMemo(() => {
    switch (data.marketplace) {
      case MarketPlace.LOOKSRARE:
        return '/images/looksrare-marketplace-logo.svg';
      case MarketPlace.OPENSEA:
        return '/images/openseaIcon.svg';
      case MarketPlace.SOLANART:
        return '/images/solanartIcon.png';
      case MarketPlace.MAGICEDEN:
        return '/images/magiceden.png';
    }
  }, [data.marketplace]);

  return (
    <>
      {isDetail && !isDesktop && possess && (
        <NFTAction
          data={data}
          isDefault={isDeadzone}
          className={clsx(classes.normalBlock, classes.detailPageAction)}
          isActive={data.isActive}
        />
      )}
      <Card
        className={clsx(classes.main, {
          [classes.unsetBorderBottom]: isDeadzone && isDetail,
        })}
        onClick={onRouteChange}
      >
        {isVideo ? (
          renderVideo
        ) : (
          <CardMedia
            onClick={onRouteChangeBuyNow}
            className={clsx(classes.media, { [classes.detailNFT]: isDetail })}
            image={data.imageUrl}
          />
        )}
        {renderNFTContent}
        <Box
          className={clsx(classes.hidden, {
            [classes.colorHidden]: !possess || data.isActive,
            [classes.hiddenInActive]: possess && !data.isActive,
          })}
          id="hidden"
        >
          {!data.isActive && possess && renderNFTContent}
          <AdditionalInfo
            data={data}
            timeLeft={timeLeft}
            isDeadzone={isDeadzone}
            blockWipe={blockWipe}
            isHighlight={isHighlight}
            status={renderStatus}
            deadzonePossess={deadzonePossess}
            renderChainIcon={renderChainIcon}
          />
          {possess && (
            <NFTAction
              data={data}
              isDefault={isDeadzone}
              className={classes.normalBlock}
              isActive={data.isActive}
            />
          )}
        </Box>
      </Card>
      <CardMedia image={renderLogoImage} className={classes.logoImage} />

      {isDetail && (
        <AdditionalInfo
          data={data}
          timeLeft={timeLeft}
          isDeadzone={isDeadzone}
          isDetail
          status={renderStatus}
          blockWipe={blockWipe}
          isHighlight={isHighlight}
          deadzonePossess={deadzonePossess}
          renderChainIcon={renderChainIcon}
        />
      )}
    </>
  );
}

export default memo(DetailNFT);

const renderHeightHidden = ({ possess, isActive }: IStyle) => {
  if (!isActive) {
    if (!possess) return 72;
    if (possess) return 152;
  }
  if (possess) return 205;
  return 133;
};

const renderMarginBottom = ({
  isGrid4x4,
  possess,
  isActive,
  isProcessPayment,
}: IStyle) => {
  if (possess) {
    if (!isActive) {
      if (!isProcessPayment) {
        return 72;
      } else {
        return 0;
      }
    }
    return 125;
  }
  return isGrid4x4 ? 53 : 39;
};

const renderPaddingBottom = ({
  isGrid4x4,
  possess,
  isActive,
  isProcessPayment,
}: IStyle) => {
  if (possess) {
    if (!isActive) {
      if (!isProcessPayment) {
        return 'calc(100% - 72px)';
      } else {
        return '100%';
      }
    }
    return 'calc(100% - 125px)';
  }
  return isGrid4x4 ? 'calc(100% - 53px)' : 'calc(100% - 39px)';
};

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    transition: 'height 0.25s ease',
    backgroundColor: ({ isDeadzone, isActive }: IStyle) =>
      !isActive
        ? 'rgba(111, 107, 197, 0.08)'
        : isDeadzone
        ? '#DDE542'
        : '#FFFFFF',
    // isDeadzone
    //   ? '#DDE542'
    //   : isActive
    //   ? '#FFFFFF'
    //   : 'rgba(111, 107, 197, 0.08)',
    height: 'max-content',

    border: ({ isDeadzone, possess, blockWipe, isActive, isProfile }: IStyle) =>
      blockWipe
        ? 'none'
        : !isActive
        ? '1px solid rgba(111, 107, 197, 0.24)'
        : isDeadzone && isProfile
        ? '#F7F9D2'
        : isDeadzone && possess
        ? '1px solid rgba(221, 229, 66, 0.24)'
        : '1px solid rgba(111, 107, 197, 0.24)',

    borderRadius: 0,
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      '&:hover': {
        backgroundColor: ({ isDeadzone, isActive, isProfile }: IStyle) =>
          isDeadzone && isActive
            ? isProfile
              ? '#DDE542'
              : '#CBD33D'
            : '#FFFFFF',
        '&>div:first-child': {
          '& video': {
            height: ({ isActive, possess }: IStyle) =>
              possess && isActive
                ? 'calc(100% - 205px)'
                : isActive
                ? 'calc(100% - 133px)'
                : 'calc(100%)',
          },
          marginBottom: renderMarginBottom,
          paddingBottom: renderPaddingBottom,
        },
        '&>div:last-child': {
          height: renderHeightHidden,
          transition: 'height 0.25s ease',
        },
        '&>div:first-child>div:first-child': {
          '& video': {
            height: ({ isActive, possess }: IStyle) =>
              possess && isActive
                ? 'calc(100% - 205px)'
                : isActive
                ? 'calc(100% - 133px)'
                : 'calc(100%)',
          },
          marginBottom: renderMarginBottom,
          paddingBottom: renderPaddingBottom,
        },
        '&>div:first-child>div:last-child': {
          top: ({ isDetail, possess }: IStyle) => {
            return isDetail
              ? '38.3% !important'
              : possess
              ? '15.4% !important'
              : '30.4% !important';
          },
          height: ({ possess }: IStyle) => (possess ? 30 : 60),
          width: ({ possess }: IStyle) =>
            possess ? '30px !important' : '60px !important',
        },
      },
    },
    [theme.breakpoints.down('md')]: {
      opacity: ({ blockWipe, isHighlight }: IStyle) =>
        !blockWipe || isHighlight ? 1 : 0.6,
    },
  },
  media: {
    width: '100%',
    height: 0,
    transition: 'height 0.25s ease',
    paddingBottom: '100%',
    flexGrow: 1,
    cursor: 'pointer',
    backgroundSize: 'contain',
    backgroundImage: ({ isActive, image }: IStyle) =>
      !isActive
        ? `linear-gradient(0deg, rgba(111, 107, 197, 0.08), rgba(111, 107, 197, 0.08)), url(${image}) !important`
        : '',
    backgroundColor: ({ isDeadzone, isProfile }: IStyle) =>
      isDeadzone ? (isProfile ? '#DDE542' : '#CBD33D') : '#FFFFFF',
    filter: ({ isActive }: IStyle) => (isActive ? 'none' : 'grayscale(100%)'),
  },
  hidden: {
    position: 'absolute',
    height: 0,
    width: '100%',
    boxSizing: 'border-box',
    bottom: 0,
    display: ({ isProcessPayment, isActive }: IStyle) =>
      isProcessPayment && !isActive ? 'none' : 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  normalBlock: {
    height: ({ isActive }: IStyle) => (isActive ? 72 : 80),
    width: '100%',
    backgroundColor: ({ isDeadzone, isActive, isDetail }: IStyle) =>
      isDeadzone && isActive && !isDetail ? '#DDE542' : '#FFFFFF',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'center',
    '& div': {
      borderRadius: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      width: 40,
      height: 40,
      border: ({ isDeadzone, isActive }: IStyle) =>
        isDeadzone && isActive ? '1px solid #100113' : '1px solid #6F6BC5',
      minWidth: 0,
      '& svg': {
        width: 24,
        height: 24,
      },
    },
    '& div:first-child': {
      backgroundColor: ({ isDeadzone, isActive }: IStyle) =>
        isDeadzone && isActive ? '#DDE542 ' : '#FFFFFF',
    },
    '& div:nth-child(2)': {
      backgroundColor: ({ isDeadzone, isActive }: IStyle) =>
        isDeadzone && isActive ? '#DDE542 ' : '#6F6BC5',
      margin: '0px 16px',
    },
    '& div:nth-child(3)': {
      backgroundColor: ({ isDeadzone, isActive }: IStyle) =>
        isDeadzone && isActive ? '#DDE542 ' : '#6F6BC5',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px 0px',
    },
  },
  logoImage: {
    width: '20px !important',
    height: 20,
    borderRadius: '50%',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  detailPageAction: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 44,
    marginBottom: 8,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      marginTop: 26,
      marginBottom: 6,
      justifyContent: 'center',
    },
  },
  video: {
    position: 'absolute',
    width: 'inherit',
    aspectRatio: '1',
    height: ({ isDetail }: IStyle) => (isDetail ? 'inherit' : 'unset'),
    [theme.breakpoints.down('sm')]: {
      minHeight: ({ blockWipe }: IStyle) => (blockWipe ? '70%' : 'unset'),
      height: ({ isDetail }: IStyle) =>
        isDetail ? 'calc(100vh - 552px)' : 'unset',
      maxHeight: ({ isDetail }: IStyle) => (isDetail ? '170px' : 'unset'),
    },
  },
  detailNFT: {
    height: ({ blockWipe, isHighlight }: IStyle) =>
      !blockWipe || isHighlight ? 270 : 210,
    paddingBottom: 'unset',
    [theme.breakpoints.down('sm')]: {
      minHeight: ({ blockWipe, isHighlight }: IStyle) =>
        !blockWipe ? 'unset' : isHighlight ? 100 : 48,
      height: ({ blockWipe, isHighlight }: IStyle) =>
        !blockWipe
          ? 252
          : isHighlight
          ? 'calc(100vh - 552px)'
          : 'calc(100vh - 604px)',
    },
  },
  colorHidden: {
    backgroundColor: '#100113',
    '& p': {
      color: ({ isDeadzone }: IStyle) =>
        isDeadzone ? '#DDE542 !important' : '#D9D6D9',
    },
  },
  hiddenInActive: {
    backgroundColor: 'white',
  },
  unsetBorderBottom: {
    borderBottom: 'unset !important',
  },
  iconEth: {
    marginRight: '4px',
  },
  playVideoIcon: {
    [theme.breakpoints.down('sm')]: {
      height: ({ blockWipe, isHighlight }: IStyle) => {
        if (!blockWipe) {
          return 41;
        } else {
          return isHighlight ? 50 : 40;
        }
      },
      width: ({ blockWipe, isHighlight }: IStyle) => {
        if (!blockWipe) {
          return '41px !important';
        } else {
          return isHighlight ? '50px !important' : '40px !important';
        }
      },
    },
    cursor: 'pointer',
    position: 'absolute',
    top: ({ isDetail }: IStyle) => (isDetail ? '38.3%' : '38.4%'),
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `70px !important`,
    height: 70,
    [theme.breakpoints.up('md')]: {
      height: ({ blockWipe, isHighlight }: IStyle) => {
        if (!blockWipe) {
          return 64;
        } else {
          return isHighlight ? 64 : 50;
        }
      },
      width: ({ blockWipe, isHighlight }: IStyle) => {
        if (!blockWipe) {
          return '64px !important';
        } else {
          return isHighlight ? '64px !important' : '50px !important';
        }
      },
    },
  },
  posterVideo: {
    [theme.breakpoints.down('sm')]: {},
  },
}));
