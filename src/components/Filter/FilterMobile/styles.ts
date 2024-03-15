import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filter: {
    display: 'none',
    position: 'fixed',
    zIndex: 4,
    bottom: 24,
    right: 16,
    '&>svg': {
      height: 24,
      width: 24,
    },
    '&>button': {
      borderRadius: 0,
      width: 60,
      height: 60,
      minWidth: 0,
    },
    '&>button:first-child': {
      backgroundColor: 'rgba(111, 107, 197, 0.16)',
      transform: 'rotate(180deg)',
    },
    '&>button:nth-child(2)': {
      backgroundColor: '#6F6BC5',
      marginTop: 24,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  paper: {
    width: '100%',
    top: 'calc(100% - 478px)',
    backgroundColor: '#FFFFFF',
    position: 'fixed',
    right: 0,
    padding: '24px 16px',
    boxSizing: 'border-box',
    borderRadius: 0,
    bottom: 0,
    boxShadow:
      '5px 0px 5px -3px rgba(0, 0, 0, 0.2), 8px 0px 10px 1px rgba(0, 0, 0, 0.14), 3px 0px 14px 2px rgba(0, 0, 0, 0.12)',
  },
  wrapperBtn: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& button': {
      borderRadius: 0,
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  clearButton: {
    color: '#100113',
    marginRight: 16,
  },
  clearButtonLabel: {
    marginLeft: 8,
  },
  applyButton: {
    color: '#FFFFFF',
    backgroundColor: '#6F6BC5',
    height: 36,
    padding: 12,
    cursor: 'pointer',
  },
  filterButton: {
    '&>span>svg:nth-child(2)': {
      position: 'absolute',
      top: 16,
      right: -2,
    },
    boxShadow:
      '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
  },
  hiden: {
    visibility: 'hidden',
  },
}));
