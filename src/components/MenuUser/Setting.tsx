import { Box, makeStyles, Typography } from '@material-ui/core';
import HelpOutline from 'icons/HelpOutline';
import NotificationsNone from 'icons/NotificationsNone';
import PrivacyTip from 'icons/PrivacyTip';
import SettingListItem from './SettingListItem';

interface ISetting {
  setStateSetting: (state: string) => void;
}

const Setting = ({ setStateSetting }: ISetting) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.label}>Settings</Typography>
      <Box>
        {settings.map((s) => (
          <SettingListItem
            key={s.label}
            id={s.id}
            StartAdornment={<s.StartAdornment />}
            label={s.label}
            setStateSetting={setStateSetting}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Setting;

const settings = [
  {
    StartAdornment: NotificationsNone,
    label: 'Notifications',
    id: 'notification',
  },
  {
    StartAdornment: PrivacyTip,
    label: 'Privacy',
    id: 'privacy',
  },
  {
    StartAdornment: HelpOutline,
    label: 'Help',
    id: 'help',
  },
];

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 700,
    fontSize: 16,
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
    },
    marginBottom: 32,
  },
}));
