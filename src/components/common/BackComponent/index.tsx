/* eslint-disable */
import React, { useCallback } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from 'icons/ArrowBackIcon';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

interface IBackComponent {
  disableBtnLabel?: boolean;
  label?: string;
  isDeadzone?: boolean;
  onClick?: () => void;
}

const BackComponent = (props: IBackComponent) => {
  const { disableBtnLabel, label, isDeadzone, onClick } = props;
  const classes = useStyles({ isDeadzone });
  const history = useHistory();

  const onBack = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      history.goBack();
    }
  }, [onClick]);

  return (
    <Box className={classes.container}>
      <Button onClick={onBack}>
        <ArrowBackIcon />
        {!disableBtnLabel && <Typography>Back</Typography>}
      </Button>
      {label && <Typography>{label}</Typography>}
    </Box>
  );
};

export default BackComponent;
