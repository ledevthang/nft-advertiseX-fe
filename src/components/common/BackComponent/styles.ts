import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: 60,
    zIndex: 3,
    backgroundColor: ({ isDeadzone }: { isDeadzone?: boolean }) =>
      isDeadzone ? '#DDE542' : '#FFFFFF',
    borderTop: '1px solid #100113',
    borderBottom: '1px solid #100113',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& button': {
      minWidth: 0,
      marginLeft: 16,
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
      },
      '& p': {
        fontSize: 16,
        fontWeight: 700,
      },
    },
    '& p': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
}));
