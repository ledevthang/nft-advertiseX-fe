import React, { memo, useCallback, useMemo } from 'react';
import { Box, Card, CardMedia, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import SponsorContent from './SponsorContent';
import SponsorAdditionalInfo from './SponsorAdditionalInfo';
import { Sponsor } from 'types/sponsor';
import SponsorSvc from 'services/sponsorAds';

interface ISponsorAds {
  isGrid4x4: boolean;
  isExpand: boolean;
  possess?: boolean;
  isDeadzone?: boolean;
  index?: number;
  id: number;
  dataSponsor: Sponsor;
  isOnDetail?: boolean;
  isHighlight?: boolean;
}

interface IStyle {
  isGrid4x4: boolean;
  isExpand: boolean;
  possess?: boolean;
  isActive?: boolean;
  image: string;
  isOnDetail?: boolean;
  isDeadzone?: boolean;
  isHighlight?: boolean;
  isProcessPayment?: boolean;
  isProfile?: boolean;
}

function SponsorAds({
  isGrid4x4,
  isExpand,
  possess,
  isDeadzone,
  dataSponsor,
  isOnDetail,
  isHighlight,
}: ISponsorAds) {
  const classes = useStyles({
    isGrid4x4,
    isExpand,
    possess,
    isActive: true,
    isOnDetail,
    isHighlight,
    image: dataSponsor?.imageUrl || '',
    isDeadzone: isDeadzone,
    isProcessPayment: true,
  });

  const onRouteChangeBuyNow = useCallback(() => {
    window.open(dataSponsor?.trueLink, '_blank');
  }, [dataSponsor?.trueLink]);

  const handleUpdateClicked = useCallback(async () => {
    try {
      await SponsorSvc.UpdateCountClikedSponsorAds(dataSponsor.id);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [dataSponsor]);

  const renderSponsorContent = useMemo(() => {
    if (!dataSponsor) return;
    return (
      <SponsorContent
        isDeadzone={isDeadzone}
        data={dataSponsor}
        isGrid4x4={isGrid4x4}
        isOnDetail={isOnDetail}
      />
    );
  }, [dataSponsor, isDeadzone, isGrid4x4, isOnDetail]);

  return (
    <Box onClick={handleUpdateClicked} className={classes.sponsorContainer}>
      <Card
        className={clsx(classes.main, {
          [classes.unsetBorderBottom]: isDeadzone,
        })}
      >
        <CardMedia
          onClick={onRouteChangeBuyNow}
          className={clsx(classes.media)}
          image={dataSponsor?.imageUrl || ''}
        />
        {renderSponsorContent}
        <Box className={classes.hidden} id="hidden">
          {dataSponsor && (
            <SponsorAdditionalInfo data={dataSponsor} isDeadzone={isDeadzone} />
          )}
        </Box>
      </Card>
    </Box>
  );
}

export default memo(SponsorAds);

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
  sponsorContainer: {
    height: 'fit-content',
    [theme.breakpoints.down('lg')]: {
      opacity: ({ isHighlight, isOnDetail }: IStyle) =>
        isOnDetail ? (isHighlight ? '1' : '0.6') : '1',
    },
  },
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
    height: 'max-content',
    border: ({ isDeadzone, possess, isActive, isProfile }: IStyle) =>
      !isActive
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
      },
    },
  },
  media: {
    width: '100%',
    height: ({ isOnDetail, isHighlight }: IStyle) =>
      isOnDetail ? (isHighlight ? 350 : 275) : 0,
    transition: 'height 0.25s ease',
    paddingBottom: ({ isOnDetail }: IStyle) => (isOnDetail ? '0%' : '100%'),
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
    height: ({ isOnDetail }: IStyle) => (isOnDetail ? '133px' : 0),
    width: '100%',
    transition: 'height 0.25s ease',
    boxSizing: 'border-box',
    bottom: 0,
    display: ({ isProcessPayment, isActive }: IStyle) =>
      isProcessPayment && !isActive ? 'none' : 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  unsetBorderBottom: {
    borderBottom: 'unset !important',
  },
}));
