import { makeStyles } from '@material-ui/core';

interface UseStyleProps {
  paymentStatus?: boolean;
  priceStatus?: boolean;
}

export const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: 63,
    [theme.breakpoints.down('md')]: {
      marginTop: 40,
    },
  },
  left: {
    [theme.breakpoints.up('lg')]: {
      paddingRight: 97,
    },
    [theme.breakpoints.between(744, 1440)]: {
      position: 'relative',
      borderBottom: '1px solid #100113',
      paddingBottom: '40px',
    },
  },
  right: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      paddingRight: 176,
    },
  },
  confirm: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 16,
    marginBottom: 100,
    [theme.breakpoints.up('lg')]: {
      marginTop: 36,
      marginBottom: 72,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 6,
    },
    '& button': {
      height: 44,
      [theme.breakpoints.up('lg')]: {
        height: 60,
      },
      '& span p': {
        color: '#6F6BC5',
        fontSize: 14,
        fontWeight: 600,
        [theme.breakpoints.up('lg')]: {
          fontSize: 16,
        },
      },
    },
    '& button:nth-child(1)': {
      width: 105,
      [theme.breakpoints.up('lg')]: {
        width: 129,
      },
      marginRight: 24,
    },
    '& button:nth-child(2)': {
      width: 192,
      [theme.breakpoints.up('lg')]: {
        width: 234,
      },
      backgroundColor: ({ paymentStatus }: UseStyleProps) =>
        paymentStatus ? '#6F6BC5' : '#00000014',
      '& p': {
        color: ({ paymentStatus }: UseStyleProps) =>
          paymentStatus ? '#FFFFFF' : 'rgba(0, 0, 0, 0.16)',
        fontWeight: 600,
        marginLeft: 10,
      },
    },
  },
  position: {
    width: 140,
    [theme.breakpoints.between(744, 1440)]: {
      width: 162,
    },
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 32,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  contentFirst: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '140%',
    fontSize: '32px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      fontWeight: 500,
      marginBottom: 8,
    },
    [theme.breakpoints.between(744, 1440)]: {
      position: 'absolute',
      top: '153.5px',
      right: '20px',
      width: '306px',
      height: '84px',
      fontWeight: 500,
      fontSize: '20px',
    },
  },
  contentSecond: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '140%',
    [theme.breakpoints.between(744, 1440)]: {
      position: 'absolute',
      top: '218px',
      right: '20px',
      width: '306px',
      height: '84px',
      lineHeight: '130%',
    },
  },
  wrapper: {
    marginBottom: 16,
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      '&:first-child': {
        marginBottom: 8,
      },
    },
  },
  tipWrapper: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    [theme.breakpoints.between('md', 'lg')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: 0,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      '&:first-child': {
        marginBottom: 8,
      },
    },
  },
  estimateWrapper: {
    marginTop: 16,
    // [theme.breakpoints.up('lg')]: {
    //   marginTop: 8,
    // },
  },
  dateSelect: {
    display: 'flex',
    marginTop: 24,
    [theme.breakpoints.up('lg')]: {
      marginTop: 36,
      marginBottom: 24,
    },
    [theme.breakpoints.between(744, 1440)]: {
      marginBottom: 32,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  dateBox: {
    [theme.breakpoints.between(744, 1440)]: {
      marginRight: 78,
    },
  },
  title: {
    marginBottom: 24,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '140%',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      left: '-99px',
      width: '90px',
      transform: 'rotate(-90deg)',
    },
  },
  titleTablet: {
    marginBottom: 24,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '140%',
    position: 'absolute',
    top: '128.5px',
    right: '20px',
    width: '306px',
  },
  currentTitle: {
    color: '#6F6BC5',
    bottom: 44,
  },
  tipTitle: {
    marginBottom: 8,
    [theme.breakpoints.up('lg')]: {
      bottom: 12,
    },
  },
  settingsTitle: {
    [theme.breakpoints.between('md', 'lg')]: {
      marginTop: 16,
    },
    [theme.breakpoints.up('lg')]: {
      bottom: 10,
    },
  },
  estimateTitle: {
    [theme.breakpoints.up('lg')]: {
      bottom: 45,
    },
  },
  priceDiv: {
    display: 'flex',
  },
  label: {
    fontSize: 14,
    lineHeight: '19.6px',
    marginBottom: theme.spacing(1),
  },
  priceBox: {
    backgroundColor: ({ priceStatus }: UseStyleProps) =>
      priceStatus ? '#FFF0F0' : 'rgba(111, 107, 197, 0.04)',
    height: 60,
    width: 162,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: 134,
      alignItems: 'flex-end',
      '& > * ': {
        paddingRight: 17.5,
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: 136,
    },
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      textAlign: 'center',
    },
    color: ({ priceStatus }: UseStyleProps) =>
      priceStatus ? '#ED5050' : '#6F6BC5',
  },
  miniumPrice: {
    color: ({ priceStatus }: UseStyleProps) =>
      priceStatus ? 'rgba(16, 1, 19, 0.6)' : 'rgba(16, 1, 19, 0.6)',
    fontWeight: 400,
    fontSize: '8px',
    fontFamily: 'Roboto',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      bottom: 3,
    },
  },
  estimateBlock: {
    position: 'relative',
    borderTop: '1px solid #100113',
    borderBottom: '1px solid #100113',
    padding: '24px 0 24px 0',
    [theme.breakpoints.up('lg')]: {
      padding: '43px 0px 37px',
    },
  },
  service: {
    position: 'absolute',
    bottom: -30,
    right: 0,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
      bottom: -20,
      fontSize: 8,
    },
  },
  serviceLink: {
    textDecoration: 'underline solid #6F6BC5 1px',
    fontWeight: 700,
    color: '#6F6BC5',
  },
  toolTipTabletMb: {
    position: 'absolute',
    top: 60,
    border: '0.5px solid #000000',
    borderRadius: 3,
    color: '#000000',
    backgroundColor: 'transparent',
    width: 'fit-content',
    padding: 3,
  },
  inputnftvalue: {
    width: 286.84,
    [theme.breakpoints.down('sm')]: {
      width: 204,
    },
  },
  estimateDeskop: {
    borderBottom: '1px solid #100113',
    borderTop: '1px solid #100113',
    padding: '24px 0px',
    marginTop: 24,
  },
  estimateTablet: {
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  wrapPricePerday: {
    marginLeft: '32px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  },
}));
