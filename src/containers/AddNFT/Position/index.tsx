import React, { useState, useMemo, memo, useCallback } from 'react';
import { Grid, Box, Avatar, useMediaQuery, useTheme } from '@material-ui/core';
import { CategoryWithinParsedLink } from 'types/category';
import { useStyles } from './styles';
import clsx from 'clsx';
import PlusIcon from 'icons/PlusIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import CloseIcon from 'icons/CloseIcon';
import SelectPositionComponent, {
  SelectPositionComponentTypeEnum,
} from 'components/common/SelectPositionComponent';
import { CategoriesName } from 'enums/categories';
import { MAX_NOT_DEAD_ZONE_POSITION } from 'common/constant';

export interface IPosition {
  categories: CategoryWithinParsedLink[];
  className?: string;
  label?: string;
  onChange: (category: string, position?: string) => void;
  onDelete: (name: string) => void;
}

const Position = (props: IPosition) => {
  const { categories, label, onChange, onDelete } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();
  const [isExpand, setIsExpand] = useState(false);
  const [focusedCategory, setFocusedCategory] = useState<string | undefined>();

  const handleExpand = useCallback(() => {
    setIsExpand(!isExpand);
  }, [isExpand]);

  const [defaultCategories, remainingCategories] = useMemo(() => {
    const defaultCat = categories.filter(
      (cat, index) => cat.name === 'NFT' || index === 1,
    );

    const remainingCat = categories.filter(
      (cat, index) => cat.name !== 'NFT' && index !== 1,
    );

    return [defaultCat, remainingCat];
  }, [categories]);

  const CollapsedCategories = useMemo(() => {
    if (isExpand) return null;
    return (
      <>
        {defaultCategories.map((cat) => (
          <Box
            className={clsx(
              classes.defaultCatItem,
              classes.notLastDefaultCateItem,
            )}
            key={cat.name}
          >
            <Box>
              <Avatar src={cat.imgUrl} className={classes.avatar} />
            </Box>
            <Box className={classes.defaultCatName}>{cat.name}</Box>
            <Box className={classes.defaultCatNumberItem}>
              #{cat?.position || 1}
            </Box>
          </Box>
        ))}
        {remainingCategories.length > 0 && (
          <Box className={classes.countRemainingCat}>
            <PlusIcon />
            &nbsp;&nbsp;&nbsp;
            {remainingCategories.length}
          </Box>
        )}
      </>
    );
  }, [defaultCategories, classes, isExpand, remainingCategories]);

  const rennderLabel = useMemo(() => {
    return (
      label && (
        <Grid container item xs={12} className={classes.label}>
          {label}
        </Grid>
      )
    );
  }, [label, classes]);

  const ExpandedCategories = useMemo(() => {
    if (!isExpand) return null;

    return (
      <Grid container item xs={12}>
        <Grid container item className={classes.header}>
          <Grid item className={clsx(classes.fontStyle, classes.pathLabel)}>
            /...
          </Grid>
          <Grid item className={clsx(classes.fontStyle, classes.positionLabel)}>
            Position
          </Grid>
        </Grid>
        {categories.map((cat) => {
          const isFocused = cat.name === focusedCategory;
          const isDeadZonePosition = !!(
            cat.position && cat.position > MAX_NOT_DEAD_ZONE_POSITION
          );

          let backgroundColor: string = 'unset';
          if (isDeadZonePosition) {
            backgroundColor = '#FEFCF6';
          } else if (isFocused) {
            backgroundColor = '#F3F3FA';
          }

          return (
            <Grid
              container
              item
              className={clsx(classes.catItem)}
              style={{ backgroundColor }}
              key={cat.name}
            >
              <Grid item className={classes.catAvatar}>
                <Avatar src={cat.imgUrl} className={classes.avatarInList} />
              </Grid>
              <Grid item className={classes.catName}>
                /{cat.name}
              </Grid>
              <Grid item className={classes.position}>
                <SelectPositionComponent
                  name={cat.name}
                  value={cat.position?.toString()}
                  range={[1, undefined]}
                  step={1}
                  placeholder="1"
                  type={SelectPositionComponentTypeEnum.DECIMAL}
                  reverse={true}
                  currentMaxValue={cat.totalItem}
                  isFocused={isFocused}
                  isDeadZonePosition={isDeadZonePosition}
                  setFocusedCategory={setFocusedCategory}
                  onChange={onChange}
                />
              </Grid>
              <Grid item className={classes.closeIconContainer}>
                {cat.name !== CategoriesName.NFT && (
                  <Box
                    className={classes.closeIcon}
                    onClick={() => onDelete(cat.name)}
                  >
                    <CloseIcon color="#B3AEB4" width={17} height={16} />
                  </Box>
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  }, [
    categories,
    classes,
    isExpand,
    focusedCategory,
    setFocusedCategory,
    onChange,
    onDelete,
  ]);

  return (
    <Grid container className={clsx({ [classes.tableMobile]: !isDesktop })}>
      {rennderLabel}
      <Grid
        container
        item
        xs={12}
        className={clsx(classes.noWrapContainer, {
          [classes.expandedMenu]: isExpand,
        })}
        onClick={handleExpand}
      >
        <Grid container item className={classes.noWrapContainer} xs={11}>
          {CollapsedCategories}
        </Grid>
        <Grid
          container
          item
          className={clsx(classes.arrowDownIconOutnerContainer, {
            [classes.upArrow]: isExpand,
          })}
          xs={1}
        >
          <Box className={classes.arrowDownIconInnnerContainer}>
            <ArrowDownIcon width={12} height={7} />
          </Box>
        </Grid>
      </Grid>
      {ExpandedCategories}
    </Grid>
  );
};

export default memo(Position);
