import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useStyle } from './style';

export interface ICTAComponentProps {
  headTitle: string;
  subHeadTitle: string;
  firstTitleButton: string;
  secondTitleButton: string;
  iconButton?: ReactElement;
  iconPosition?: 'start' | 'end';
  handleClickFirstBtn?: () => void;
  handleClickSecondBtn?: () => void;
}

const CTAComponent: React.FC<ICTAComponentProps> = (
  props: ICTAComponentProps,
) => {
  const {
    headTitle,
    subHeadTitle,
    firstTitleButton,
    secondTitleButton,
    handleClickFirstBtn,
    handleClickSecondBtn,
    iconButton,
    iconPosition,
  } = props;
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <div className={classes.direct}>
        <Typography className={classes.head}>{headTitle}</Typography>
        <Typography className={classes.subHead}>{subHeadTitle}</Typography>
        <div className={classes.btn}>
          <button className={classes.homeButton} onClick={handleClickFirstBtn}>
            {firstTitleButton}
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              className={classes.addButton}
              onClick={handleClickSecondBtn}
            >
              {iconButton}
              <Typography
                style={{ order: `${iconPosition === 'end' ? -1 : 1}` }}
              >
                {secondTitleButton}
              </Typography>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAComponent;
