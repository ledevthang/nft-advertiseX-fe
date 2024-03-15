import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  circle: {
    display: 'inline-block',
    width: '100%',
    aspectRatio: '1',
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
