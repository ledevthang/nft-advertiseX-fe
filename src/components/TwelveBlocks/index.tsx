import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, CardMedia, useTheme, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import RSC from 'react-scrollbars-custom';
import { updateAppStateAction } from 'store/actions/appActions';
import { getAllBlockAction } from 'store/actions/blockActions';
import { updateFilterAction } from 'store/actions/filterActions';
import { initialFilterState } from 'store/reducers/filterReducer';
import {
  getBlocks,
  getBlocksCategories,
  getFilterState,
  scrollState,
} from 'store/selectors';
import TwelveBlockLoading from './TwelveBlockLoading';
import { useStyles } from './styles';
import { useLocation } from 'react-router-dom';
interface ITwelveBlocks {
  toggleDeadzone: (value?: boolean) => void;
  isDeadzone: boolean;
}

const TwelveBlocks = ({ toggleDeadzone, isDeadzone }: ITwelveBlocks) => {
  const blockSelected = useSelector(getFilterState).blockNumber;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isScrolling = useSelector(scrollState);
  const blockCategories = useSelector(getBlocksCategories);
  const location = useLocation();

  const categoryName = location.pathname.replace('/', '').toUpperCase();

  const isFilterByCategory = useMemo(() => {
    return categoryName !== 'NFT';
  }, [categoryName]);

  const classes = useStyles({
    isDeadzone,
    isDesktop,
    isScrolling,
    isFilterByCategory,
  });

  const blocks = useSelector(getBlocks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllBlockAction({
        include12Blocks: false,
      }),
    );
  }, [dispatch]);

  const renderBlock = useCallback(
    (imageUrl) => <CardMedia image={imageUrl} className={classes.img} />,
    [classes],
  );

  // eslint-disable-next-line
  const onChangeBlockSelected = useCallback(
    debounce((id: number, isD?: boolean) => {
      window.positionIds = [];
      if (isFilterByCategory) {
        if (id !== blockSelected) {
          // select block filter
          dispatch(
            updateFilterAction({
              blockNumber: id,
              blockCategory: categoryName,
            }),
          );
        } else {
          // unselect block filter
          dispatch(
            updateFilterAction({
              blockNumber: undefined,
              blockCategory: undefined,
            }),
          );
        }
      } else {
        if (id !== blockSelected) {
          dispatch(
            updateFilterAction({
              blockNumber: id,
              ...(id === 13 && initialFilterState),
            }),
          );
        } else {
          dispatch(
            updateFilterAction({
              blockNumber: undefined,
            }),
          );
        }

        if (isD || isDeadzone) {
          if (blockSelected !== 13) {
            toggleDeadzone(true);
          } else {
            toggleDeadzone(false);
          }
        }
      }
    }, 200),
    [
      blockSelected,
      isDeadzone,
      blockCategories,
      isFilterByCategory,
      categoryName,
    ],
  );

  const onScroll = (scrollValues: any) => {
    const max = scrollValues.scrollWidth - scrollValues.clientWidth;
    const thumb = document.getElementById('12thumb');
    const track = document.getElementById('12track');
    if (!thumb || !track) return;
    if (scrollValues.scrollLeft < 0) {
      thumb.style.transform = 'translateX(0px)';
    } else if (scrollValues.scrollLeft > max) {
      thumb.style.transform = `translateX(${
        track.offsetWidth - thumb.offsetWidth
      }px)`;
    }
  };

  const openScroll = useCallback(
    (e: any) => {
      if (window.scrollY && !window.isScroll) {
        window.isScroll = true;
        dispatch(
          updateAppStateAction({
            isScrolling: true,
          }),
        );
      }
      if (!window.scrollY && window.isScroll) {
        window.isScroll = false;
        dispatch(
          updateAppStateAction({
            isScrolling: false,
          }),
        );
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener('scroll', openScroll);
  }, [openScroll]);

  const renderBlockComponent = useMemo(() => {
    if (isFilterByCategory) {
      if (blockCategories.blockCategories.data.length > 0) {
        return blockCategories?.blockCategories?.data.map((i) => (
          <Box
            key={i.block}
            className={clsx(classes.container, {
              [classes.borderActive]: blockSelected === i.block,
            })}
            onClick={() => onChangeBlockSelected(i.block)}
          >
            {renderBlock(i.imgUrl)}
          </Box>
        ));
      }

      return (
        <TwelveBlockLoading
          filterCategory={true}
          className={classes.container}
        />
      );
    }

    if (blocks.length > 0) {
      return blocks?.map((i, index) => (
        <Box
          key={i.id}
          className={clsx(classes.container, {
            [classes.borderActive]: blockSelected === i.id,
          })}
          onClick={() => onChangeBlockSelected(i.id)}
        >
          {renderBlock(i.imageUrl)}
        </Box>
      ));
    }

    return <TwelveBlockLoading className={classes.container} />;
  }, [
    blockCategories,
    blocks,
    classes,
    onChangeBlockSelected,
    isFilterByCategory,
    blockSelected,
    renderBlock,
  ]);

  return (
    <RSC
      onScroll={onScroll}
      noScrollY
      trackXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className={classes.trackX}
              id="12track"
            />
          );
        },
      }}
      thumbXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className={classes.thumbX}
              id="12thumb"
            />
          );
        },
      }}
      className={clsx(classes.main, {
        [classes.isDeadzone]: isDeadzone,
        [classes.moblieStyle]: isMobile,
        [classes.deadzoneFilter]: isDeadzone && isFilterByCategory,
      })}
    >
      {renderBlockComponent}
      {blocks.length !== 0 && (
        <Box
          className={clsx(classes.deadzone, {
            [classes.borderActiveDZ]: blockSelected === 13,
            [classes.continuedZone]: isFilterByCategory && blockSelected === 9,
            [classes.dzActice]: isDeadzone,
          })}
          onClick={() => {
            isFilterByCategory
              ? onChangeBlockSelected(9, false)
              : onChangeBlockSelected(13, true);
          }}
        ></Box>
      )}
    </RSC>
  );
};

export default TwelveBlocks;
