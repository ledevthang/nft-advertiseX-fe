import { makeStyles } from '@material-ui/core';

interface IStyle {
  isDesktop: boolean;
  isScrolling: boolean;
  isDeadzone: boolean;
  isFilterByCategory: boolean;
}

export const useStyles = makeStyles((theme) => ({
  main: {
    position: 'sticky',
    zIndex: 'unset',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    marginLeft: 12,
    height: '100px !important',
    marginBottom: 20,
    overflowX: 'hidden',
    width: 'initial !important',
    overflow: 'scroll',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .ScrollbarsCustom-Wrapper': {
      height: 'inherit',
    },
    '& .ScrollbarsCustom-Content': {
      minHeight: 'unset !important',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        padding: '0px 24px 0px 20px !important',
        width: 'max-content',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 16px 0px 12px !important',
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '108px !important',
      margin: '-4px 0px 0px 24px',
      overflowX: 'scroll',
      marginLeft: -24,
      width: 'calc(100% + 48px) !important',
    },
    [theme.breakpoints.down('sm')]: {
      height: '124px !important',
      position: 'fixed !important',
      top: ({ isDesktop, isScrolling }: IStyle) => {
        if (!isDesktop) {
          return 136;
        }
      },
      left: 0,
      margin: '-4px -16px 0px 0px',
      width: '100% !important',
    },
  },
  isDeadzone: {
    backgroundColor: '#DDE542 !important',
  },
  deadzoneFilter: {
    backgroundColor: '#8d89ce !important',
  },
  moblieStyle: {
    zIndex: 3,
  },
  container: {
    position: 'relative',
    height: 80,
    width: 80,
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'box-shadow .3s',
    mixBlendMode: 'normal',
    margin: '4px 4px 4px 0px',
    '&:nth-child(1)': {
      margin: '4px',
    },
    '&:hover': {
      boxShadow:
        '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    },
  },
  img: {
    width: '100%',
    height: '100%',
  },
  deadzone: {
    flexGrow: 1,
    height: 80,
    cursor: 'pointer',
    backgroundColor: ({ isFilterByCategory }: IStyle) => {
      if (isFilterByCategory) {
        return '#f4ebbd';
      } else {
        return '#DDE542';
      }
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 80,
      height: 80,
    },
  },
  borderActive: {
    border: '4px solid #65AEBF !important',
    width: 88,
    height: 88,
    margin: '0px !important',
    marginLeft: '-4px !important',
    '&:nth-child(1)': {
      marginLeft: '0px !important',
    },
  },
  borderActiveDZ: {
    border: '4px solid #B7B71D !important',
    margin: '0px !important',
    height: 88,
    width: 88,
    marginLeft: '-4px !important',
  },
  continuedZone: {
    border: '4px solid #65AEBF !important',
    margin: '0px !important',
    marginLeft: '-4px !important',
    height: 88,
    width: 88,
  },
  trackX: {
    left: '24px !important',
    right: '24px !important',
    backgroundColor: 'transparent !important',
    height: '7px !important',
    bottom: '0px !important',
    boxSizing: 'border-box',
    width: 'calc(100% - 48px) !important',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderTop: '1px solid #100113',
      transform: 'translateY(30%)',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 17,
      left: '16px !important',
      right: '16px !important',
      width: 'calc(100% - 32px) !important',
    },
  },
  thumbX: {
    backgroundColor: '#FFFFFF !important',
    border: '1px solid #100113',
    height: '5px !important',
    position: 'absolute',
    zIndex: 2,
    boxSizing: 'border-box',
  },
  dzActice: {
    backgroundColor: '#DDE542',
  },
}));
