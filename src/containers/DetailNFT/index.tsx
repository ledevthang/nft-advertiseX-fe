/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Back from 'components/Back';
import DetailNFT from 'components/Results1001/DetailNFT';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNFTDetail, getSysMessage } from 'store/selectors';
import { getNFTDetailAction } from 'store/actions/nftActions';
import { updateSysMessageAction } from 'store/actions/systemMessageActions';

const DetailNFTPage = () => {
  const params = useParams<{ nftId: string }>();
  const nft = useSelector(getNFTDetail);
  const sysMessage = useSelector(getSysMessage);
  const dispatch = useDispatch();
  const classes = useStyles({ isSuccess: sysMessage.status == 'success' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(
      getNFTDetailAction(
        {
          nftId: params.nftId,
        },
        () => {
          setLoaded(true);
        },
      ),
    );
  }, [dispatch, params.nftId]);

  useEffect(() => {
    return () => {
      dispatch(
        updateSysMessageAction({
          open: false,
        }),
      );
    };
  }, []);

  return (
    <Box className={classes.container}>
      <Back disableBtnLabel label="NFT Details" />
      <Box className={classes.main}>
        {sysMessage.open && (
          <Box className={classes.sysMessage}>
            <Typography>{sysMessage.message}</Typography>
          </Box>
        )}
        <Box>
          {
            nft && loaded && (
              <DetailNFT
                isExpand={false}
                isGrid4x4={true}
                id={nft.id}
                isDetail
                possess
                isDeadzone={Number(nft.position) > 1001}
              />
            )
            // :<NFTDetailSkeleton />
          }
        </Box>
      </Box>
    </Box>
  );
};

export default DetailNFTPage;

const useStyles = makeStyles((theme) => ({
  container: {},
  main: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>div:last-child': {
      width: 338,
      [theme.breakpoints.down('sm')]: {
        width: 252,
        paddingBottom: 40,
        '&>div:nth-child(2)>div:first-child': {
          height: 'calc(100vh - 552px)',
          maxHeight: 170,
        },
      },
    },
  },
  sysMessage: {
    position: 'absolute',
    height: 23,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: ({ isSuccess }: { isSuccess: boolean }) =>
      isSuccess ? '#EAFDF5' : '#FFF0F0',
    '& p': {
      color: ({ isSuccess }: { isSuccess: boolean }) =>
        isSuccess ? '#17C17C' : '#ED5050',
      fontSize: 11,
      marginLeft: 8,
    },
  },
}));
