import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    marginTop: -4,
    [theme.breakpoints.down('md')]: {
      maxWidth: ({ estimates }: { estimates: boolean }) =>
        estimates ? '50%' : '100%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100% !important',
    },
  },
  img: {
    width: 245,
    height: 245,
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: 162,
      height: 162,
    },
  },
  wrapperLoader: {
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    left: 0,
    height: 246,
    padding: 0,
    margin: 0,
    width: '100%',
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      height: 163,
    },
    '& span': {
      width: 40,
    },
  },
  wrapper: {
    marginLeft: 16,
    width: 'calc(100% - 261px)',
    overflowWrap: 'break-word',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 177px)',
    },
  },
  collection: {
    display: 'flex',
  },
  collectionName: {
    position: 'relative',
    fontSize: '14px',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 130,
    },
  },
  verifyIcon: {
    position: 'absolute',
    marginLeft: 1,
    marginTop: 2,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  tokenId: {
    fontSize: 24,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontWeight: 400,
      fontSize: 20,
    },
  },
  label: {
    marginTop: 8,
    [theme.breakpoints.down('md')]: {
      marginTop: 8,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 16,
    },
  },
  price: {
    display: 'flex',
    alignItems: 'baseline',
    '&>div': {
      display: 'flex',
      alignItems: 'center',
      '& p': {
        fontSize: 24,
        fontWeight: 700,
      },
      '& svg': {
        width: 10,
        height: 16,
        marginRight: 4,
      },
    },
    '&>p': {
      color: 'rgba(16, 1, 19, 0.4)',
      marginLeft: 4,
    },
  },
  video: {
    position: 'absolute',
    width: 245,
    height: 245,
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: 162,
      height: 162,
    },
  },
  unlisted: {
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.32)',
  },
  categories: {
    marginTop: 20,
  },
  defaultCatContainer: {
    flexWrap: 'wrap',
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  defaultCatItem: {
    display: 'flex',
    width: 'auto',
    padding: '5px 4px',
    borderRadius: '25px',
    border: '1px solid #6F6BC5',
    alignItems: 'center',
    color: '#6F6BC5',
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
      marginBottom: 8,
      marginRight: 0,
    },
    '&:hover': {
      backgroundColor: theme.colors.purple1,
      color: theme.colors.pureWhite,
    },
  },
  notLastDefaultCateItem: {
    marginRight: 8,
  },
  defaultCatName: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '140%',
  },
  remainContainer: {
    marginTop: 8,
  },
  remainingCatItem: {
    display: 'flex',
    width: 'auto',
    padding: '5px 7px 4px 5px',
    borderRadius: '25px',
    alignItems: 'center',
    backgroundColor: theme.colors.pureWhite,
    border: '1px solid #6F6BC5',
    color: theme.colors.purple1,
    textDecoration: 'none',
    marginBottom: 8,
    '&:hover': {
      backgroundColor: theme.colors.purple1,
      color: theme.colors.pureWhite,
      cursor: 'pointer',
    },
  },
  remainingCatName: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '140%',
    textTransform: 'uppercase',
  },
  countRemainingCat: {
    display: 'flex',
    width: 'auto',
    padding: '5px 7px 4px 5px',
    borderRadius: '18px',
    alignItems: 'center',
    backgroundColor: '#FFF',
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '140%',
    minWidth: 54,
    justifyContent: 'center',
    border: '1px solid #6F6BC5',
    color: '#6F6BC5',
    height: 36,
    cursor: 'pointer',
  },
  marketLogo: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  priceValue: {
    marginLeft: 2,
  },
}));
