import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    color: theme.colors.purple1,
    fontWeight: 600,
    cursor: 'grabbing',
    fontSize: '16px',
    lineHeight: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.015em',
    '& svg': {
      marginLeft: 8,
    },
  },
  menu: {
    position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: theme.colors.pureWhite,
    color: theme.colors.black2,
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    paddingBottom: 4,
  },
  menuItem: {
    padding: '8px 8px',
    boxSizing: 'border-box',
    width: '100%',
    borderBottom: `1px solid ${theme.colors.black2}`,
    fontSize: 14,
    letterSpacing: 0.015,
    fontWeight: 400,
  },
  selectedItem: {
    backgroundColor: theme.colors.purple1,
    fontWeight: 500,
  },
}));
