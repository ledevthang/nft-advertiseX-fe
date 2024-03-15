import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  direct: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginTop: 64,
    marginBottom: 64,
    [theme.breakpoints.up('lg')]: {
      marginTop: 128,
      marginBottom: 128,
    },
  },
  head: {
    fontSize: 45,
    fontWeight: 700,
    color: '#6F6BC5',
    marginBottom: 16,
    textAlign: 'center',
    [theme.breakpoints.up('xl')]: {
      fontSize: 66,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 35,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
    [theme.breakpoints.between(400, 430)]: {
      fontSize: 20,
    },
  },
  subHead: {
    fontSize: 24,
    fontWeight: 300,
    color: '#6F6BC5',
    textAlign: 'center',
    lineHeight: '170%',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between(400, 430)]: {
      fontSize: 12,
    },
  },
  btn: {
    display: 'flex',
    marginTop: 52,
  },
  homeButton: {
    cursor: 'pointer',
    border: 'unset',
    background: 'unset',
    color: '#6F6BC5',
    fontSize: 16,
    fontWeight: 600,
    marginRight: 48,
    fontFamily: 'Poppins, sans-serif',
  },
  addButton: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 158,
    height: 60,
    background: '#6F6BC5',
    border: 'unset',
    gap: 12,
    '&>p': {
      color: 'white',
      fontSize: 16,
      fontWeight: 600,
    },
  },
}));
