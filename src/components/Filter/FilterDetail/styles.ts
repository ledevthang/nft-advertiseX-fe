import { makeStyles } from '@material-ui/core';

interface IStyle {
  isExpand: boolean;
  isDropdown: boolean;
  isDeadzone: boolean | undefined;
  type: string;
  isCategoriesHasItem: boolean;
  isCategoryType: boolean;
}

export const useStyles = makeStyles((theme) => ({
  main: {
    width: ({ isExpand }: IStyle) => (isExpand ? 332 : 60),
    minWidth: 60,
    transition: 'all .2s linear',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: ({ isExpand }: IStyle) => (isExpand ? 251 : 60),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    margin: '16px 0px',
    backgroundColor: ({ isDeadzone, isCategoriesHasItem, isExpand }: IStyle) =>
      isDeadzone
        ? '#DDE542'
        : isCategoriesHasItem && !isExpand
        ? '#6F6BC5'
        : '#FFFFFF',
    border: ({ isCategoryType }: IStyle) =>
      isCategoryType ? '1px solid #6F6BC5' : '1px solid #100113',
    '&>svg:first-child': {
      marginLeft: 17,
    },
    '&>svg:nth-child(2)': {
      marginLeft: -3,
      marginTop: -3,
    },
    [theme.breakpoints.down('sm')]: {
      border: ({ isCategoryType }: IStyle) =>
        isCategoryType ? '1px solid #6F6BC5' : '1px solid #100113',
    },
  },
  categoryHeader: {
    '&>svg:first-child': {
      marginLeft: 18.765,
      marginTop: 3.7,
    },
  },
  selectData: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ({ isCategoryType }: IStyle) =>
      isCategoryType ? '#6F6BC5' : '#100113',
    borderRadius: 16,
    width: 'fit-content',
    padding: '6px 4px 6px 16px',
    marginLeft: 8,
    height: 24,
    '& p': {
      color: '#FFFFFF',
      maxWidth: 130,
      fontSize: 14,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: 500,
    },
    '& button': {
      padding: 0,
      marginLeft: 8,
    },
    [theme.breakpoints.down('sm')]: {
      '& p': {
        maxWidth: 130,
        fontSize: 14,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 500,
        color: ({ isCategoryType }: IStyle) =>
          isCategoryType ? '#FFFFFF' : '#100113',
      },
      backgroundColor: ({ isCategoryType }: IStyle) =>
        isCategoryType ? '#6F6BC5' : 'rgba(16, 1, 19, 0.08)',
    },
  },
  btnDrop: {
    minWidth: 40,
    height: 60,
    padding: '0px 16px 0px 8px',
    color: ({ isCategoryType }: IStyle) =>
      isCategoryType ? '#6F6BC5' : '#100113',
    '& span': {
      transform: ({ isDropdown }: { isDropdown: boolean; isExpand: boolean }) =>
        `rotate(${isDropdown ? 180 : 0}deg)`,
    },
  },
  listSelectItems: {
    flexGrow: 1,
    display: 'flex',
    overflow: 'scroll',
    marginLeft: 8,
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  selectAll: {
    backgroundColor: 'rgba(16, 1, 19, 0.08)',
    borderRadius: 16,
    fontSize: 14,
    padding: '6px 16px 6px 16px',
    height: 24,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
  },
  selectAllCategories: {
    backgroundColor: 'rgba(111, 107, 197, 0.16)',
  },
  search: {
    width: 300,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    margin: '0px 16px 16px 16px',
    '& input::placeholder': {
      fontSize: 16,
      color: 'rgba(28, 2, 34, 0.4)',
      fontWeight: 500,
      lineHeight: 12,
    },
    '& input': {
      padding: '0px 0px 0px 16px',
      letterSpacing: '0.015em',
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down('md')]: {
      width: 219,
    },
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 32px )',
    },
  },
  wrapperDetail: {
    maxHeight: 256,
    [theme.breakpoints.down('md')]: {
      maxHeight: 192,
    },
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      '&>.MuiBox-root': {
        borderTop: '0px',
        borderBottom: '1px solid #100113',
      },
    },
  },
  chainText: {
    '& p': {
      textTransform: 'capitalize',
    },
  },
  loader: {
    height: 41,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
