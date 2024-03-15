import React, { useCallback, useMemo } from 'react';
import { Box, Button, Link, makeStyles, Typography } from '@material-ui/core';
import { convertWeiToEth, renderShortAddress } from 'common/helper';
import { Transaction } from 'types/transaction';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import ConfrimPopup from 'components/Popup/ConfirmPopup';
import { NFTPriceResponseType } from 'types/nft';
import { CurrencyUnitEnum } from 'enums/addNft';
import CopyButton from './CopyButton';
import moment from 'moment';
import {
  deleteTransaction,
  deleteTransactionSucccessAction,
} from 'store/actions/transactionActions';

interface IData {
  data: Transaction;
  currency: NFTPriceResponseType | undefined;
}

interface IStyle {
  isRemoved: boolean;
}

const IncomingTransactionItem = ({ data, currency }: IData) => {
  const dispatch = useDispatch();
  const classes = useStyles({ isRemoved: data.isDeleted });

  const eurAmout = useMemo(() => {
    const eurRate = currency?.filter(
      (ele) => ele.symbol === CurrencyUnitEnum.EUR,
    )[0]?.rate;
    const currencyNft = currency?.filter((ele) => ele.symbol === data.currency);
    const currencyMatched = currencyNft && currencyNft[0];

    if (currencyMatched && eurRate) {
      return (
        (convertWeiToEth(Number(data.amount)) * currencyMatched.rate) /
        eurRate
      ).toFixed(3);
    }
  }, [data, currency]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTransaction(data.id, () => {}));
    dispatch(deleteTransactionSucccessAction({ id: data.id }));
  }, [dispatch, data.id]);

  const onRemoveNFT = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: ConfrimPopup,
        props: {
          callback: handleDelete,
          text: 'Do you want to delete this NFT',
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleCopyItem = (strCopy: string) => {
    navigator.clipboard.writeText(strCopy);
  };

  const renderAmountOfTime = useMemo(() => {
    const date1 = dayjs(data.endDate);
    const date2 = dayjs(data.paymentDate);
    return date1.diff(date2, 'hours');
  }, [data]);

  const metadata = useMemo(() => {
    const metadata = JSON.parse(data.metadata);
    return metadata;
  }, [data]);

  return (
    <Box className={classes.main}>
      {metadata?.ext === 'webm' || metadata?.ext === 'mp4' ? (
        <Box className={classes.img}>
          <video
            controls
            preload="auto"
            loop
            className={classes.img}
            playsInline
          >
            <source
              src={`${data.imageUrl}#t=0.001`}
              type={metadata?.contentType}
            />
          </video>
        </Box>
      ) : (
        <img className={classes.img} src={data.imageUrl} alt="" />
      )}
      <Box className={classes.user}>
        <Box>
          <Typography>Order #: {data.id}</Typography>
        </Box>
        <Box>
          <Typography>Collection: {data.collection}</Typography>
          <Typography>Name: {data.nftName}</Typography>
          <Typography>
            Square price per day: {Number(data.squarePrice).toFixed(2)}$
          </Typography>
          <Box display="flex" alignItems="baseline">
            <Typography>Link: </Typography>
            <Link href={data.originalUrl}>
              <Typography className={clsx(classes.link, 'ellipsis')}>
                {data.originalUrl}
              </Typography>
            </Link>
          </Box>
          <div style={{ display: 'flex' }}>
            <Typography>IP: {data.country}</Typography>
            <CopyButton
              onCopy={() => {
                handleCopyItem(data.ip);
              }}
            />
          </div>
        </Box>
      </Box>
      <Box className={classes.transaction}>
        <Box>
          <Typography>
            Transaction {renderShortAddress(data.txId, 6, 10)}
          </Typography>
          <CopyButton
            onCopy={() => {
              handleCopyItem(data.txId);
            }}
          />
        </Box>
        <Box>
          <div style={{ display: 'flex' }}>
            <Typography>
              Transaction Date:{' '}
              {dayjs(data.paymentDate).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
            <CopyButton
              onCopy={() => {
                handleCopyItem(
                  dayjs(data.paymentDate).format('YYYY-MM-DD HH:mm:ss'),
                );
              }}
            />
          </div>
          <Box display={'flex'}>
            <Typography>
              Wallet Address:
              {renderShortAddress(data.walletAddress, 6, 10)}
            </Typography>
            <CopyButton
              onCopy={() => {
                handleCopyItem(data.walletAddress);
              }}
            />
          </Box>
          <div style={{ display: 'flex' }}>
            <Typography>
              Amount: {convertWeiToEth(Number(data.amount))} {data.currency}
            </Typography>
            <CopyButton
              onCopy={() => {
                handleCopyItem(
                  `${convertWeiToEth(Number(data.amount))} ${data.currency}`,
                );
              }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Typography>Conversion to EUR: €{eurAmout} </Typography>
            <CopyButton
              onCopy={() => {
                handleCopyItem(eurAmout || 'null');
              }}
            />
          </div>
          <Box className={classes.wrapper}>
            <div style={{ display: 'flex' }}>
              <Typography>
                Amount Of Time:{' '}
                {(
                  moment(data.endDate).diff(data.paymentDate, 'minutes') / 60
                ).toFixed(2)}{' '}
                hours
              </Typography>
              <CopyButton
                onCopy={() => {
                  handleCopyItem(renderAmountOfTime.toString());
                }}
              />
            </div>
            <Button
              onClick={onRemoveNFT}
              className={classes.removeButton}
              disabled={data.isDeleted}
            >
              {data.isDeleted ? 'Removed' : 'Remove'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IncomingTransactionItem;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    marginTop: 20,
    height: 200,
    backgroundColor: ({ isRemoved }: IStyle) =>
      isRemoved ? '#ff2f2f' : 'unset',
  },
  img: {
    width: 200,
    height: '100%',
    border: '1px solid #100113',
  },
  user: {
    width: 400,
    height: '100%',
    border: '1px solid #100113',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: 'none',
    '&>div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      paddingLeft: 16,
    },
    '&>div:first-child': {
      borderBottom: '1px solid #100113',
      height: 40,
      '& p': {
        fontWeight: 600,
      },
    },
    '&>div:last-child': {
      flexGrow: 1,
    },
  },
  transaction: {
    flexGrow: 1,
    border: '1px solid #100113',
    borderLeft: 'none',
    display: 'flex',
    flexDirection: 'column',
    '&>div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      paddingLeft: 16,
    },
    '&>div:first-child': {
      borderBottom: '1px solid #100113',
      flexDirection: 'row',
      alignItems: 'center !important',
      justifyContent: 'flex-start',
      height: 40,
      '& p': {
        fontWeight: 600,
      },
    },
    '&>div:last-child': {
      flexGrow: 1,
    },
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    border: '1px solid #100113',
    color: ({ isRemoved }: IStyle) => (isRemoved ? 'white' : 'red'),
    marginRight: 20,
    fontWeight: 600,
    textTransform: 'none',
    padding: '0px 12px',
  },
  link: {
    marginLeft: 4,
    maxWidth: 330,
  },
}));
