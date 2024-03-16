import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonDialog from 'components/common/CommonDialog';
import CloseIcon from 'icons/CloseIcon';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getDialogState } from 'store/selectors';
import { useStyles } from './styles';

export default function TextFieldMessageDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const { props } = useSelector(getDialogState);

  const onClose = () => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  };

  const redirectTo = useCallback(
    (path: string) => {
      dispatch(
        updateDialogStateAction({
          open: false,
        }),
      );
      history.push(path);
    },
    [dispatch, history],
  );

  return (
    <CommonDialog isOverridden>
      <Box className={clsx(classes.conatiner, 'center-root')}>
        <Box className={classes.wrapper}>
          <Box className={classes.btnContainer}>
            <Button
              disableRipple
              className={classes.closeBtn}
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
          </Box>
          <Typography variant="h2" className={classes.title}>
            You listed your NFT successfully!
          </Typography>

          <img className={classes.media} src={props.imageUrl} alt="" />
          <div
            style={{
              margin: '20px 0',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '22px',
            }}
          >
            <a
              target="_blank"
              href={`https://minascan.io/berkeley/tx/${props.hash}?type=zk-tx`}
            >
              Go to Minascan
            </a>
          </div>
        </Box>
        <Box className={clsx(classes.wrapperBtn, 'center-root')}>
          <Button onClick={() => redirectTo('/')}>
            <Typography>HOME</Typography>
          </Button>
          <Button onClick={() => redirectTo('/user')}>
            <Typography>GO TO PROFILE</Typography>
          </Button>
        </Box>
      </Box>
    </CommonDialog>
  );
}
