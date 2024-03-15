import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    lineHeight: '16.8px',
    fontWeight: 400,
    color: theme.colors.black2,
    marginRight: 9,
  },
  tooltipText: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 8px',
    borderRadius: 16,
    background: 'rgba(16, 1, 19, 0.8)',
    position: 'relative',
    top: -64,
    left: 0,
    maxWidth: 'unset',
    fontSize: 9,
  },
  mobileLabel: {
    fontSize: 8,
  },
  value: {
    height: 60,
    border: `1px solid ${theme.colors.purple1}`,
    borderRadius: 30,
    color: theme.colors.purple1,
    fontSize: 32,
    lineHeight: '45px',
    fontWeight: 700,
    width: 113,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('sm')]: {
      width: 144,
      lineHeight: '45px',
    },
  },
  deadZoneValue: {
    fontSize: '16px !important',
    color: `${theme.colors.black3} !important`,
    border: '1px solid rgba(0, 0, 0, 0.32) !important',
    backgroundColor: theme.colors.yellow1,
  },
}));
