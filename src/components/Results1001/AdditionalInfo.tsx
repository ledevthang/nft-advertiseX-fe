import React, { useMemo } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { convertWeiToEth } from 'common/helper';
import OpenInNew from 'icons/OpenInNew';
import TimelapseIcon from 'icons/TimelapseIcon';
import { NFT } from 'types/nft';
import { numberWithCommas } from 'utils/formatNumber';
import { EChain } from 'enums/filter';

interface IAdditionalInfo {
  data: NFT;
  timeLeft?: string;
  isDetail?: boolean;
  isDeadzone?: boolean;
  status?: string;
  blockWipe?: boolean;
  isHighlight?: boolean;
  deadzonePossess?: boolean;
  renderChainIcon: any;
}

interface IStyle {
  isDeadzone?: boolean;
  blockWipe?: boolean;
  isHighlight?: boolean;
  isDetail?: boolean;
}

const AdditionalInfo = ({
  data,
  timeLeft,
  deadzonePossess,
  isDetail,
  isDeadzone,
  status,
  blockWipe,
  isHighlight,
  renderChainIcon,
}: IAdditionalInfo) => {
  const classes = useStyles({
    isDeadzone:
      (isDeadzone && data.isActive) || (deadzonePossess && data.isActive),
    blockWipe,
    isHighlight,
    isDetail,
  });

  const onRouteChangeBuyNow = () => {
    window.open(data.originalUrl, '_blank');
  };

  const renderDisplayValue = useMemo(() => {
    if (isDetail || data.isActive) return 'block';
    return 'none';
  }, [isDetail, data.isActive]);

  const renderTimeLeft = useMemo(() => {
    return (
      <Typography className={classes.timeLeft}>
        {timeLeft ? (
          <>
            <TimelapseIcon color={isDeadzone ? '#DDE542' : '#d6d9d6'} />
            {timeLeft}
          </>
        ) : (
          '-'
        )}
      </Typography>
    );
  }, [timeLeft, isDeadzone, classes]);

  const price = useMemo(() => {
    if (data.chain === EChain.ETHEREUM)
      return numberWithCommas(convertWeiToEth(data.price || 0));
    if (data.chain === EChain.SOLANA) return numberWithCommas(data.price || 0);
  }, [data.chain, data.price]);

  return (
    <Box display={renderDisplayValue} className={classes.main}>
      <Box display="flex" justifyContent="space-between">
        <Box className={classes.hoverWrap1}>
          <Typography className={classes.title}>
            Square price per day
          </Typography>
          <Typography>
            ${numberWithCommas(Number(data.squarePrice).toFixed(2))}
          </Typography>
          {!isDetail && renderTimeLeft}
        </Box>
        <Box className={classes.hoverWrap2}>
          {!isDetail && (
            <Box className={classes.price}>
              <Typography className={classes.nftPrice}>{status}</Typography>
              {data.price && (
                <Typography className={classes.priceValue}>
                  {renderChainIcon}
                  {price}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Button
        className={clsx(classes.btnBuy, 'center-root', {
          [classes.isDeadzone]:
            (isDeadzone && data.isActive) || (deadzonePossess && data.isActive),
        })}
        onClick={onRouteChangeBuyNow}
      >
        <Typography>BUY NOW</Typography>
        <OpenInNew
          color={
            (isDeadzone && data.isActive) || (deadzonePossess && data.isActive)
              ? '#DDE542'
              : '#6F6BC5'
          }
        />
      </Button>
    </Box>
  );
};

export default AdditionalInfo;

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#100113',
    padding: 16,
    [theme.breakpoints.down('md')]: {
      opacity: ({ blockWipe, isHighlight }: IStyle) =>
        !blockWipe || isHighlight ? 1 : 0.6,
    },
    borderTop: ({ isDeadzone }: IStyle) =>
      isDeadzone
        ? '1px solid rgba(221, 229, 66,0.6) !important'
        : 'unset !important',
    border: ({ isDeadzone, blockWipe, isDetail }: IStyle) =>
      blockWipe
        ? 'unset'
        : isDeadzone && isDetail
        ? '1px solid #DDE542'
        : '1px solid rgba(111, 107, 197, 0.24)',
  },
  hoverWrap1: {
    '& p:nth-child(1)': {
      fontSize: 8,
      color: ({ isDeadzone }: IStyle) => (isDeadzone ? '#DDE542' : '#d6d9d6'),
    },
    '& p:nth-child(2)': {
      fontSize: 24,
      color: ({ isDeadzone }: IStyle) => (isDeadzone ? '#DDE542' : '#FFFFFF'),
      lineHeight: '17px',
      marginTop: 8,
      marginBottom: 8,
      fontWeight: 700,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
  },
  hoverWrap2: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap-reverse',
    '& img': {
      width: 16,
      height: 16,
      marginBottom: 9,
      borderRadius: '50%',
    },
  },
  btnBuy: {
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: ({ isDeadzone }: IStyle) =>
      isDeadzone ? '#DDE542' : '#8c89d1',
    width: '100%',
    marginTop: 16,
    height: 30,
    color: '#6F6BC5 !important',
    borderRadius: 0,
    '& p': {
      color: '#6F6BC5 !important',
      fontSize: 12,
      fontWeight: 600,
    },
    '& svg': {
      width: 14,
      height: 14,
      marginLeft: 8,
    },
    [theme.breakpoints.up('lg')]: {
      '&:hover': {
        backgroundColor: ({ isDeadzone }: IStyle) =>
          isDeadzone ? '#DDE542' : '#8c89d1',
        '& p': {
          color: '#100113 !important',
        },
        '& svg>path': {
          stroke: '#100113',
        },
      },
    },
  },
  isDeadzone: {
    color: '#100113 !important',
    '& p': {
      color: '#DDE542 !important',
    },
    [theme.breakpoints.up('lg')]: {
      '&:hover': {
        '& p': {
          color: '#100113 !important',
        },
      },
    },
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '25px',
    fontFamily: 'Roboto',
    '& p:nth-child(1)': {
      color: ({ isDeadzone }: IStyle) => (isDeadzone ? '#DDE542' : '#d6d9d6'),
      fontSize: 8,
      alignSelf: 'end',
      width: '100%',
      textAlign: 'right',
    },
    '& p:nth-child(2)': {
      color: ({ isDeadzone }: IStyle) => (isDeadzone ? '#DDE542' : '#FFFFFF'),
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: 12,
      '& svg': {
        marginRight: 4,
        width: 8,
        height: 12,
      },
    },
  },
  timeLeft: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto',
    color: ({ isDeadzone }: IStyle) =>
      isDeadzone ? '#DDE542 !important' : '#D9D6D9 !important',
    fontSize: 8,
    '& svg': {
      width: 10,
      height: 10,
      marginRight: 4,
    },
  },
  title: {
    fontFamily: 'Roboto',
    color: '#D9D6D9 !important',
  },
  nftPrice: {
    fontFamily: 'Roboto',
    color: '#D9D6D9 !important',
  },
  priceValue: {
    fontFamily: 'Roboto',
  },
}));
