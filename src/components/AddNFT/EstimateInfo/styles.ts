import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  lastInfoItem: {
    paddingRight: '0px !important',
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
}));
