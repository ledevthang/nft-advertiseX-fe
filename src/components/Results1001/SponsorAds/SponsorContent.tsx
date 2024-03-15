import React, { memo } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Sponsor } from 'types/sponsor';

interface IData {
  isGrid4x4: boolean;
  data: Sponsor;
  isDeadzone?: boolean;
  isOnDetail?: boolean;
  isProfile?: boolean;
}

const SponsorContent = ({
  isGrid4x4,
  data,
  isDeadzone,
  isOnDetail,
  isProfile,
}: IData) => {
  const classes = useStyles({
    isGrid4x4,
    isDeadzone,
    isOnDetail,
    isAwaiting: !true,
    isProfile,
  });

  return (
    <Box className={classes.content}>
      <Box className={classes.wrapper1}>
        <Box>
          <Box className={classes.collection}>
            <Typography>Sponsored</Typography>
          </Box>
          <Typography className={classes.nftName}>
            {data.displayLink}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.wrapper2}>
        <Typography>{data.description || ''}</Typography>
      </Box>
    </Box>
  );
};

interface IStyle {
  isGrid4x4: boolean;
  isOnDetail?: boolean;
  isDeadzone?: boolean;
  isAwaiting?: boolean;
  isProfile?: boolean;
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '10px 16px',
    height: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 80 : 94),
    boxSizing: 'border-box',
    backgroundColor: ({ isDeadzone, isProfile }: IStyle) =>
      isDeadzone ? (isProfile ? '#DDE542' : '#100113') : '',
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: ({ isDeadzone, isProfile }: IStyle) =>
        isDeadzone ? (isProfile ? '#100113' : '#DDE542') : '',
    },
    [theme.breakpoints.down('md')]: {
      height: ({ isOnDetail }: IStyle) =>
        isOnDetail ? '133px !important' : '68px !important',
      padding: '4px 8px',
    },
  },
  wrapper1: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>div:first-child': {
      maxWidth: '100%',
    },
  },
  collection: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 10 : 12),
      fontFamily: 'Roboto',
    },
    '& svg': {
      marginLeft: 4,
      width: 9,
      height: 9,
    },
  },
  nftName: {
    fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 12 : 16),
    fontWeight: 'bold',
  },
  wrapper2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '& >p:nth-child(1)': {
      fontSize: ({ isGrid4x4 }: IStyle) => (isGrid4x4 ? 12 : 14),
    },
  },
}));

export default memo(SponsorContent);
