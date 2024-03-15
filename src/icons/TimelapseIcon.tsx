import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function TimelapseIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 10 11"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.76683 3.73325C6.27933 3.24575 5.64183 2.99992 5.00016 2.99992V5.49992L3.2335 7.26659C4.2085 8.24159 5.79183 8.24159 6.771 7.26659C7.746 6.29159 7.746 4.70825 6.76683 3.73325ZM5.00016 1.33325C2.70016 1.33325 0.833496 3.19992 0.833496 5.49992C0.833496 7.79992 2.70016 9.66659 5.00016 9.66659C7.30016 9.66659 9.16683 7.79992 9.16683 5.49992C9.16683 3.19992 7.30016 1.33325 5.00016 1.33325ZM5.00016 8.83325C3.1585 8.83325 1.66683 7.34159 1.66683 5.49992C1.66683 3.65825 3.1585 2.16659 5.00016 2.16659C6.84183 2.16659 8.3335 3.65825 8.3335 5.49992C8.3335 7.34159 6.84183 8.83325 5.00016 8.83325Z"
        fill={color}
        fillOpacity="0.6"
      />
    </SvgIcon>
  );
}

export default memo(TimelapseIcon);
