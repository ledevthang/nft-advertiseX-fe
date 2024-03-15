import { makeStyles } from '@material-ui/core';

interface IStyle {
  isDesktop: boolean;
  isDeadzone: boolean;
  isScrolling: boolean;
  isHome: boolean;
}

export const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: ({ isDeadzone }: IStyle) =>
      isDeadzone ? '#DDE542' : '#FFFFFF',
    '&>div:nth-child(3)': {
      minHeight: 'calc(100vh - 211.25px)',
      [theme.breakpoints.up('lg')]: {
        // mean with >= 1440px this css will be appy
        padding: ({ isScrolling, isHome }: IStyle) =>
          isScrolling
            ? isHome
              ? '112px 32px 0px 32px'
              : '160px 32px 0px 32px'
            : '196px 32px 0px 32px',
      },
      [theme.breakpoints.down('lg')]: {
        // mean with =< 1919.95px this css will be appy
        padding: ({ isDesktop, isScrolling, isHome }: IStyle) => {
          if (isDesktop && isHome) {
            return '148px 32px 0px';
          }
          if (!isDesktop && isScrolling) {
            return '104px 32px 0px';
          } else if (isScrolling) {
            return '112px 32px 0px 32px';
          }
          return '160px 32px 0px';
        },
      },
      [theme.breakpoints.between(1440, 1920)]: {
        padding: ({ isHome, isScrolling }: IStyle) => {
          if (isHome && !isScrolling) {
            return '196px 32px 0px';
          } else if (isHome && isScrolling) {
            return '116px 32px 0px';
          }
        },
      },
      [theme.breakpoints.down('sm')]: {
        minHeight: 'calc(100vh - 434.25px)',
        padding: ({ isHome }: IStyle) =>
          isHome ? '255px 16px 0px 16px ' : '136px 16px 0px 16px ',
        overflowY: 'hidden',
      },
    },
  },
  home: {
    height: '100vh',
    overflowY: 'hidden',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'unset',
      overflowY: 'auto',
      height: 'unset',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  detail: {
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh',
    },
  },
}));
