import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function ArrowDownIcon(props: IIconProperty) {
  const { width, height } = props;

  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 12 8"
      style={{ transform: 'scale(1)', width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
        fill="#100113"
      />
    </SvgIcon>
  );
}

export default memo(ArrowDownIcon);
