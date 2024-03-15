import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CloseIcon from 'icons/CloseIcon';
import ImageGallery from 'icons/ImageGallery';
import React from 'react';
import { useStyles } from './style';

interface ICommonUploadFile {
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  file?: string;
  className?: string;
  onDeleteImage?: () => void;
  size?: string;
  name?: string;
}

const CommonUploadFile = ({
  label,
  onChange,
  file,
  className,
  onDeleteImage,
  size,
  name,
}: ICommonUploadFile) => {
  const classes = useStyles();
  return !file ? (
    <label className={clsx(classes.container, 'center-root', className)}>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
        name={name}
        accept="image/*"
      />
      <ImageGallery width={30} height={30} />
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.label}>{size}</Typography>
    </label>
  ) : (
    <div className={classes.imgWithDelete}>
      <img src={file} alt={label} className={clsx(classes.img, className)} />
      <Button className={classes.delete} onClick={onDeleteImage}>
        <CloseIcon width={12} height={12} color="red" />
      </Button>
    </div>
  );
};

export default CommonUploadFile;
