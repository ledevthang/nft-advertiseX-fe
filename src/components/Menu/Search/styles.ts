import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapSearchScroll: {
    width: '285px',
    height: '48px',
    border: '0px',
    '& .MuiAutocomplete-root': {
      height: '48px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root': {
      marginTop: '0px',
      marginBottom: '0px',
      width: '285px',
      height: '48px',
      border: '1px solid #100113',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root ': {
      border: '0px',
      width: '285px',
      height: '48px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root fieldset':
      {
        border: '0px',
      },
  },
  wrapSearchScrollActive: {
    width: '100%',
    height: '48px',
    border: '0px',
    '& .MuiAutocomplete-root': {
      height: '48px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root': {
      marginTop: '0px',
      marginBottom: '0px',
      width: '100%',
      height: '48px',
      border: '1px solid #100113',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root ': {
      border: '0px',
      width: '100%',
      height: '48px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root fieldset':
      {
        border: '0px',
      },
  },
  wrapSearch: {
    width: '285px',
    height: '60px',
    border: '0px',
    '& .MuiAutocomplete-root': {
      height: '60px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root': {
      marginTop: '0px',
      marginBottom: '0px',
      width: '285px',
      height: '60px',
      border: '1px solid #100113',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root ': {
      border: '0px',
      width: '285px',
      height: '60px',
      padding: 0,
      paddingRight: '18px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root fieldset':
      {
        border: '0px',
      },
  },
  wrapSearchActive: {
    width: '100%',
    height: '60px',
    border: '0px',
    '& .MuiAutocomplete-root': {
      height: '60px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root': {
      marginTop: '0px',
      marginBottom: '0px',
      width: '100%',
      height: '60px',
      border: '1px solid #100113',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root ': {
      border: '0px',
      width: '100%',
      height: '60px',
    },
    '& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root fieldset':
      {
        border: '0px',
      },
  },
  wrapIconSearch: {
    height: '32px',
    '& .MuiSvgIcon-root': {
      margin: '0px 9px 0px 14px',
      color: 'rgba(16, 1, 19, 0.4)',
      fontSize: '32px',
    },
  },
  autocomplete: {
    width: '100%',
    '& .MuiInputBase-input': {
      color: '#000000 40%',
      fontSize: '16px',
      fontWeight: 500,
    },
    '& .MuiFormControl-root .MuiInputBase-root .MuiInputBase-input': {
      padding: 0,
      paddingBottom: '2px',
    },
  },
  listbox: {
    width: '100% !important',
    position: 'unset',
    borderRadius: '50px',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      width: 'calc(100% - 32px) !important',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 'calc(100% - 32px) !important',
    },
  },
  slash: {
    fontSize: '16px',
    fontWeight: 600,
  },
  slashMobile: {},
  wrapTextNFT: {
    paddingBottom: '2px',
  },
  textSearchNFT: {
    color: '#6F6BC5',
    fontSize: '16px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
  },
  iconClear: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  textSearchNFTScroll: {
    color: '#100113',
    fontSize: '16px',
    fontWeight: 700,
    marginRight: '10px',
  },
  imgSearch: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
  },
  valueSearch: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#100113',
    width: '90%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  categoryName: {
    width: '93.5%',
  },
  wrapListSearch: {
    padding: '4px 16px',
  },
  textGroup: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#706771',
    height: '41px',
    lineHeight: '41px',
  },
  wrapItemList: {
    display: 'flex',
    alignItems: 'center',
    height: '41px',
    '&:hover': {
      backgroundColor: '#F9F9FD',
      cursor: 'pointer',
    },
    borderTop: '1px solid #F5F5F6',
    '&:last-child': {
      borderBottom: '1px solid #F5F5F6',
    },
  },
  countItemList: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#8C89D1',
    textAlign: 'center',
    width: 32,
  },
  wrapIconClose: {
    width: 16,
    display: 'flex',
    marginRight: 12,
    alignItems: 'center',
    [theme.breakpoints.between(375, 1025)]: {
      marginLeft: '8px',
    },
  },
  wrapImgItem: {
    marginRight: '16px',
    '& .MuiAvatar-root': {
      width: '16px',
      height: '16px',
    },
  },
  wrapPrice: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    color: '#9F99A1',
    fontWeight: 600,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'center',
    width: 64,
  },
  renderRecent: {},
  hiddenRemove: {
    display: 'none',
  },
}));
