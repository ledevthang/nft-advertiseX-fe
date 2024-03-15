import React, { useMemo } from 'react';
import { RecentSales } from 'types/recentSales';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { convertWeiToEth } from 'common/helper';

interface IRecentSaleItemData {
  data: RecentSales;
}

function RecentSaleItem({ data }: IRecentSaleItemData) {
  const classes = useStyle();

  const metadata = useMemo(() => {
    if (data) return JSON.parse(data.nft_metadata);
  }, [data]);

  const positionAtSaleTime = useMemo(() => {
    if (data) {
      const saleTimeNft = JSON.parse(data.sales_saleTimeNft);
      return saleTimeNft.position;
    }
    return null;
  }, [data]);

  return (
    <div className={classes.container}>
      <div className={classes.nftImg}>
        {metadata && (metadata.ext === 'webm' || metadata.ext === 'mp4') ? (
          <video controls preload="auto" loop playsInline>
            <source src={`${data.nft_imageUrl}`} type={metadata.contentType} />
          </video>
        ) : (
          <img src={data.nft_imageUrl} alt="" />
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.saleCount}>Sale#: {data.sales_id}</div>
        <div className={classes.info}>
          <div className={clsx(classes.left, classes.item)}>
            <span>Collection: {data.collection_name}</span>
            <span>Name: {data.nft_nftName} </span>
            <span>Price: {Number(data.nft_squarePrice).toFixed(2)}$</span>
            <span style={{ position: 'relative' }}>
              Link:{' '}
              <a href={data.nft_originalUrl} className={classes.atag}>
                <Typography className={clsx(classes.link, 'ellipsis')}>
                  {data.nft_originalUrl}
                </Typography>
              </a>{' '}
            </span>
          </div>
          <div className={classes.item}>
            <span>
              Sale Date:{' '}
              {dayjs(data.sales_createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </span>
            <span>Square Position: {positionAtSaleTime} </span>
            <span>
              Sale Amount: {convertWeiToEth(Number(data.sales_amount))} ETH
            </span>
            <span>
              Time Elapsed Since Add NFT:{' '}
              {(
                moment(data.sales_createdAt).diff(
                  data.nft_paymentDate,
                  'minutes',
                ) / 60
              ).toFixed(2)}{' '}
              hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentSaleItem;

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    border: '1px solid #000000',
    height: 160,
    marginBottom: 20,
  },
  nftImg: {
    '& img': {
      width: 160,
      height: '100%',
    },
    '& video': {
      width: 160,
      height: '100%',
    },
  },

  content: {
    width: '100%',
  },
  saleCount: {
    height: 30,
    borderBottom: '1px solid #000000',
    boxSizing: 'border-box',
    padding: '5px 0 0 15px',
  },
  info: {
    display: 'flex',
    height: 130,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
    padding: 15,
    '& span': {
      marginBottom: 10,
    },
  },
  left: {
    borderRight: '1px solid #000000',
  },

  link: {
    marginLeft: 4,
    maxWidth: 330,
    fontSize: 13,
  },
  atag: {
    textDecoration: 'none',
    position: 'absolute',
  },
}));
