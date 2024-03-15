import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    noSelect: {
      cursor: 'default',
    },
    noHover: {
      '&:hover .MuiTableSortLabel-icon': {
        opacity: 0,
      },
    },
    title: {
      color: '#6F6BC5',
      fontSize: '12px',
      fontWeight: 600,
      '&:hover': {
        color: '#6F6BC5',
      },
      '&:focus': {
        color: '#6F6BC5',
      },
    },
    header: {
      position: 'relative',
      borderBottom: '0px',
      background: '#F5F5F6',
    },
    buttonExpand: {
      backgroundColor: theme.colors.pureWhite,
      paddingRight: 0,
    },
    hidden: {
      display: 'none',
    },
    wrapIconSort: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 4,
      top: '50%',
      transform: 'translateY(-50%)',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px',
        position: 'unset',
        display: 'inline-flex',
        transform: 'translateY(-2px)',
      },
    },
    iconUp: {
      width: '12px',
      height: '12px',
      marginTop: '-4px',
    },
    iconDown: {
      width: '12px',
      height: '12px',
      marginBottom: '4px',
    },
    clickIcon: {
      opacity: 0.3,
    },
    defaultIcon: {
      opacity: 1,
    },
  });

export const useStyles = makeStyles(styles);
