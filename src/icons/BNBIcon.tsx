import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function BNBIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 12 13"
      style={{ transform: 'scale(1)', width, height }}
      fill="none"
    >
      <path
        d="M6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5Z"
        fill="#0B0E11"
      />
      <path
        d="M4.31727 5.80854L6.00035 4.12549L7.68429 5.80942L8.66362 4.83005L6.00035 2.16675L3.33792 4.82919L4.31727 5.80854ZM2.64637 5.52066L3.6257 6.5L2.64632 7.47939L1.66699 6.50005L2.64637 5.52066ZM4.31727 7.19161L6.00035 8.87461L7.68425 7.19076L8.66414 8.16961L8.66362 8.17011L6.00035 10.8334L3.33788 8.17099L3.33652 8.16964L4.31727 7.19161ZM10.3338 6.50017L9.35442 7.4795L8.37509 6.50017L9.35442 5.52084L10.3338 6.50017Z"
        fill="#F0B90B"
      />
      <path
        d="M6.99348 6.49942H6.99393L6.00014 5.50562L5.00586 6.49989L5.00721 6.50128L6.00014 7.49421L6.99439 6.49989L6.99348 6.49942Z"
        fill="#F0B90B"
      />
    </SvgIcon>
  );
}

export default memo(BNBIcon);
