/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { INTERVAL_VALUE } from 'common/constant';
import CompatibleWebsite from 'components/CompatibleWebsite';
import ParseNFTInput from 'components/ParseNFTInput';
import PreviewNFT from 'components/PreviewNFT';
import { NFTsActionTypeEnum } from 'enums/actions';
import ArrowForward from 'icons/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ayncTaskResetAction } from 'store/actions/asyncTaskActions';
import {
  getNFTPreviewFailureAction,
  getPriceNFTBaseOnDollarAction,
  resetNFTPreviewAction,
} from 'store/actions/nftActions';
import { getNFTPreview, sTaskStatus } from 'store/selectors';
import BackComponent from 'components/common/BackComponent';
import EstimateNFT from './EstimateNFT';
import secureStorage from 'utils/secureStorage';
import { SecureStorageEnum } from 'enums/auth';
import PlaceholderLoader from 'components/common/PlacehoderLoader';
import AlertMessage from 'components/AlertMessage';
import { isMarketSupportSoon, validateLinkNFT } from 'utils/validateAddNFT';
import useTitle from 'hooks/useTitle';

const AddNFT = () => {
  const dispatch = useDispatch();
  const [estimates, setEstimates] = useState<boolean>(false);
  const [parseLinkPress, setParseLinkPress] = useState<boolean>(false);

  const classes = useStyles();

  const history = useHistory<{ from: string }>();
  const state = history.location.state;

  const nftPreview = useSelector(getNFTPreview);
  const nftPreviewStatus = useSelector(
    sTaskStatus(NFTsActionTypeEnum.GET_NFT_PREVIEW),
  );

  console.log(nftPreviewStatus);
  const messageError = useSelector(
    sTaskStatus(NFTsActionTypeEnum.GET_NFT_PREVIEW),
  )?.error?.data?.message;

  const isLoading = nftPreviewStatus?.processing;
  const [link, setLink] = useState<string>(nftPreview?.originalUrl || '');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (nftPreview || nftPreviewStatus?.error) {
      dispatch(resetNFTPreviewAction());
    }

    setLink(event.target.value);
    setParseLinkPress(false);
  };
  const handleCancel = useCallback(() => {
    dispatch(getNFTPreviewFailureAction());
    setLink('');
    setParseLinkPress(false);
  }, [dispatch, setLink]);

  const handleEstimateCancel = useCallback(() => {
    if (!state) setEstimates(false);
    else {
      if (history.location.state.from === 'user-page') {
        history.goBack();
      }
    }
  }, [setEstimates, state]);

  const handleNext = useCallback(() => {
    setEstimates(true);
    history.push('add-nft');
  }, [setEstimates]);

  const handleBack = useCallback(() => {
    if (!state) history.goBack();
    else {
      if (history.location.state.from === 'user-page') {
        history.push('/user');
      }
    }
  }, [dispatch, state]);

  const getPriceNFT = useCallback(() => {
    dispatch(getPriceNFTBaseOnDollarAction());
  }, [dispatch]);

  useEffect(() => {
    getPriceNFT();
    const timerId = setInterval(getPriceNFT, INTERVAL_VALUE);
    return () => {
      clearInterval(timerId);
    };
  }, [getPriceNFT]);

  useEffect(() => {
    if (nftPreview?.shouldEstimate) {
      setEstimates(true);
    }
  }, [nftPreview, setEstimates]);

  useEffect(() => {
    return () => {
      dispatch(getNFTPreviewFailureAction());
      dispatch(ayncTaskResetAction(NFTsActionTypeEnum.GET_NFT_PREVIEW));
    };
  }, [dispatch]);

  // detect back button browser
  useEffect(() => {
    window.onpopstate = function () {
      if (estimates) setEstimates(false);
    };
  }, [estimates]);

  // refresh page
  useEffect(() => {
    const addNFTStatus = JSON.parse(
      secureStorage.getItemSS(SecureStorageEnum.ADD_NFT_STATUS) || 'null',
    );
    if (addNFTStatus) {
      setEstimates(addNFTStatus.estimates);
      setLink(addNFTStatus.link);
    }
  }, []);

  useEffect(() => {
    return () => {
      secureStorage.removeItemSS(SecureStorageEnum.ADD_NFT_STATUS);
      secureStorage.removeItemSS(SecureStorageEnum.NFT_TO_ESTIMATE);
    };
  }, []);

  useEffect(() => {
    secureStorage.setItemSS(
      SecureStorageEnum.ADD_NFT_STATUS,
      JSON.stringify({
        estimates,
        link,
      }),
    );
  }, [estimates, link]);

  useEffect(() => {
    secureStorage.setItemSS(
      SecureStorageEnum.NFT_TO_ESTIMATE,
      JSON.stringify(nftPreview),
    );
  }, [nftPreview]);

  const errorParseNFT = useMemo(() => {
    if (nftPreviewStatus?.error) return true;
    if (nftPreview) return false;
    return undefined;
  }, [nftPreviewStatus, nftPreview]);

  const renderNFTPreview = useMemo(() => {
    if (!validateLinkNFT(link) && parseLinkPress) {
      return isMarketSupportSoon(link) ? (
        <AlertMessage
          textClass={classes.backgroundYellow}
          className={classes.nosupportMsg}
          message={
            'Links from this marketplace not currently supported. Please try again soon.'
          }
        />
      ) : (
        <AlertMessage
          textClass={classes.invalidLinkMsg}
          className={classes.backgroundMsg}
          message={
            'The URL you  entered is not valid, please confirm and refresh.'
          }
        />
      );
    }

    if (nftPreview) {
      return <PreviewNFT data={nftPreview} estimates={estimates} link={link} />;
    }

    if (nftPreviewStatus?.error) {
      return (
        <AlertMessage
          message={
            messageError === 'no support'
              ? 'OpenSea Solana, Polygon, and Klaytn links not currently supported.'
              : 'Momentary issue fetching data. Keep refreshing to try again.'
          }
        />
      );
    }

    return null;
  }, [nftPreview, nftPreviewStatus, classes, estimates, link, parseLinkPress]);

  useTitle('Add NFT | NFT AdvertiseX');

  return (
    <>
      <Box className={classes.container}>
        <BackComponent
          onClick={estimates ? handleEstimateCancel : handleBack}
        />
        {estimates ? (
          <EstimateNFT setEstimate={handleEstimateCancel}>
            <Box>
              <Typography className={classes.linkTitle}>
                Paste your NFT listing URL
              </Typography>
              <ParseNFTInput
                value={link}
                error={errorParseNFT}
                onChange={handleChange}
                placeholder="OpenSea, LooksRare, Solanart, Magic Eden etc."
                className={classes.parseInput}
                disabled
                setLink={setLink}
                refresh
                borderNone
              />
              {isLoading ? (
                <PlaceholderLoader className={classes.placeholderLoader} />
              ) : (
                renderNFTPreview
              )}
            </Box>
          </EstimateNFT>
        ) : (
          <Box className={classes.main}>
            <Box className={classes.content}>
              <Typography>Add your NFTs from $0.</Typography>
              <Typography>
                Add NFT links from OpenSea, LooksRare, Magic Eden & more. No
                commissions or hidden fees.
              </Typography>
            </Box>
            <Box className={classes.parseLink}>
              <Typography>Paste your NFT listing URL</Typography>
              <ParseNFTInput
                value={link}
                error={errorParseNFT}
                onChange={handleChange}
                placeholder="OpenSea, LooksRare, Solanart, Magic Eden etc."
                setLink={setLink}
                pasreLinkPress={(press: boolean) => {
                  setParseLinkPress(press);
                }}
              />
              {isLoading ? (
                <PlaceholderLoader className={classes.placeholderLoader} />
              ) : (
                renderNFTPreview
              )}
            </Box>
          </Box>
        )}
        {!estimates && nftPreview && (
          <Box className={classes.confirm} id={'confirm-estimate'} hidden>
            <Button onClick={handleCancel}>
              <Typography>CANCEL</Typography>
            </Button>
            <Button onClick={handleNext}>
              <Typography>NEXT</Typography>
              <ArrowForward color="#FFFFFF" />
            </Button>
          </Box>
        )}
        {!estimates && (
          <Grid container spacing={2} className={classes.compatibleWebsite}>
            {markets.map((v) => (
              <CompatibleWebsite
                link={v.link}
                logoUrl={v.logoUrl}
                key={v.name}
              />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default AddNFT;

const markets = [
  {
    name: 'Opensea',
    link: 'https://opensea.io/',
    logoUrl: 'images/OpenSea.png',
  },
  {
    name: 'Looksrare',
    link: 'https://looksrare.org/',
    logoUrl: 'images/lastLooksrare.png',
  },
  {
    name: 'Magiceden',
    link: 'https://magiceden.io/',
    logoUrl: 'images/ME_Full_Gradient.png',
  },
];
const useStyles = makeStyles((theme) => ({
  container: {},
  main: {
    padding: '52px 174px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 60,
    [theme.breakpoints.down('md')]: {
      padding: '40px 0px',
      borderBottom: '1px solid #100113',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  content: {
    maxWidth: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      maxWidth: 340,
    },
    '& p:nth-child(1)': {
      color: '#000000',
      fontWeight: 700,
      fontSize: 42,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        fontSize: 32,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
    '& p:nth-child(2)': {
      color: '#000000',
      fontWeight: 300,
      fontSize: 24,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
      },
    },
  },
  parseLink: {
    flexGrow: 1,
    paddingBottom: 24,
    height: 'fit-content',
    borderBottom: '1px solid #100113',
    '&>p': {
      fontSize: 14,
      marginBottom: 16,
    },
    maxWidth: '50%',
    marginLeft: 103,
    [theme.breakpoints.down('md')]: {
      borderBottom: 'none',
      marginLeft: 24,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
      marginLeft: 0,
      maxWidth: '100%',
    },
  },
  compatibleWebsite: {
    padding: '0px 174px',
    marginTop: 28,
    marginBottom: 76,
    [theme.breakpoints.down('md')]: {
      padding: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  confirm: {
    marginBottom: 72,
    marginTop: 8,
    width: '100%',
    height: 'fit-content',
    padding: '0px 174px',
    // display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
      marginTop: 40,
      marginBottom: 52,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 32,
    },
    '& p': {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.015em',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        lineHeight: 12,
      },
    },
    '& button': {
      width: 130,
      height: 60,
      [theme.breakpoints.down('sm')]: {
        height: 44,
        width: 101,
      },
    },
    '& button:nth-child(1)': {
      '& p': {
        color: '#6F6BC5',
      },
    },
    '& button:nth-child(2)': {
      backgroundColor: '#6F6BC5',
      '& p': {
        color: '#FFFFFF',
        marginRight: 8,
      },
      '& svg': {
        [theme.breakpoints.down('sm')]: {
          height: 16,
          width: 16,
        },
      },
    },
  },
  linkTitle: {
    color: '#100113',
  },
  parseInput: {
    marginTop: 16,
    marginBottom: 40,
    border: '1px solid #100113',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 32,
    },
    '&>input': {
      color: '#100113',
      fontWeight: 400,
      fontSize: 14,
    },
  },
  placeholderLoader: {
    height: 246,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('md')]: {
      height: 163,
    },
    '& span': {
      width: 40,
    },
  },
  snackAlert: {
    '& div': {
      width: 'unset',
      [theme.breakpoints.up('lg')]: {
        left: '65%',
      },
    },
  },
  invalidLinkMsg: {
    color: '#ED5050 !important',
  },
  backgroundMsg: {
    backgroundColor: '#FFF0F0',
  },

  backgroundYellow: {
    backgroundColor: '#FFEDD9',
  },

  nosupportMsg: {
    color: '#B16006 !important',
  },
}));
