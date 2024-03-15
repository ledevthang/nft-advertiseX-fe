import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0px 16px',
    padding: '0px 8px',
    height: 41,
    width: 'auto',
    background: '#FFFFFF',
    '& p': {
      fontWeight: 600,
      fontSize: 12,
      color: '#100113',
      textTransform: 'uppercase',
    },
    borderBottom: '0px !important',
  },
  wrapClose: {
    display: 'flex',
    width: '12%',
    [theme.breakpoints.between('md', 'lg')]: {
      width: '16%',
    },
    '& button': {
      padding: 0,
      minWidth: 20,
      marginRight: 8,
    },
    '&>button svg:last-child': {
      height: 16,
    },
  },
  textItem: {
    color: '#6F6BC5',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  selectedBackgroundColor: {
    backgroundColor: '#F9F9FD',
    borderTop: '1px solid #F5F5F6 !important',
  },
}));
