import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = () =>
  createStyles({
    root: {
      cursor: 'pointer',
      verticalAlign: 'top',
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#fff',
      },
      '& .MuiTableContainer-root': {
        overflowX: 'hidden',
      },
    },
    noSelect: {
      cursor: 'default',
      backgroundColor: '#fff',
    },
    expandRow: {
      cursor: 'default',
      backgroundColor: '#fff',

      '& > td': {
        padding: 0,
      },
      '&:last-child': {
        '& > td': {
          borderBottom: 'none',
        },
      },
    },
    hiddenIcon: {
      color: 'transparent',
      visibility: 'hidden',
    },
    isExpand: {},
    buttonExpand: {
      padding: 0,
    },
    loading: {
      top: 0,
      bottom: 0,
      right: 10,
      margin: 'auto',
      position: 'absolute',
    },
  });

export const useStyles = makeStyles(styles);
