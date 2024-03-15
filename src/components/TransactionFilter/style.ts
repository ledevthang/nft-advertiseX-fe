import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    width: 900,
    position: 'relative',
    backgroundColor: 'white',
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 3,
      '& > label': {
        marginRight: 13,
      },
      '& > input': {
        width: 700,
      },
      '& > select': {
        justifySelf: 'unset',
      },
    },
  },
  '&>button': {
    cursor: 'pointer',
    marginTop: 10,
  },
  button: {
    marginRight: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
}));
