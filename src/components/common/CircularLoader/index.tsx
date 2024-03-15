import React, { useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { styles } from './styles';

/**
 * CircularLoader
 * Render circular loading spinner / loader
 */
export enum CircularLoaderTypeEnum {
  FULL_LAYOUT = 'FULL_LAYOUT',
  FULL_CONTENT = 'FULL_CONTENT',
}

export interface ICircularLoader {
  className?: string;
  circularProgressProps?: CircularProgressProps;
  loading?: boolean;
  type?: CircularLoaderTypeEnum;
}

export default function CircularLoader(props: ICircularLoader) {
  const {
    circularProgressProps = { size: 50, color: 'secondary' },
    className,
    loading = true,
    type = CircularLoaderTypeEnum.FULL_LAYOUT,
  } = props;
  const classes = styles();

  const rootClassname = useMemo(
    () =>
      clsx(
        className,
        loading ? classes.isLoading : classes.isHidden,
        type === CircularLoaderTypeEnum.FULL_LAYOUT
          ? classes.fullLayout
          : classes.fullContent,
      ),
    [classes, className, loading, type],
  );

  const onClick = useCallback((event: React.MouseEvent) => {
    event.nativeEvent.stopImmediatePropagation();
  }, []);

  return (
    <div
      className={rootClassname}
      data-testid="circularLoader"
      onMouseDown={onClick}
      onClick={onClick}
    >
      <Fade in={loading}>
        <CircularProgress {...circularProgressProps} />
      </Fade>
    </div>
  );
}
