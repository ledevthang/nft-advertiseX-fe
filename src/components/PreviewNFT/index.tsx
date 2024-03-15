import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Grid, Avatar, CardMedia } from '@material-ui/core';
import clsx from 'clsx';
import { convertWeiToEth, roundValue } from 'common/helper';
import PlaceholderLoader from 'components/common/PlacehoderLoader';
import { EChain } from 'enums/filter';
import Polygon from 'icons/Polygon';
import Solana from 'icons/Solana';
import VerifiedIcon from 'icons/VerifiedIcon';
import nftPriceService from 'services/priceNFTs';
import { MarketPlace, NFT } from 'types/nft';
import { numberWithCommas } from 'utils/formatNumber';
import { nftStatusEnum } from 'types/nft';
import { CRYPTOCOMPARE_API_URL, CRYPTO_SOL_API_URL } from 'common/constant';
import { useStyles } from './styles';
import PlusIcon from 'icons/PlusIcon';
import EthIconNew from 'icons/EthIconNew';
import { Link } from 'react-router-dom';

interface IPreviewNFT {
  data: NFT;
  estimates: boolean;
  link?: string;
}

const PreviewNFT = ({ data, estimates }: IPreviewNFT) => {
  const classes = useStyles({ estimates });
  const [priceInDollar, setPriceInDollar] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isShowAllCategory, setIsShowAllCategory] = useState(false);

  useEffect(() => {
    if (!data.price) return;
    if (data.chain === EChain.ETHEREUM)
      nftPriceService
        .GetEtherPriceBaseOnDollars(CRYPTOCOMPARE_API_URL)
        .then((dataConvert) => {
          setPriceInDollar(
            roundValue(
              convertWeiToEth(data.price || 0) * Number(dataConvert.USD),
              2,
            ),
          );
        });
    if (data.chain === EChain.SOLANA)
      nftPriceService
        .GetEtherPriceBaseOnDollars(CRYPTO_SOL_API_URL)
        .then((dataConvert) => {
          setPriceInDollar(
            roundValue((data.price || 0) * Number(dataConvert.USD), 2),
          );
        });
  }, [data.price, data.chain]);

  const unlistedNFT = useMemo(() => {
    if (!data.price) return true;
    const status = Object.values(nftStatusEnum);

    if (status.includes(data.status)) return false;
    return true;
  }, [data.status, data.price]);

  const statusDisplay = useMemo(() => {
    switch (data.status) {
      case nftStatusEnum.BEST_OFFER:
        return nftStatusEnum.BEST_OFFER;
      case nftStatusEnum.MIN_BID:
        return nftStatusEnum.MIN_BID;
      case nftStatusEnum.TOP_BID:
        return nftStatusEnum.TOP_BID;
      case nftStatusEnum.PRICE:
        return 'Listing price';
      default:
        return 'Listing price';
    }
  }, [data.status]);

  const collectionName = useMemo(() => {
    if (data.marketplace === MarketPlace.MAGICEDEN) {
      const decode = data.collection.name.split('_');
      return decode.map((str) => str[0].toUpperCase() + str.slice(1)).join(' ');
    }
    return data.collection.name;
  }, [data.collection.name, data.marketplace]);

  const metadata = useMemo(() => {
    const metadata = JSON.parse(data.metadata || '{}');
    return metadata;
  }, [data]);

  const onLoad = () => {
    const nextBtn = document.getElementById('confirm-estimate');
    if (nextBtn) {
      nextBtn.removeAttribute('hidden');
      nextBtn.style.display = 'flex';
    }
    setLoaded(true);
  };

  const price = useMemo(() => {
    if (data.chain === EChain.ETHEREUM)
      return numberWithCommas(convertWeiToEth(data.price || 0));
    if (data.chain === EChain.SOLANA) return numberWithCommas(data.price || 0);
  }, [data.chain, data.price]);

  const renderChainIcon = useMemo(() => {
    switch (data.chain) {
      case EChain.ETHEREUM:
        return <EthIconNew width={20} height={18} />;
      case EChain.POLYGON:
        return <Polygon />;
      case EChain.SOLANA:
        return <Solana width={20} height={15} />;
    }
  }, [data.chain]);

  const [defaultCategories, remainingCategories] = useMemo(() => {
    if (!data.categories || data.categories.length === 0) {
      return [];
    }

    const defaultCat = data.categories.filter(
      (cat, index) => cat.name === 'NFT' || index === 1,
    );
    const remainingCat = data.categories.filter(
      (cat, index) => cat.name !== 'NFT' && index !== 1,
    );
    return [defaultCat, remainingCat];
  }, [data.categories]);

  const DefaultCategories = useMemo(() => {
    if (!defaultCategories || defaultCategories.length === 0) return null;

    return (
      <Grid container className={classes.defaultCatContainer}>
        {defaultCategories.map((cat, index) => (
          <Link
            to={`${cat.name.toLowerCase()}`}
            target="_blank"
            className={clsx(classes.defaultCatItem, {
              [classes.notLastDefaultCateItem]:
                index !== defaultCategories.length - 1,
            })}
          >
            <Box>
              <Avatar src={cat.imgUrl} className={classes.avatar} />
            </Box>
            <Box className={classes.defaultCatName}>/{cat.name}</Box>
          </Link>
        ))}
      </Grid>
    );
  }, [defaultCategories, classes]);

  const handleShowAllCategory = useCallback(() => {
    console.log('handleShowAllCategory running');
    setIsShowAllCategory(true);
  }, [setIsShowAllCategory]);

  const RemainingCatergories = useMemo(() => {
    if (!remainingCategories || remainingCategories.length === 0) return null;

    return (
      <Grid container className={classes.remainContainer}>
        <Link
          to={`/${remainingCategories[0].name.toLowerCase()}`}
          target="_blank"
          className={clsx(
            classes.remainingCatItem,
            classes.notLastDefaultCateItem,
          )}
        >
          <Box>
            <Avatar
              src={remainingCategories[0].imgUrl}
              className={classes.avatar}
            />
          </Box>
          <Box className={classes.remainingCatName}>
            /{remainingCategories[0].name}
          </Box>
        </Link>
        {!isShowAllCategory
          ? remainingCategories.length - 1 > 0 && (
              <Box
                className={classes.countRemainingCat}
                onClick={handleShowAllCategory}
              >
                <PlusIcon />
                &nbsp;&nbsp;
                {remainingCategories.length - 1}
              </Box>
            )
          : remainingCategories
              .filter((cat, index) => index !== 0)
              .map((cat) => (
                <Link
                  to={`/${cat.name.toLowerCase()}`}
                  target="_blank"
                  className={clsx(
                    classes.remainingCatItem,
                    classes.notLastDefaultCateItem,
                  )}
                >
                  <Box>
                    <Avatar src={cat.imgUrl} className={classes.avatar} />
                  </Box>
                  <Box className={classes.remainingCatName}>/{cat.name}</Box>
                </Link>
              ))}
      </Grid>
    );
  }, [remainingCategories, classes, isShowAllCategory, handleShowAllCategory]);

  const marketLogo = useMemo(() => {
    switch (data.marketplace) {
      case MarketPlace.LOOKSRARE:
        return '/images/looksrare-marketplace-logo.svg';
      case MarketPlace.OPENSEA:
        return '/images/openseaIcon.png';
      case MarketPlace.SOLANART:
        return '/images/solanartIcon.png';
      case MarketPlace.MAGICEDEN:
        return '/images/magiceden.png';
    }
  }, [data.marketplace]);

  return (
    <Box className={classes.main}>
      {!loaded && <PlaceholderLoader className={classes.loader} />}
      <Box className={classes.wrapperLoader}>
        {metadata.ext === 'webm' || metadata.ext === 'mp4' ? (
          <Box className={classes.img}>
            <video
              controls
              preload="auto"
              loop
              playsInline
              className={classes.video}
              onLoad={onLoad}
              onLoadedData={onLoad}
              id="video_id"
            >
              <source
                src={`${data.imageUrl}#t=0.001`}
                type={metadata.contentType}
              />
            </video>
          </Box>
        ) : (
          <img
            className={classes.img}
            src={data.imageUrl}
            onLoad={onLoad}
            alt=""
          />
        )}
        <CardMedia image={marketLogo} className={classes.marketLogo} />
      </Box>
      <Box className={classes.wrapper}>
        <Box className={classes.collection}>
          <Typography className={clsx(classes.collectionName)}>
            {collectionName}
            {data.collection.isVerified && (
              <span className={classes.verifyIcon}>
                <VerifiedIcon color="#6BC96B" />
              </span>
            )}
          </Typography>
        </Box>
        <Typography className={clsx(classes.tokenId)}>
          {data.nftName}
        </Typography>
        <Typography className={classes.label}>{statusDisplay}</Typography>
        {!unlistedNFT ? (
          <Box className={classes.price}>
            {renderChainIcon}
            <Box>
              <Typography className={classes.priceValue}>{price}</Typography>
            </Box>
            <Typography>
              {data.price && `$${numberWithCommas(priceInDollar)}`}
            </Typography>
          </Box>
        ) : (
          <Typography className={classes.unlisted}>Unlisted</Typography>
        )}
        {!estimates && (DefaultCategories || RemainingCatergories) && (
          <Box className={classes.categories}>
            {DefaultCategories}
            {RemainingCatergories}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PreviewNFT;
