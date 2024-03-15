import lightBlue from '@material-ui/core/colors/lightBlue';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const overrides = {
  MuiIconButton: {
    root: {
      '&:hover': {
        backgroundColor: 'none',
      },
    },
  },
  MuiButton: {
    root: {
      borderRadius: 0,
      '&:hover': 'none',
    },
  },
  MuiCssBaseline: {
    '@global': {
      '*::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: '#100113',
        border: '3px solid white',
      },
      '*::-webkit-scrollbar-thumb': {
        background: '#FFFFFF',
        border: '1px solid #100113',
        borderRadius: '4px',
        boxShadow:
          '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  MuiAutocomplete: {
    paper: {
      overflowY: 'scroll',
      backgroundColor: '#fff',
      maxHeight: '60vh',
      borderRadius: 0,
      'box-shadow':
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)',
      '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
        width: '0px',
      },
      '& .MuiAutocomplete-groupLabel': {
        backgroundColor: 'white',
        paddingLeft: '24px',
      },
      '& .MuiAutocomplete-option': {
        height: '50px',
        lineHeight: '50px',
      },
      [breakpoints.down('sm')]: {
        maxHeight: '200px',
      },
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: lightBlue.A200,
    },
  },
  MuiPickersCalendarHeader: {
    iconButton: {
      backgroundColor: 'white',
    },
  },
  MuiPickerDTTabs: {
    tabs: {
      backgroundColor: lightBlue.A200,
    },
  },
  switchHeader: {
    // backgroundColor: 'unset',
    color: 'white',
  },
  MuiPickersDay: {
    day: {
      color: lightBlue.A700,
    },
    daySelected: {
      backgroundColor: lightBlue['400'],
    },
    dayDisabled: {
      color: lightBlue['100'],
    },
    current: {
      color: lightBlue['900'],
    },
  },

  MuiPickersModal: {
    dialogRoot: {
      backgroundColor: 'white',
    },
    dialogAction: {
      color: lightBlue['400'],
    },
  },
};

export default overrides;
