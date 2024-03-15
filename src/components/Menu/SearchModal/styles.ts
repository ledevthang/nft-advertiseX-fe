import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) => ({
  wrapInputSearch: {
    width: '70%',
    '& .MuiGrid-root .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root':
      {
        height: '60px',
        border: '1px solid #100113',
      },
    '& .MuiGrid-root .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root fieldset':
      {
        border: '0px',
      },
    '& .MuiGrid-root .MuiAutocomplete-root .MuiFormControl-root': {
      margin: '0px',
    },
  },
  wrapInputSearchActive: {
    width: '100%',
    '& .MuiGrid-root .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root':
      {
        height: '60px',
        border: '1px solid #100113',
      },
    '& .MuiGrid-root .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root fieldset':
      {
        border: '0px',
      },
    '& .MuiGrid-root .MuiAutocomplete-root .MuiFormControl-root': {
      margin: '0px',
    },
  },
  itemMenu: {
    width: '100%',
    height: '58px',
    lineHeight: '58px',
    color: '#100113',
    fontSize: '16px',
    fontWeight: 400,
    paddingLeft: '8px',
    '&:hover': {
      backgroundColor: '#F5F5F6',
      fontWeight: 600,
    },
  },
  icon: {
    display: 'flex',
    paddingLeft: '8px',
    '& a': {
      marginRight: '16px',
    },
  },
  wrapModal: {
    position: 'fixed',
    left: '15%',
    width: '85%',
    height: '100%',
    backgroundColor: 'white',
    padding: '16px',
    overflowY: 'auto',
    [theme.breakpoints.between('md', 1281)]: {
      width: '60%',
      left: 0,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      display: 'none',
      overflow: 'visible',
    },
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      width: '0px',
    },
  },
  wrapIconClose: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  },
  wrapMenuSearch: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderSearch: {
    height: '24px',
    width: '1px',
    backgroundColor: '#D9D6D9',
  },
  wrapMenu: {
    marginTop: '24px',
  },
  borderTopIcon: {
    width: '100%',
    height: '1px',
    backgroundColor: '#F5F5F6',
    margin: '24px 0px',
  },
  borderBottomIcon: {
    width: '100%',
    height: '1px',
    backgroundColor: '#F5F5F6',
    margin: '24px 0px 32px 0px',
  },
  wrapButtonConnect: {
    width: '100%',
    height: '60px',
    marginBottom: '32px',
    backgroundColor: '#6F6BC5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginRight: '8px',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '16px',
    '& img': {
      objectFit: 'cover',
      borderRadius: '50%',
      outline: '4px solid rgba(255, 255, 255, 0.32)',
      outlineOffset: '-4px',
    },
  },
  wallet: {
    fonWeight: 400,
    fontSize: 12,
    textAlign: 'left',
    lineHeight: '140%',
  },
  addressWallet: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#100113',
  },
  wrapInforUser: {
    display: 'flex',
    height: '64px',
    width: '100%',
    alignItems: 'center',
    marginBottom: '32px',
  },
  wrapDisConnect: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #8C89D1',
    marginBottom: '32px',
  },
  textDisConnect: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#6F6BC5',
    marginRight: '8px',
  },
  itemNotication: {
    display: 'flex',
    width: '100%',
    height: '60px',
    alignItems: 'center',
    paddingLeft: '8px',
    border: 'none',
    background: 'transparent',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  textNotication: {
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: 400,
    color: '#100113',
    fontFamily: 'Poppins',
  },
  avatarIcon: {
    width: 52,
    height: 52,
    border: '4px solid #ECEBEC',
  },
}));
