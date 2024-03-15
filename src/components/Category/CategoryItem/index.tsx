import React, { memo, useMemo } from 'react';
import { Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import BlackEthIcon from 'assets/blackEthIcon.svg';
import WhiteEthIcon from 'assets/whiteEthIcon.svg';
import { useStyles } from './styles';
import { DataCategories } from 'types/categories';
import { OptionItem } from 'components/common/MenuComponent';
import { CategorySortOptions } from 'enums/categories';
import { convertSecondsToWeeks } from 'common/helper';
import IconItem from 'assets/items-icon.png';

interface ICategoryItemProps {
  data: DataCategories;
  index: number;
  widthOfColumn?: number;
  sortOption: OptionItem;
}

const CategoryItem = (props: ICategoryItemProps) => {
  const { data, widthOfColumn, sortOption } = props;
  const classes = useStyles();

  const isBlackImg = useMemo(() => {
    return data.mode === 'dark';
  }, [data]);

  const ethIcon = useMemo(() => {
    return !isBlackImg ? WhiteEthIcon : BlackEthIcon;
  }, [isBlackImg]);

  const withOfNameElem = useMemo(() => {
    if (widthOfColumn && widthOfColumn > 16) return `${widthOfColumn - 16}px`;
    return '100%';
  }, [widthOfColumn]);

  const [secondLabel, secondValue, secondIcon] = useMemo(() => {
    const ownerIcon = '/images/OwnersIcon.png';
    const firstPlaceIcon = '/images/FirstPlaceIcon.png';
    const lastPlaceIcon = '/images/LastPlaceIcon.png';
    const collectionIcon = '/images/CollectionsIcon.png';
    const timeLeftIcon = '/images/TimeLeftIcon.png';

    const ownerLabel = data.totalOwner.value === 1 ? 'Owner' : 'Owners';
    const collectionLabel =
      Number(data.totalCollection) === 1 ? 'Collection' : 'Collections';

    if (sortOption.key === CategorySortOptions.TOTAL_ITEMS) {
      return [ownerLabel, data.totalOwner.value, ownerIcon];
    } else if (sortOption.key === CategorySortOptions.TOTAL_OWNERS) {
      return [ownerLabel, data.totalOwner.value, ownerIcon];
    } else if (sortOption.key === CategorySortOptions.TOTAL_COLLECTIONS) {
      return [collectionLabel, data.totalCollection, collectionIcon];
    } else if (sortOption.key === CategorySortOptions.FIRST_PLACE) {
      return [
        'First place',
        `$${data.firstPlace.value.toFixed(2)}`,
        firstPlaceIcon,
      ];
    } else if (sortOption.key === CategorySortOptions.LAST_PLACE) {
      return [
        'Last place',
        `$${data.lastPlace.value.toFixed(2)}`,
        lastPlaceIcon,
      ];
    } else if (sortOption.key === CategorySortOptions.ALL_TIME_VOLUME) {
      return ['All time volume', data.allTimeVolume.value.toFixed(4), ethIcon];
    } else if (sortOption.key === CategorySortOptions.LAST_24_HOURS) {
      return ['24H volume', data._24hVolume.value.toFixed(4), ethIcon];
    } else if (sortOption.key === CategorySortOptions.FLOOR_PRICE) {
      return ['Floor price', data.floorPrice?.toFixed(4) || 0, ethIcon];
    } else if (sortOption.key === CategorySortOptions.TIME_LEFT) {
      return [
        'Weeks left',
        convertSecondsToWeeks(data.totalTimeLeft),
        timeLeftIcon,
      ];
    } else {
      return [ownerLabel, data.totalOwner.value, ownerIcon];
    }
  }, [sortOption.key, data, ethIcon]);

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${data.imgUrl})` }}
    >
      {data.name === 'CRYPTODICKBUTTS' && (
        <video
          className={classes.videoBackground}
          src={data.imgUrl}
          loop
          autoPlay
        ></video>
      )}
      <div className={classes.header}>
        <Typography
          className={clsx(classes.name, {
            [classes.whiteText]: isBlackImg,
            [classes.blackText]: !isBlackImg,
          })}
          style={{ width: withOfNameElem }}
        >
          {`/${data.name}`}
        </Typography>
        <Typography
          className={clsx(classes.description, {
            [classes.whiteText]: isBlackImg,
            [classes.blackText]: !isBlackImg,
          })}
        >
          {data.description}
        </Typography>
      </div>
      <Grid container className={classes.footer}>
        <Grid
          container
          className={clsx(classes.label, {
            [classes.whiteBgColor]: isBlackImg,
            [classes.blackBgColor]: !isBlackImg,
          })}
        >
          <Grid className={classes.icon}>
            <img src={IconItem} alt="" className={classes.iconItem} />
          </Grid>
          <Grid
            className={clsx(classes.content, {
              [classes.whiteText]: !isBlackImg,
              [classes.blackText]: isBlackImg,
            })}
          >
            {data.totalItem.value}
          </Grid>
          <Grid
            className={clsx(classes.textLabel, {
              [classes.whiteText]: !isBlackImg,
              [classes.blackText]: isBlackImg,
            })}
          >
            {data.totalItem.value === 1 ? 'Item' : 'Items'}
          </Grid>
        </Grid>
        <Grid
          container
          className={clsx(classes.label, {
            [classes.whiteBgColor]: isBlackImg,
            [classes.blackBgColor]: !isBlackImg,
          })}
        >
          <Grid className={classes.icon}>
            <img src={secondIcon} alt="" className={classes.secondIcon} />
          </Grid>
          <Grid
            className={clsx(classes.content, {
              [classes.whiteText]: !isBlackImg,
              [classes.blackText]: isBlackImg,
            })}
          >
            {secondValue}
          </Grid>
          <Grid
            className={clsx(classes.textLabel, {
              [classes.whiteText]: !isBlackImg,
              [classes.blackText]: isBlackImg,
            })}
          >
            {secondLabel}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(CategoryItem);
