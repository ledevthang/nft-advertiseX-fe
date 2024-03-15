import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 'unset',
  },
  conatiner: {
    width: '100%',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '22.4px',
    fontWeight: 400,
    textAlign: 'center',
    margin: '0px 22.5px 40px',
    color: theme.colors.black2,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  circle: {
    display: 'inline-block',
    width: 40,
    height: 40,
    backgroundColor: '#6F6BC5',
    margin: '0px 14px',
    borderRadius: '50%',
    animationName: '$loading',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  secondCircle: {
    animationDelay: '0.4s',
  },
  thirdCircle: {
    animationDelay: '0.8s',
  },
  '@keyframes loading': {
    '50%': {
      opacity: 0,
      transform: 'scale(0.7) translateY(10px)',
    },
  },
}));
