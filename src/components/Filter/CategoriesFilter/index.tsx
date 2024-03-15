import React, { useCallback } from 'react';
import { Box, CardMedia, IconButton, Typography } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { DataCategories } from 'types/categories';
import CloseIcon from 'icons/CloseIcon';
import {
  getBlockCategoriesAction,
  resetBlockCategoriesAction,
} from 'store/actions/blockCategoriesAction';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';
import { updateFilterAction } from 'store/actions/filterActions';
import { getFilterState } from 'store/selectors';

interface ICategoriesFilter {
  value: DataCategories;
}
function CategoriesFilter({ value }: ICategoriesFilter) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const filter = useSelector(getFilterState, shallowEqual);

  const isSelect = filter.categories[0] === value.name;

  const onSelect = useCallback(() => {
    dispatch(
      updateFilterAction({
        categories: [value.name],
        blockNumber: undefined,
        blockCategory: undefined,
        collectionIds: [],
      }),
    );
    // reset data block img categories
    dispatch(resetBlockCategoriesAction());
    // get new data block img categories
    if (value.name !== 'NFT') {
      dispatch(getBlockCategoriesAction({ category: value.name }));
    }
    history.push(`/${value.name.toLowerCase()}`);
  }, [dispatch, value, history]);

  const onRemove = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      if (value.name !== 'NFT') {
        dispatch(
          updateFilterAction({
            categories: ['NFT'],
            blockNumber: undefined,
            blockCategory: undefined,
          }),
        );
        dispatch(resetBlockCategoriesAction());
        history.push('/nft');
      }
    },
    [dispatch, history, value.name],
  );

  return (
    <Box
      className={clsx(classes.main, {
        [classes.selectedBackgroundColor]: isSelect,
      })}
      onClick={onSelect}
    >
      <Box display="flex">
        <CardMedia
          image={value.icon}
          style={{
            height: 16,
            width: 16,
            borderRadius: 8,
            marginRight: 16,
          }}
        />
        <Typography>{`/${value.name}`}</Typography>
      </Box>
      <Box className={classes.wrapClose}>
        <span className={classes.textItem}>{value?.totalItem.value}</span>
        {isSelect && (
          <IconButton onClick={onRemove}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default CategoriesFilter;
