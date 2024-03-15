import React, { useMemo } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
interface ITwelveBlockLoading {
  className?: string;
  filterCategory?: boolean;
}

function TwelveBlockLoading({
  className,
  filterCategory,
}: ITwelveBlockLoading) {
  const classes = useStyle();

  const renderArray = useMemo(() => {
    if (filterCategory) {
      return [...new Array(9)].map((item, index) => index + 1);
    } else {
      return [...new Array(13)].map((item, index) => index + 1);
    }
  }, [filterCategory]);

  return (
    <>
      {renderArray.map((ele, index) => (
        <Box
          key={index}
          className={clsx(className, {
            [classes.loadingBlock13]: ele === 13,
            [classes.loadingBlock9]: ele === 9 && filterCategory,
          })}
        >
          <Skeleton
            // eslint-disable-next-line
            className={clsx(classes.img, {
              [classes.imgBlock13]: ele === 13 || (ele === 9 && filterCategory),
            })}
            variant="rect"
          />
        </Box>
      ))}
    </>
  );
}

export default TwelveBlockLoading;

const useStyle = makeStyles((theme) => ({
  img: {
    height: '80px',
    width: '80px',
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  loadingBlock13: {
    width: 'calc(100% - 12*4px - 12*80px) !important',
    height: '80px',
    position: 'relative',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'box-shadow .3s',
    mixBlendMode: 'normal',
    margin: '4px 4px 4px 0px',
    '&:nth-child(1)': {
      margin: '4px',
    },
  },
  loadingBlock9: {
    width: 'calc(100% - 8*4px - 8*80px) !important',
    height: '80px',
    position: 'relative',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'box-shadow .3s',
    mixBlendMode: 'normal',
    margin: '4px 4px 4px 0px',
    '&:nth-child(1)': {
      margin: '4px',
    },
  },
  imgBlock13: {
    width: '100% !important',
    height: '80px',
  },
}));
