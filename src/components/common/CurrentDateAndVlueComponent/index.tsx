import React, { useMemo } from 'react';
import { Box, Typography, Tooltip } from '@material-ui/core';
import TimeBox from './TimeBox';
import ValueBox from './ValueBox';
import EthIcon from 'icons/EthIcon';
import BNBIcon from 'icons/BNBIcon';
import MaticIcon from 'icons/MaticIcon';
import FtmIcon from 'icons/FtmIcon';
import AVAXIcon from 'icons/AVAXIcon';
import { CurrencyUnitEnum } from 'enums/addNft';
import { useStyle } from './style';
import { findPrecision } from 'utils/validateAddNFT';
import { isNil } from 'lodash';
export interface CurrentInfo {
  months?: string;
  days?: string;
  hours?: string;
  pricePerDay?: number;
  unit?: string;
  value?: number;
}

export interface Props {
  currentInfo?: CurrentInfo;
  minPrice?: string;
}

function CurrentDateAndValueComponent({ currentInfo, minPrice }: Props) {
  const classes = useStyle();

  const coinIcon = useMemo(() => {
    switch (currentInfo?.unit) {
      case CurrencyUnitEnum.BNB:
        return <BNBIcon width={12} height={20} color={'#6F6BC5'} />;
      case CurrencyUnitEnum.MATIC:
        return <MaticIcon width={12} height={20} color={'#6F6BC5'} />;
      case CurrencyUnitEnum.ETH:
        return <EthIcon width={12} height={20} color={'#6F6BC5'} />;
      case CurrencyUnitEnum.AVAX:
        return <AVAXIcon width={12} height={20} color={'#6F6BC5'} />;
      default:
        return <FtmIcon width={12} height={20} color={'#6F6BC5'} />;
    }
  }, [currentInfo]);

  const coinValue = useMemo(() => {
    const value = currentInfo?.value;
    if (isNil(value)) return null;

    if (value.toString().includes('e')) {
      const precision = findPrecision(value);
      return value.toFixed(precision || 0);
    }
    return value;
  }, [currentInfo]);
  return (
    <Box display={'flex'} className={classes.container}>
      <Box display={'flex'}>
        <TimeBox label={'Months'} value={currentInfo?.months} />
        <TimeBox label={'Days'} value={currentInfo?.days} />
        <TimeBox
          label={'Hours'}
          value={currentInfo?.hours}
          className={classes.lastTimeBox}
          classes={{
            valueBox: classes.hourTimeBox,
          }}
        />
      </Box>
      <Box display={'flex'} className={classes.valueRow}>
        <ValueBox label={'Value'}>
          <Box
            display={'flex'}
            alignItems={'center'}
            className={classes.ethValueBox}
          >
            {coinIcon}
            <Tooltip
              title={currentInfo?.value ? currentInfo.value.toString() : ''}
            >
              <Typography className={classes.value}>{coinValue}</Typography>
            </Tooltip>
          </Box>
        </ValueBox>
        <ValueBox label={'Price per day'}>
          <Box className={classes.priceValueBox}>
            <Typography className={classes.priceValueBoxPrice}>
              {!isNil(currentInfo?.pricePerDay)
                ? `$${Number(currentInfo?.pricePerDay).toFixed(2)}`
                : '--'}
            </Typography>
            <Typography className={classes.priceValueBoxPricePerDay}>
              Minimum day price ${Number(minPrice)?.toFixed(2) || 0.1}
            </Typography>
          </Box>
        </ValueBox>
      </Box>
    </Box>
  );
}

export default CurrentDateAndValueComponent;
