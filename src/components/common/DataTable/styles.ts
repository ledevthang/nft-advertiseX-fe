import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = () =>
  createStyles({
    root: {
      position: 'relative',
      backgroundColor: '#fff',
    },
    noDataMessage: {
      textAlign: 'center',
      fontStyle: 'italic',
    },
    cursorDefault: {
      cursor: 'default',
    },
    pagination: {
      backgroundColor: '#f5f5f5 !important',
    },
    insertedRow: {
      backgroundColor: '#f5f5f5',
      height: '32px',
    },
  });

export const useStyles = makeStyles(styles);
