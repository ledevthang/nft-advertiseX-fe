/* eslint-disable */
import React, { useMemo } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import EthStatsBarIcon from 'icons/EthStatsBarIcon';
interface IData {
  value: number;
  label: string;
}

const TopBarData = ({ value, label }: IData) => {
  const renderEthIcon = useMemo(() => {
    if (
      label === 'First place' ||
      label === 'Last place' ||
      label === '24H volume' ||
      label === 'All time volume'
    ) {
      return <EthStatsBarIcon />;
    }
  }, [label]);

  const renderValue = useMemo(() => {
    if (!value) return 0;
    if (label === 'NFTs' || label === 'Owners' || label === 'Collections') {
      return Math.min(value, 1001);
    }
    if (label === 'First place' || label === 'Last place') {
      return Number(value).toFixed(5);
    } else if (label === '24H volume' || label === 'All time volume') {
      if (value < 0.001) return '< 0.001';
      return Number(value).toFixed(3);
    }
    return value;
  }, [value]);

  const classes = useStyles({ hasIcon: !!renderEthIcon });
  return (
    <Box className={classes.main}>
      {renderEthIcon}
      <Box display="flex" alignItems="baseline">
        <Typography className={classes.value}>{renderValue}</Typography>
        <Typography className={classes.label}>{label}</Typography>
      </Box>
    </Box>
  );
};

export default TopBarData;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 16,
    [theme.breakpoints.up('lg')]: {
      marginRight: 32,
    },
    [theme.breakpoints.down('md')]: {
      minWidth: ({ hasIcon }: { hasIcon: boolean }) => (hasIcon ? 170 : 110),
    },
    '& *': {
      color: '#FFFFFF',
    },
    '& svg': {
      width: 8,
      height: 14,
    },
  },
  value: {
    fontWeight: 700,
    marginLeft: 8,
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 80,
  },
  label: {
    lineHeight: '140%',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    marginLeft: 8,
  },
}));
