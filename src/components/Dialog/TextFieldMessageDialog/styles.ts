import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100000000,
  },
  paper: {
    maxWidth: 'unset',
  },
  conatiner: {
    width: '100%',
    boxSizing: 'border-box',
    flexDirection: 'column',
    backgroundColor: theme.colors.pureWhite,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeBtn: {
    padding: 0,
    minWidth: 0,
  },
  title: {
    fontSize: 32,
    lineHeight: 1.4,
    fontWeight: 500,
    margin: '16px 21.5px',
    textAlign: 'center',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22.4px',
    fontWeight: 400,
    textAlign: 'center',
    margin: '0px 0px 32px',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  label: {
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: 400,
    color: theme.colors.black2,
  },
  form: {
    marginBottom: 32,
    position: 'relative',
  },
  rootInput: {
    borderRadius: 0,
    marginTop: 4,
    height: 60,
    paddingRight: 0,
    '& input': {
      fontSize: 14,
      fontWeight: 400,
      color: theme.colors.black2,
      boxSizing: 'border-box',
    },
    '& input::placeholder': {
      fontSize: 14,
      color: 'rgba(16, 1, 19, 0.6)',
      fontWeight: 400,
    },
    '&$focused $notchedOutline': {
      borderWidth: 2,
      borderColor: '#6F6BC5',
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: '#6F6BC5',
      '@media (hover: none)': {
        borderColor: '#6F6BC5',
      },
    },
  },
  notchedOutline: {
    borderColor: '#6F6BC5',
    borderWidth: 2,
  },
  focused: {
    borderColor: `#6F6BC5`,
  },
  subscribeBtn: {
    height: '100%',
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: '#6F6BC5',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 0.015,
    fontWeight: 600,
    color: theme.colors.pureWhite,
    minWidth: 'unset',
    width: 153,
  },
  footerTitle: {
    fontSize: 11,
    lineHeight: '15.4px',
    fontWeight: 400,
    textAlign: 'center',
    color: '#6F6BC5',
    cursor: 'pointer',
  },
  messageSuccess: {
    backgroundColor: '#EAFDF5',
    height: 24,
    display: 'flex',
    position: 'absolute',
    marginTop: 4,
    alignItems: 'center',
    left: 0,
    right: 0,
    '& p': {
      color: '#17C17C',
      fontSize: 11,
      marginLeft: 8,
    },
  },
  messageError: {
    height: 24,
    display: 'flex',
    left: 0,
    right: 0,
    position: 'absolute',
    marginTop: 4,
    alignItems: 'center',
    '& p': {
      color: '#ED5050',
      fontSize: 11,
      marginLeft: 8,
    },
  },
  wrapperBtn: {
    width: '100%',
    marginBottom: 24,
    marginTop: 8,
    '& p': {
      fontSize: 16,
      fontWeight: 600,
    },
    '& button:nth-child(1)': {
      width: 112,
      height: 60,
      '& p': {
        color: '#6F6BC5',
      },
    },
    '&>button:nth-child(2)': {
      width: 183,
      height: 60,
      backgroundColor: '#6F6BC5',
      marginLeft: 24,
      '& p': {
        color: '#FFFFFF',
      },
    },
  },
  media: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
}));
