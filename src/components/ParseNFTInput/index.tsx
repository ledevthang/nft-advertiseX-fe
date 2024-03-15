/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import LinkIcon from 'icons/LinkIcon';
import ArrowForward from 'icons/ArrowForward';
import RefreshIcon from 'icons/RefreshIcon';
import {
  getNFTPreviewAction,
  resetNFTPreviewAction,
} from 'store/actions/nftActions';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import CheckCircle from 'icons/CheckCircle';
import CloseIcon from 'icons/CloseIcon';

interface IParseNFTInput {
  value: string;
  className?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  noChange?: boolean;
  setLink?: (value: string) => void;
  refresh?: boolean;
  borderNone?: boolean;
  pasreLinkPress?: (press: boolean) => void;
}

const ParseNFTInput = ({
  value,
  onChange,
  className,
  placeholder,
  error,
  disabled,
  noChange,
  setLink,
  refresh,
  borderNone,
  pasreLinkPress,
}: IParseNFTInput) => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onParseNFTLink = useCallback(() => {
    dispatch(getNFTPreviewAction({ link: value }));
    setIsRefresh(true);
    if (pasreLinkPress) pasreLinkPress(true);
  }, [dispatch, value]);

  const handlePressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        dispatch(getNFTPreviewAction({ link: value }));
        setIsRefresh(true);
        if (pasreLinkPress) pasreLinkPress(true);
      }
    },
    [dispatch, value],
  );

  const onRefresh = useCallback(() => {
    dispatch(getNFTPreviewAction({ link: value }));
  }, [dispatch]);

  useEffect(() => {
    setIsRefresh(false);
  }, [value]);

  const renderStartAdornment = useMemo(() => {
    if (_.isUndefined(error))
      return (
        <Box className={clsx(classes.startAdornment, 'center-root')}>
          <LinkIcon />
        </Box>
      );
    if (!error)
      return (
        <Box className={clsx(classes.startAdornment, 'center-root')}>
          <CheckCircle color="#6F6BC5" />
        </Box>
      );
    return;
  }, [error, classes]);

  const clearForm = useCallback(() => {
    setLink?.('');
    dispatch(resetNFTPreviewAction());
    setIsRefresh(false);
    if (pasreLinkPress) pasreLinkPress(false);
  }, []);

  const renderEndAdornment = useMemo(
    () => (
      <>
        {error && (
          <Box mr={2} onClick={clearForm} style={{ cursor: 'pointer' }}>
            <CloseIcon color="#ED5050" />
          </Box>
        )}
        <Button
          className={clsx('center-root', classes.endAdornment)}
          onClick={refresh ? onRefresh : onParseNFTLink}
        >
          {refresh ? (
            <RefreshIcon color="#FFFFFF" />
          ) : isRefresh ? (
            <RefreshIcon color="#FFFFFF" />
          ) : (
            <ArrowForward color="#FFFFFF" />
          )}
        </Button>
      </>
    ),
    [error, classes, isRefresh, onParseNFTLink, clearForm],
  );

  return (
    <OutlinedInput
      value={value}
      onChange={onChange}
      className={clsx(classes.root, className)}
      startAdornment={renderStartAdornment}
      endAdornment={noChange ? null : renderEndAdornment}
      classes={{
        root: classes.root,
        notchedOutline: borderNone
          ? classes.noneBorder
          : classes.notchedOutline,
        focused: classes.focused,
      }}
      placeholder={placeholder}
      disabled={disabled}
      onKeyDown={handlePressEnter}
    />
  );
};

export default ParseNFTInput;

const useStyles = makeStyles(() => ({
  root: {
    height: 60,
    padding: 0,
    width: '100%',
    borderRadius: 0,
    marginBottom: 36,
    '& input': {
      height: 0,
      fontSize: 14,
    },
    '&$focused $notchedOutline': {
      borderWidth: 1,
      borderColor: '#100113',
    },
    '& input::placeholder': {
      fontSize: 14,
      color: 'rgba(16, 1, 19, 0.6)',
      fontWeight: 500,
    },
  },
  startAdornment: {
    width: 76,
    height: '100%',
  },
  endAdornment: {
    width: 60,
    height: '100%',
    backgroundColor: '#100113',
    borderRadius: 0,
  },
  notchedOutline: {
    borderColor: `#100113 !important`,
  },
  noneBorder: {
    border: 'none',
    outline: 'none',
  },
  focused: {
    borderColor: `yellow`,
  },
}));
