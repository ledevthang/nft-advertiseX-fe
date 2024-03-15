import React, { useMemo, useCallback, useState } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from 'icons/ArrowDownIcon';
import { useMediaQuery, useTheme, ClickAwayListener } from '@material-ui/core';
import { useStyles } from './styles';

export interface OptionItem {
  key: string;
  label: string;
}
export interface IMenuComponent {
  options: OptionItem[];
  selectedOption: OptionItem;
  className: string;
  onChange: (params: OptionItem) => void;
}

function MenuComponent(props: IMenuComponent) {
  const { options, selectedOption, className, onChange } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const handleClickAway = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSelectOption = useCallback(
    (event: React.MouseEvent<HTMLElement>, option: OptionItem) => {
      event.stopPropagation();
      setOpen(false);
      onChange(option);
    },
    [setOpen, onChange],
  );

  const Options = useMemo(() => {
    return options.map((op) => (
      <div
        className={clsx(classes.menuItem, {
          [classes.selectedItem]: op.key === selectedOption.key,
        })}
        onClick={(event) => handleSelectOption(event, op)}
      >
        {op.label}
      </div>
    ));
  }, [options, selectedOption, classes, handleSelectOption]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={clsx(classes.root, className)}>
        <div className={clsx(classes.label, className)} onClick={handleClick}>
          {selectedOption.label}
          <ArrowDownIcon
            width={isDesktop ? 13 : 8}
            height={isDesktop ? 10.41 : 8.94}
            color={theme.colors.purple1}
          />
        </div>
        {open && <div className={classes.menu}>{Options}</div>}
      </div>
    </ClickAwayListener>
  );
}

export default MenuComponent;
