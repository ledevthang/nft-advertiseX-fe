import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function AddForMenuIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" />
    </SvgIcon>
  );
}

export default memo(AddForMenuIcon);
