import React, { memo, useMemo } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { convertWeiToEth } from 'common/helper';
import TimelapseIcon from 'icons/TimelapseIcon';
import VerifiedIcon from 'icons/VerifiedIcon';
import { NFT } from 'types/nft';
import { numberWithCommas } from 'utils/formatNumber';
import { EChain } from 'enums/filter';

interface IData {
  isGrid4x4: boolean;
  data: NFT;
  renderStatus: string;
  renderChainIcon: any;
  isDeadzone?: boolean;
  renderTimeLeft: any;
  isDetail?: boolean;
  isProfile?: boolean;
  isFilterByCategory?: boolean;
  selectedCategory?: string;
}

const NFTContent = ({
  isGrid4x4,
  data,
  renderChainIcon,
  isDeadzone,
  renderStatus,
  renderTimeLeft,
  isDetail,
  isProfile,
  isFilterByCategory,
  selectedCategory,
}: IData) => {
  const classes = useStyles({
    isGrid4x4,
    isDeadzone,
    isActive: data.isActive,
    isDetail,
    isAwaiting: data.isProcessPayment && !data.isActive,
    isProfile,
  });

  const price = useMemo(() => {
    if (data.chain === EChain.ETHEREUM)
      return numberWithCommas(convertWeiToEth(data.price || 0));
    if (data.chain === EChain.SOLANA) return numberWithCommas(data.price || 0);
  }, [data.chain, data.price]);

  const position = useMemo(() => {
    if (!data.isActive) return '-';
    if (isFilterByCategory && selectedCategory && data.positionOnCategories) {
      return (
        data.positionOnCategories.find((item) => item.name === selectedCategory)
          ?.position || '-'
      );
    }

    return data.position;
  }, [data, isFilterByCategory, selectedCategory]);

  return (
    <Box className={classes.content}>
      <Box className={classes.wrapper1}>
        <Box>
          <Box className={classes.collection}>
            <Typography>{data.collection?.name}</Typography>
            {/* {data.collection?.isVerified && <VerifiedIcon color="#6BC96B" />} */}
          </Box>
          <Typography className={classes.nftName}>
            {data.nftName || data.tokenId}
          </Typography>
        </Box>
        <Box className={classes.price}>
          <Typography
            className={clsx(classes.nftPrice, {
              [classes.topBid]: data.isActive && isDeadzone,
            })}
          >
            {renderStatus}
          </Typography>
          {data.price && (
            <Typography style={{ alignSelf: 'flex-end' }}>
              {renderChainIcon}
              {price}
            </Typography>
          )}
        </Box>
      </Box>
      <Box className={classes.wrapper2}>
        <Typography>{position}</Typography>
        <Typography className={classes.timeLeft}>
          <TimelapseIcon
            color={
              !data.isActive
                ? 'rgba(16, 1, 19, 0.6)'
                : isDeadzone
                ? isProfile
                  ? 'rgba(16, 1, 19, 0.6)'
                  : 'rgb(221, 229, 66)'
                : '#706771'
            }
          />
          {data.isProcessPayment && !data.isActive
            ? 'Awaiting'
            : renderTimeLeft}
        </Typography>
      </Box>
    </Box>
  );
};

interface IStyle {
  isGrid4x4: boolean;
  isActive?: boolean;
  isDetail?: boolean;
  isDeadzone?: boolean;
  isAwaiting?: boolean;
  isProfile?: boolean;
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '10px 16px',
    height: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 80 : 94),
    boxSizing: 'border-box',
    backgroundColor: ({ isActive, isDeadzone, isProfile }: IStyle) =>
      !isActive
        ? 'rgba(111, 107, 197, 0.08)'
        : isDeadzone
        ? isProfile
          ? '#DDE542'
          : '#100113'
        : '',
    // isDeadzone ? '#100113' : !isActive ? 'rgba(111, 107, 197, 0.08)' : '',
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: ({ isActive, isDeadzone, isProfile }: IStyle) =>
        !isActive
          ? 'rgba(111, 107, 197, 0.8)'
          : isDeadzone
          ? isProfile
            ? '#100113'
            : '#DDE542'
          : '',
      // isDeadzone ? '#DDE542' : !isActive ? 'rgba(111, 107, 197, 0.8)' : '',
    },
    [theme.breakpoints.down('md')]: {
      height: ({ isDetail }: IStyle) =>
        isDetail ? '80px !important' : '68px !important',
      padding: ({ isDetail }: IStyle) => (isDetail ? '8px 16px' : '4px 8px'),
    },
  },
  wrapper1: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>div:first-child': {
      maxWidth: '50%',
    },
  },
  collection: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 10 : 12),
      fontFamily: 'Roboto',
    },
    '& svg': {
      marginLeft: 4,
      width: 9,
      height: 9,
    },
  },
  nftName: {
    fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 12 : 16),
    fontWeight: 'bold',
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    '& p:nth-child(1)': {
      color: 'rgba(16, 1, 19, 0.6)',
      fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 10 : 12),
      fontFamily: 'Roboto',
      alignSelf: 'end',
      width: '100%',
      textAlign: 'right',
    },
    '& p:nth-child(2)': {
      display: 'flex',
      alignItems: 'center',
      fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 12 : 16),
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      '& svg': {
        width: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 7 : 9),
        height: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 12 : 14),
        marginRight: 4,
      },
    },
  },
  wrapper2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '& >p:nth-child(1)': {
      fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 20 : 23),
      color: '#6F6BC5',
      fontWeight: 'bold',
    },
  },
  lastPrice: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: 12,
    },
    '& p:first-child': {
      color: 'rgba(16, 1, 19, 0.6)',
    },
    '& svg': {
      width: 10,
      height: 10,
      marginRight: 8,
      marginLeft: 8,
    },
    '& p:last-child': {
      fontWeight: 'bold',
    },
  },
  topBid: {
    color: ({ isProfile }: IStyle) =>
      isProfile
        ? 'rgba(16, 1, 19, 0.6) !important'
        : 'rgba(221, 229, 66, 0.6) !important',
  },
  nftPrice: {
    fontFamily: 'Roboto',
    color: '#706771 !important',
  },
  timeLeft: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 10,
    fontFamily: 'Roboto',
    color: ({ isAwaiting }: IStyle) =>
      isAwaiting ? 'rgb(255,173,92) !important' : '#706771 !important',
    '& svg': {
      width: 10,
      height: 10,
      marginRight: 4,
    },
  },
}));

export default memo(NFTContent);
