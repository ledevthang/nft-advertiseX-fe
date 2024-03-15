import { makeStyles } from '@material-ui/styles';
import theme from 'material';

export const useStyles = makeStyles(() => ({
  container: {},
  item: {
    marginRight: 32,
    [theme.breakpoints.between(744, 1440)]: {
      marginRight: 37,
    },
    '& input': {
      fontWeight: 700,
    },
  },
}));
