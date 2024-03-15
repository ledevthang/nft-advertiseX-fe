import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  noWrapContainer: {
    flexWrap: 'wrap',
  },
  expandedMenu: {
    marginBottom: 16,
  },
  defaultCatItem: {
    display: 'flex',
    width: 'auto',
    padding: '5px 4px',
    borderRadius: '16px',
    border: '1px solid #6F6BC5',
    alignItems: 'center',
    // [theme.breakpoints.down('md')]: {
    //   marginBottom: 8,
    //   marginRight: 0,
    // },
  },
  notLastDefaultCateItem: {
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  defaultCatName: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '140%',
    color: '#6F6BC5',
    paddingRight: 6,
  },
  defaultCatNumberItem: {
    marginLeft: 'auto',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '140%',
    color: '#6F6BC5',
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
  },
  arrowDownIconOutnerContainer: {
    alignItems: 'center',
  },
  arrowDownIconInnnerContainer: {
    marginLeft: 'auto',
    cursor: 'pointer',
    '& svg': {
      marginLeft: 'auto',
    },
  },
  upArrow: {
    '& svg': {
      rotate: '180deg',
    },
  },
  catItem: {
    padding: '16px 8px',
    borderBottom: '1px solid #ECEBEC',
    alignItems: 'center',
  },
  header: {
    padding: '16px 8px',
  },
  pathLabel: {
    width: 'calc(100% - 208px)',
  },
  positionLabel: {
    width: 208,
  },
  catAvatar: {
    width: 28,
  },
  avatarInList: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  catName: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '140%',
    color: '#100113',
    textTransform: 'uppercase',
    width: 'calc(100% - 240px)',
  },
  position: {
    width: 140,
  },
  fontStyle: {
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '140%',
    color: '#100113',
  },
  closeIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
  },
  closeIcon: {
    cursor: 'pointer',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '140%',
    paddingBottom: 16,
  },
  tableMobile: {
    marginTop: 24,
    paddingTop: 24,
    borderTop: '1px solid #100113',
  },
}));
