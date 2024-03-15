import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 'unset',
  },
  conatiner: {
    width: '100%',
    backgroundColor: theme.colors.pureWhite,
    display: 'flex',
    flexDirection: 'column',
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
    lineHeight: '44.8px',
    fontWeight: 500,
    margin: '16px 22.5px',
    textAlign: 'center',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22.4px',
    fontWeight: 400,
    textAlign: 'center',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  firstSubtitle: {
    margin: '0px 22.5px 22px',
  },
  secondSubtitle: {
    marginBottom: 32,
  },
  gif: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
}));
