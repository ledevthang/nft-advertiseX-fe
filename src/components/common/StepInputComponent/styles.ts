import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    lineHeight: '19.6px',
    marginBottom: theme.spacing(1),
  },
  root: {
    paddingRight: 0,
    borderRadius: 0,
    width: 89,
    height: 60,
    '& input': {
      fontSize: 32,
      fontWeight: 500,
      textAlign: 'center',
      paddingRight: 8,
      paddingLeft: 8,
    },
    '&$focused $notchedOutline': {
      borderWidth: 1,
      borderColor: theme.colors.black2,
    },
    '& input::placeholder': {
      fontSize: 32,
      color: 'rgba(16, 1, 19, 0.6)',
      fontWeight: 500,
    },
  },
  groupButton: {
    height: 60,
    width: 30,
  },
  upButton: {
    backgroundColor: theme.colors.black1,
    width: 30,
    height: 30,
    minWidth: 30,
    border: 'unset',
    boxShadow: `-1px 0px ${theme.colors.black2}`,
  },
  downButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    border: 'unset',
    boxShadow: `-1px 0px ${theme.colors.black2}`,
  },
  notchedOutline: {
    borderColor: `${theme.colors.black2} !important`,
  },
  focused: {
    borderColor: `unset`,
  },
}));
