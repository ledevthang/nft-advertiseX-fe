import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapDiscover: {
    marginTop: '38px',
    width: '100%',
    height: '480px',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    [theme.breakpoints.down(415)]: {
      marginTop: '0px',
      height: '768px',
    },
    [theme.breakpoints.between(415, 426)]: {
      marginTop: '0px',
      height: '792px',
    },
    [theme.breakpoints.between(426, 'md')]: {
      height: '792px',
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto',
    },
  },
  wrapDiscoverLeft: {
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
      height: 'auto',
    },
    [theme.breakpoints.between('md', 1439)]: {
      padding: '0px',
      height: 'auto',
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      padding: '88px 0px 0px 0px',
    },
  },
  textDiscover: {
    width: '561px',
    display: 'flex',
    fontSize: '52px',
    fontWeight: 700,
    color: '#100113',
    [theme.breakpoints.down('md')]: {
      width: '410px',
      display: 'flex',
      fontSize: '32px',
      fontWeight: 700,
      color: '#100113',
    },
    [theme.breakpoints.down('sm')]: {
      width: '343px',
      fontSize: '42px',
      fontWeight: 700,
      color: '#100113',
    },
  },
  textNFT: {
    fontSize: '52px',
    fontWeight: 700,
    color: '#6F6BC5',
    '&:after': {
      fontWeight: 200,
      fontSize: '52px',
    },
    '& .index-module_type__E-SaG': {
      fontSize: '52px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
      fontWeight: 700,
      '&:after': {
        fontWeight: 200,
        fontSize: '32px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '42px',
        '&:after': {
          fontWeight: 200,
          fontSize: '42px',
        },
      },
    },
  },
  textDes: {
    color: '#100113',
    fontSize: '24px',
    fontWeight: 300,
    height: '34px',
    marginTop: '16px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      marginTop: '8px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      width: '343px',
    },
  },
  wrapExplore: {
    width: '150px',
    height: '60px',
    backgroundColor: '#6F6BC5',
    padding: '24px',
    lineHeight: '12px',
    fontSize: '16px',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginTop: '48px',
    [theme.breakpoints.between('md', 1439)]: {
      marginTop: '24px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  line: {
    marginTop: '32px',
    width: '20%',
    height: '2px',
    borderRadius: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  lineActive: {
    backgroundColor: '#100113 !important',
  },
  wrapDiscoverRight: {
    padding: '64px',
    '& .swiper': {
      marginLeft: 0,
      cursor: 'pointer',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '40px 0px',
      '& .swiper': {
        width: '100%',
      },
    },
    [theme.breakpoints.between('sm', 391)]: {
      width: '100%',
      padding: '40px 0px',
      '& .swiper': {
        width: '344px',
      },
    },
    [theme.breakpoints.between(391, 415)]: {
      padding: '40px 0px',
      '& .swiper': {
        width: 359,
      },
    },
    [theme.breakpoints.between(415, 426)]: {
      padding: '40px 0px',
      '& .swiper': {
        width: 383,
      },
    },
    [theme.breakpoints.between(426, 'md')]: {
      padding: '40px 0px',
      '& .swiper': {
        width: 383,
        marginLeft: 0,
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      padding: 0,
      '& .swiper': {
        width: 352,
      },
    },
  },
  wrapItemNFTImg: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: 352,
    height: 352,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: 343,
      height: 343,
    },
    [theme.breakpoints.between('sm', 391)]: {
      width: 344,
      height: 344,
    },
    [theme.breakpoints.between(391, 415)]: {
      width: 359,
      height: 359,
    },
    [theme.breakpoints.between(415, 426)]: {
      width: 383,
      height: 383,
    },
    [theme.breakpoints.between(426, 'md')]: {
      width: 383,
      height: 383,
    },
    [theme.breakpoints.up('md')]: {
      width: 352,
      height: 352,
    },
  },
  wrapLineProgress: {
    width: 106,
  },
  wrapPrice: {
    width: 'auto',
    height: '25px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '4px',
  },
  priceItem: {
    height: '17px',
    fontWeight: 600,
    fontSize: '12px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginLeft: '6px',
    marginRight: '6px',
  },
  titlePrice: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#100113',
    marginRight: '4px',
  },
  wrapInforNFT: {
    width: 'auto',
    height: '25px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '4px',
    marginLeft: '8px',
  },
  imgNFTItem: {
    '& .MuiAvatar-root': {
      width: '16px',
      height: '16px',
    },
  },
  nameNFT: {
    height: '17px',
    fontWeight: 600,
    fontSize: '12px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginLeft: '4px',
    marginRight: '8px',
  },
  wrapInfor: {
    position: 'absolute',
    left: '8px',
    bottom: '16px',
  },
  imgMarketplace: {
    width: '48px',
    height: '48px',
    position: 'absolute',
    top: '10px',
    right: '10px',
    borderRadius: '50%',
    [theme.breakpoints.down('xs')]: {
      left: 287,
    },
    [theme.breakpoints.between('sm', 391)]: {
      left: 287,
    },
    [theme.breakpoints.between(391, 415)]: {
      left: 300,
    },
  },
  iconExplore: {
    marginLeft: '10px',
    marginTop: '-5px',
  },
  ethIcon: {
    marginLeft: '4px',
  },
  media: {
    width: '352px',
    height: '352px',
    [theme.breakpoints.between('md', 1281)]: {
      width: '300px',
      height: '300px',
    },
  },
}));
