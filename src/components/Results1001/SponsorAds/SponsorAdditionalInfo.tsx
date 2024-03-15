import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import OpenInNew from 'icons/OpenInNew';
import { Sponsor } from 'types/sponsor';

interface ISponsorAdditionalInfo {
  data: Sponsor;
  isDeadzone?: boolean;
}

interface IStyle {
  isDeadzone?: boolean;
}

const SponsorAdditionalInfo = ({
  data,
  isDeadzone,
}: ISponsorAdditionalInfo) => {
  const classes = useStyles({
    isDeadzone,
  });

  const onRouteChangeVisitNow = () => {
    window.open(data.trueLink, '_blank');
  };
  return (
    <Box display="block" className={classes.main}>
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
      <Button
        className={clsx(classes.btnBuy, 'center-root', {
          [classes.isDeadzone]: isDeadzone,
        })}
        onClick={onRouteChangeVisitNow}
      >
        <Typography>VISIT NOW</Typography>
        <OpenInNew color={isDeadzone ? '#DDE542' : '#6F6BC5'} />
      </Button>
    </Box>
  );
};

export default SponsorAdditionalInfo;

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    [theme.breakpoints.down('md')]: {
      opacity: 1,
    },
  },
  wrapper1: {},
  collection: {
    '& p': {
      fontSize: 10,
      opacity: 0.8,
      fontFamily: 'Roboto',
    },
  },
  nftName: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  wrapper2: {
    '& p': {
      fontSize: 12,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  btnBuy: {
    boxSizing: 'border-box',
    border: '1px solid ',
    borderColor: ({ isDeadzone }: IStyle) =>
      isDeadzone ? '#DDE542' : '#8c89d1',
    width: '100%',
    marginTop: 16,
    height: 30,
    color: '#6F6BC5',
    borderRadius: 0,
    '& p': {
      color: '#6F6BC5',
      fontSize: 12,
      fontWeight: 600,
    },
    '& svg': {
      width: 14,
      height: 14,
      marginLeft: 8,
    },
    [theme.breakpoints.up('lg')]: {
      '&:hover': {
        backgroundColor: ({ isDeadzone }: IStyle) =>
          isDeadzone ? '#DDE542' : '#8c89d1',
        '& p': {
          color: '#FFFFFF',
        },
        '& svg>path': {
          stroke: '#FFFFFF',
        },
      },
    },
  },
  isDeadzone: {
    color: '#100113 !important',
    '& p': {
      color: '#DDE542 !important',
    },
    [theme.breakpoints.up('lg')]: {
      '&:hover': {
        '& p': {
          color: '#100113 !important',
        },
      },
    },
  },
}));
