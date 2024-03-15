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
    height: 60,
    paddingRight: 0,
    borderRadius: 0,
    position: 'relative',
    '& input': {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: '140%',
      paddingTop: 16,
      paddingBottom: 16,
      [theme.breakpoints.down('sm')]: {
        height: 45,
        fontSize: 18,
        paddingTop: 7.5,
        paddingBottom: 7.5,
      },
    },
    '&$focused $notchedOutline': {
      borderWidth: 1,
      borderColor: theme.colors.black2,
    },
    '& input::placeholder': {
      color: 'rgba(16, 1, 19, 0.6)',
      fontSize: 20,
      fontWeight: 700,
      lineHeight: '140%',
      paddingTop: 16,
      paddingBottom: 16,
      [theme.breakpoints.down('sm')]: {
        height: 45,
        fontSize: 18,
        paddingTop: 7.5,
        paddingBottom: 7.5,
      },
    },
    '& input:focus::placeholder': {
      color: '#fff',
    },
  },
  rootDeskop: {
    width: 286.84,
    '& input': {
      width: 163,
    },
  },
  rootTablet: {
    width: 286.84,
    '& input': {
      width: 163,
    },
  },
  rootMoblie: {
    width: 181,
    '& input': {
      width: 92,
    },
  },
  notchedOutline: {
    borderColor: `${theme.colors.black2} !important`,
  },
  focused: {
    borderColor: `unset`,
  },
  endAdornment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.black2,
    height: '100%',
    color: theme.colors.pureWhite,
    fontWeight: 500,
    cursor: 'grabbing',
    position: 'absolute',
    right: 0,
  },
  endAdornmentDeskop: {
    fontSize: 16,
    width: 124.84,
  },
  endAdornmentTablet: {
    fontSize: 12,
    width: 124.84,
  },
  endAdornmentMoblie: {
    fontSize: 12,
    width: 89,
  },
  endAdornmentLabel: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitDeskop: {
    textTransform: 'uppercase',
    paddingLeft: 8,
    paddingRight: 22,
  },
  unitTabletAndMoblie: {
    textTransform: 'uppercase',
    paddingLeft: 8,
    paddingRight: 12,
  },
  currencyIcon: {
    marginRight: theme.spacing(1),
  },
  arrowDownIcon: {
    marginLeft: 22,
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: theme.colors.pureWhite,
    color: theme.colors.black2,
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    padding: '16px 8px',
  },
  menuItem: {
    height: 48,
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.black2}`,
    fontSize: 14,
    letterSpacing: 0.015,
    fontWeight: 400,
  },
  unitItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    top: 4,
  },
  unit: {
    marginLeft: 12,
  },
  unitTooltip: {
    marginLeft: 12,
    fontWeight: 400,
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.4)',
    position: 'relative',
    top: -4,
  },
  iconBox: {
    width: '10px',
    height: '10px',
    backgroundColor: '#13B5EC',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ftmIcon: {
    display: 'inline-flex',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#13B5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueEqual0: {
    color: '#B3AEB4',
  },
}));
