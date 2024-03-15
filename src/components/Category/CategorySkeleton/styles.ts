import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: 'calc(100% - 16px)',
    border: '1px solid rgba(16, 1, 19, 0.11)',
  },
  img: {
    height: '100%',
  },
}));
