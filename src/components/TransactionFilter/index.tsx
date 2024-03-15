import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './style';
import { getTransactionAction } from 'store/actions/transactionActions';

interface transactionSearchParam {
  txId?: string;
  collection?: string;
  nftName?: string;
  walletAddress?: string;
  status?: boolean;
}

enum tranStatus {
  SUCCESS = 'Success',
  FAIL = 'Fail',
}

function TransactionsFilter() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [txId, setTxId] = useState<string | undefined>(undefined);
  const [collection, setCollection] = useState<string | undefined>(undefined);
  const [nftName, setNftNAme] = useState<string | undefined>(undefined);
  const [walletAddress, setWallAddress] = useState<string | undefined>(
    undefined,
  );
  const [status, setTranStatus] = useState<boolean | undefined>(undefined);

  const searchParam: transactionSearchParam = {
    txId,
    collection,
    nftName,
    walletAddress,
    status,
  };

  const handleSearch = () => {
    dispatch(
      getTransactionAction({
        pageNumber: 1,
        pageSize: 20,
        ...searchParam,
      }),
    );
  };

  const handleReset = () => {
    setTxId(undefined);
    setCollection(undefined);
    setNftNAme(undefined);
    setWallAddress(undefined);
    setTranStatus(undefined);
    dispatch(
      getTransactionAction({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  };

  const transactionStatus = useMemo(() => {
    switch (status) {
      case true:
        return tranStatus.SUCCESS;
      case false:
        return tranStatus.FAIL;
      default:
        return '';
    }
  }, [status]);

  return (
    <div className={classes.container}>
      <div>
        <label htmlFor="transaction">Transaction Id</label>
        <input
          id="transaction"
          onChange={(e) => setTxId(e.target.value)}
          value={txId === undefined ? '' : txId}
        ></input>
      </div>
      <div>
        <label htmlFor="collection">Collection name</label>
        <input
          id="collection"
          onChange={(e) => setCollection(e.target.value)}
          value={collection || ''}
        ></input>
      </div>
      <div>
        <label htmlFor="nftNAme">Nft name</label>
        <input
          id="nftNAme"
          onChange={(e) => setNftNAme(e.target.value)}
          value={nftName || ''}
        ></input>
      </div>
      <div>
        <label htmlFor="walletAddress">Wallet address </label>
        <input
          id="walletAddress"
          onChange={(e) => setWallAddress(e.target.value)}
          value={walletAddress || ''}
        ></input>
      </div>
      <div>
        <label htmlFor="transactionStatus">Transaction status</label>
        <select
          id="transactionStatus"
          onChange={(e) => {
            setTranStatus(e.target.value === tranStatus.SUCCESS ? true : false);
          }}
          value={transactionStatus}
        >
          <option value={undefined}>{undefined}</option>
          <option value={tranStatus.SUCCESS}>{tranStatus.SUCCESS}</option>
          <option value={tranStatus.FAIL}>{tranStatus.FAIL}</option>
        </select>
      </div>
      <button className={classes.button} onClick={handleSearch}>
        Search
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default TransactionsFilter;
