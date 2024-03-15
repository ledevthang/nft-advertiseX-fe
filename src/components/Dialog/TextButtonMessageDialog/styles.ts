import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 'unset',
  },
  conatiner: {
    width: 615,
    height: 393,
    padding: 32,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.pureWhite,
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
    margin: '16px 22.5px',
    textAlign: 'center',
    color: theme.colors.black2,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22.4px',
    fontWeight: 400,
    textAlign: 'center',
    margin: '0px 21.5px 40px',
    color: theme.colors.black2,
  },
  groupBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  cancelBtn: {
    fontSize: 16,
    fontWeight: 600,
    color: '#6F6BC5',
    letterSpacing: 0.015,
  },
  submitBtn: {
    height: 60,
    width: 153,
    color: theme.colors.pureWhite,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.015,
    backgroundColor: '#6F6BC5',
    boxSizing: 'border-box',
    marginLeft: 29,
  },
}));
