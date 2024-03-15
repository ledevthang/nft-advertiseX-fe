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

  const metadata = useMemo(() => {
    if (!props) return;
    const metadata = JSON.parse(props.metadata);
    return metadata;
  }, [props]);

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
            {props.isAdded
              ? 'You listed your NFT successfully!'
              : 'You edited your settings successfully!'}
          </Typography>
          {metadata.ext === 'webm' || metadata.ext === 'mp4' ? (
            <Box className={classes.media}>
              <video
                controls
                preload="auto"
                loop
                className={classes.media}
                playsInline
              >
                <source
                  src={`${props.imageUrl}#t=0.001`}
                  type={metadata.contentType}
                />
              </video>
            </Box>
          ) : (
            <img className={classes.media} src={props.imageUrl} alt="" />
          )}
          {props.isAdded && (
            <Typography variant="body1" className={classes.subtitle}>
              Track and edit your position in your profile. We’ll notify you
              when there are updates on your listing.
            </Typography>
          )}
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
