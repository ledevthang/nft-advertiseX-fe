import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) => ({
  container: {
    paddingBottom: 32,
    borderBottom: '1px solid #6F6BC5',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  valueRow: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
  ethValueBox: {
    paddingLeft: 16,
    width: 180,
    height: 60,
    backgroundColor: '#6F6BC514',
    border: '1px solid #6F6BC5',
    '& > svg': {
      marginRight: 8,
    },
  },
  priceValueBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 17,
    width: 133,
    height: 60,
    backgroundColor: 'rgba(111, 107, 197, 0.04)',
  },
  priceValueBoxPrice: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '32px',
    color: '#6F6BC5',
  },
  priceValueBoxPricePerDay: {
    fontWeight: 400,
    fontSize: '8px',
    lineHeight: '140%',
    color: 'rgba(16, 1, 19, 0.6)',
    fontFamily: 'Roboto',
  },
  lastTimeBox: {
    marginRight: 52,
  },
  hourTimeBox: {
    width: 'auto',
    minWidth: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  value: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#6F6BC5',
    fontSize: 20,
    fontWeight: 700,
  },
}));
