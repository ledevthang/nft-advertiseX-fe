import { Box, makeStyles, Typography } from '@material-ui/core';
import KeyboardArrowRight from 'icons/KeyboardArrowRight';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

interface ISettingListItem {
  StartAdornment: ReactElement;
  label: string;
  id: string;
  setStateSetting: (state: string) => void;
}

const SettingListItem = ({
  StartAdornment,
  label,
  id,
  setStateSetting,
}: ISettingListItem) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    if (id === 'privacy') {
      history.push('/terms-of-service', { signal: 'dau xanh rau ma' });
      return;
    } else if (id === 'help') {
      history.push('/faq/all');
      return;
    }
    setStateSetting(id);
  };
  return (
    <Box className={classes.main} onClick={handleClick}>
      {StartAdornment}
      <Typography>{label}</Typography>
      <KeyboardArrowRight />
    </Box>
  );
};

export default SettingListItem;

const useStyles = makeStyles((theme) => ({
  main: {
    height: 56,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: 24,
      height: 24,
    },
    '& p': {
      fontSize: 16,
      fontWeight: 400,
      marginLeft: 16,
    },
    '& svg:last-child': {
      marginLeft: 'auto',
    },
  },
}));
