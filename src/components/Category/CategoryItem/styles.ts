import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 16px)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover',
  },
  header: {
    padding: '17px 17px 0px 17px',
  },
  name: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '44.9069px',
    lineHeight: '140%',
    marginBottom: 4,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
    },
  },
  whiteText: {
    color: '#FFFF',
  },
  blackText: {
    color: '#000',
  },
  description: {
    fontfamily: 'Poppins',
    fontWeight: 400,
    fontSize: '14.969px',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    padding: '0px 8px 17px 8px',
  },
  label: {
    width: 'auto',
    minWidth: '75px',
    height: '27px',
    borderRadius: '16px',
    padding: '4px',
    marginRight: '9px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  whiteBgColor: {
    backgroundColor: '#FFFFFF',
  },
  blackBgColor: {
    backgroundColor: '#000',
  },
  icon: {
    paddingLeft: 5,
  },
  ethIcon: {
    width: '7px',
    height: '11px',
  },
  content: {
    width: 'auto',
    height: '17px',
    fontWeight: 600,
    fontSize: '12px',
    marginLeft: 6,
    marginRight: 6,
  },
  textLabel: {
    fontSize: '12px',
    fontWeight: 400,
    marginRight: '4px',
  },
  secondIcon: {
    width: '11px',
    height: '11px',
  },
  iconItem: {
    width: '11px',
    height: '11px',
  },
}));
