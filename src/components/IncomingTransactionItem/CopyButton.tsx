import React, { useState } from 'react';
import { ClickAwayListener, Tooltip, makeStyles } from '@material-ui/core';

interface ICopyButton {
  onCopy: () => void;
}

function CopyButton(props: ICopyButton) {
  const { onCopy } = props;
  const classes = useStyles();
  const [copied, setcopied] = useState<boolean>(false);

  const handleClickAway = () => {
    setcopied(false);
  };

  const handleCopy = () => {
    onCopy();
    setcopied(!copied);
  };

  return (
    <div className={classes.copyBtn}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Tooltip
          open={copied}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="copied"
        >
          <button onClick={handleCopy}>Copy</button>
        </Tooltip>
      </ClickAwayListener>
    </div>
  );
}

export default CopyButton;

const useStyles = makeStyles(() => ({
  copyBtn: {
    marginLeft: 10,
  },
}));
