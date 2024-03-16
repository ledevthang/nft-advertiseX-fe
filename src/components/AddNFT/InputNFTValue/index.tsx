import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  Box,
  Typography,
  OutlinedInput,
  useTheme,
  useMediaQuery,
  ClickAwayListener,
} from '@material-ui/core';
import clsx from 'clsx';
import isNil from 'lodash/isNil';
import { isStringNumber } from 'utils/validateAddNFT';
import EthIcon from 'icons/EthIcon';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import EthBlackSmallIcon from 'icons/EthBlackSmallIcon';
import { CurrencyUnitEnum } from 'enums/addNft';
import { GetNftEstimateParams } from 'types/addNft';
import { useStyles } from './styles';
import { InputEstimateParamsEnum } from 'enums/addNft';

export interface IInputNFTValue {
  label: string;
  value?: string;
  unit: CurrencyUnitEnum;
  placeholder?: string;
  disableChangeUnit?: boolean;
  className?: string;
  onChange: (params: GetNftEstimateParams) => void;
}

export default function InputNFTValue(props: IInputNFTValue) {
  const {
    label,
    value,
    unit,
    placeholder,
    className,
    disableChangeUnit,
    onChange,
  } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles(props);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md')) && !isDesktop;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const valueInputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  const handleOpenMenu = useCallback(() => {
    if (disableChangeUnit) return;
    setOpen((open) => !open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpen]);

  const handleClickAway = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (isNil(newValue) || newValue === '') {
        onChange({
          nftValue: newValue,
          changeUnit: false,
          lastEditInput: InputEstimateParamsEnum.NFT_VALUE,
        });
      } else {
        if (!isStringNumber(newValue)) {
          onChange({
            nftValue: isNil(value) ? '' : value,
            changeUnit: false,
            lastEditInput: InputEstimateParamsEnum.NFT_VALUE,
          });
          return;
        }

        onChange({
          nftValue: newValue.replace(',', '.'),
          changeUnit: false,
          lastEditInput: InputEstimateParamsEnum.NFT_VALUE,
        });
      }
      setCursor(event.target.selectionStart);
    },
    [value, onChange],
  );

  const handleSelectUnit = useCallback(
    (event: React.MouseEvent<HTMLElement>, unit: CurrencyUnitEnum) => {
      event.stopPropagation();
      setOpen(false);
      onChange({ nftUnit: unit, changeUnit: true });
    },
    [setOpen, onChange],
  );

  const handleBlur = () => {
    if (value?.charAt(0) === '.') {
      onChange({
        nftValue: Number(value).toString(),
        changeUnit: false,
        lastEditInput: InputEstimateParamsEnum.NFT_VALUE,
      });
    }
  };

  const currencyMenu = useMemo(
    () => (
      <div className={classes.menu}>
        <div
          className={classes.menuItem}
          onClick={(ev) => handleSelectUnit(ev, CurrencyUnitEnum.ETH)}
        >
          <EthBlackSmallIcon width={12} height={11} />
          <span className={classes.unit}>ETH</span>
        </div>
      </div>
    ),
    [classes, handleSelectUnit],
  );

  const selectedCurrency = useMemo(
    () => (
      <>
        {unit === CurrencyUnitEnum.ETH && (
          <EthIcon width={isDesktop ? 12 : 7.42} height={isDesktop ? 16 : 12} />
        )}
        <span
          className={clsx(
            { [classes.unitDeskop]: isDesktop },
            { [classes.unitTabletAndMoblie]: !isDesktop },
          )}
        >
          {unit}
        </span>
      </>
    ),
    [unit, isDesktop, classes],
  );

  const endAdornment = useMemo(
    () => (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={clsx(
            classes.endAdornment,
            { [classes.endAdornmentMoblie]: isMobile },
            { [classes.endAdornmentTablet]: isTablet },
            { [classes.endAdornmentDeskop]: isDesktop },
          )}
          onClick={handleOpenMenu}
        >
          <div className={classes.endAdornmentLabel}>
            {selectedCurrency}
            <ArrowDownIcon
              width={isDesktop ? 13 : 8}
              height={isDesktop ? 7.41 : 4.94}
              color={theme.colors.pureWhite}
            />
          </div>
          {open && currencyMenu}
        </div>
      </ClickAwayListener>
    ),
    [
      classes,
      isDesktop,
      isTablet,
      isMobile,
      theme.colors.pureWhite,
      open,
      currencyMenu,
      selectedCurrency,
      handleOpenMenu,
      handleClickAway,
    ],
  );

  useEffect(() => {
    const input = valueInputRef.current;
    if (input && input === document.activeElement)
      input.setSelectionRange(cursor, cursor);
  }, [value, cursor]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.label}>{label}</Typography>
      <OutlinedInput
        value={value}
        placeholder={placeholder}
        className={clsx(
          classes.root,
          className,
          { [classes.rootDeskop]: isDesktop },
          { [classes.rootTablet]: isTablet },
          { [classes.rootMoblie]: isMobile },
        )}
        endAdornment={endAdornment}
        classes={{
          root: classes.root,
          notchedOutline: classes.notchedOutline,
          focused: classes.focused,
        }}
        onChange={handleChangeValue}
        inputProps={{
          inputMode: 'decimal',
        }}
        onBlur={handleBlur}
        inputRef={valueInputRef}
      />
    </Box>
  );
}
