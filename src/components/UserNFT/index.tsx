import React, { useCallback, useMemo } from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import DetailNFT from 'components/Results1001/DetailNFT';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { getMyNFTsAction } from 'store/actions/nftActions';
import { NFT } from 'types/nft';

interface IProps {
  nfts: NFT[];
  nftPagination: any;
}

const UserNFTs = ({ nfts, nftPagination }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();

  const hasMore = useMemo(() => {
    return (
      nftPagination.pageNumber * nftPagination.pageSize < nftPagination.total
    );
  }, [nftPagination.pageNumber, nftPagination.pageSize, nftPagination.total]);

  const getTemplateColumns = useCallback(() => {
    if (isDesktop) {
      return 'repeat(6, minmax(0, 1fr))';
    }
    if (isTablet) {
      return 'repeat(4, minmax(0, 1fr))';
    }
    return 'repeat(2, minmax(0, 1fr))';
  }, [isDesktop, isTablet]);

  const loadMoreNFTs = useCallback(() => {
    dispatch(
      getMyNFTsAction({
        pageNumber: nftPagination.pageNumber + 1,
        pageSize: nftPagination.pageSize,
        filterBy: 'Recently Added',
      }),
    );
  }, [dispatch, nftPagination]);

  return (
    <InfiniteScroll
      dataLength={nfts.length}
      next={loadMoreNFTs}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      scrollThreshold={0.7}
      className={classes.main}
      style={{ gridTemplateColumns: getTemplateColumns() }}
    >
      {nfts.map((d, index) => (
        <div key={index} className={classes.nftItemContainer}>
          <DetailNFT
            key={d.id}
            isExpand={false}
            isGrid4x4={true}
            id={d.id}
            possess
            isDeadzone={Number(d.position) > 1001}
            isProfile
          />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default UserNFTs;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    overflowY: 'scroll',
    padding: 46,
    gap: 16,
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 16,
    },
  },
  nftItemContainer: {
    position: 'relative',
  },
}));
