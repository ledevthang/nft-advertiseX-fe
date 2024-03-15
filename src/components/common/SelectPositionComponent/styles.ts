import { makeStyles } from '@material-ui/core';

interface IStyle {
  backgroundColor: string;
  color: string;
}

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  root: {
    paddingRight: 0,
    borderRadius: 0,
    width: 60,
    height: 36,
    '& input': {
      fontSize: 14,
      fontWeight: 700,
      textAlign: 'center',
      paddingRight: 8,
      paddingLeft: 8,
      color: ({ color }: IStyle) => `${color}`,
    },
    '&$focused $notchedOutline': {
      borderWidth: 1,
      borderColor: theme.colors.black2,
    },
    '& input::placeholder': {
      fontSize: 14,
      color: 'rgba(16, 1, 19, 0.6)',
      fontWeight: 700,
    },
  },
  icon: {
    height: 36,
    width: 36,
  },
  upButton: {
    backgroundColor: ({ backgroundColor }: IStyle) => backgroundColor,
    width: 36,
    height: 36,
    minWidth: 30,
  },
  downButton: {
    width: 36,
    height: 36,
    minWidth: 30,
    border: 'unset',
  },
  notchedOutline: {
    borderColor: ({ backgroundColor }: IStyle) =>
      `${backgroundColor} !important`,
  },
  focused: {
    borderColor: `unset`,
  },
  startAdornment: {
    border: ({ backgroundColor }: IStyle) => `1px solid ${backgroundColor}`,
    borderRight: 'none !important',
  },
}));
