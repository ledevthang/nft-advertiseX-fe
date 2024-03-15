import { Grid, Paper, makeStyles, CardMedia } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface IData {
  link: string;
  logoUrl: string;
  className?: string;
}

interface IStyle {
  link: string;
}

const CompatibleWebsite = ({ link, logoUrl, className }: IData) => {
  const classes = useStyles({ link });

  return (
    <Grid item lg={3} md={3}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Paper className={classes.main}>
          <CardMedia image={logoUrl} className={clsx(classes.img, className)} />
        </Paper>
      </a>
    </Grid>
  );
};

export default CompatibleWebsite;

const useStyles = makeStyles(() => ({
  main: {
    width: 'fit-content',
    backgroundColor: '#C4C4C4',
    borderRadius: 0,
    boxShadow: 'none',
    cursor: 'pointer',
  },
  img: {
    width: ({ link }: IStyle) => (link === 'https://magiceden.io/' ? 164 : 162),
    height: ({ link }: IStyle) => (link === 'https://magiceden.io/' ? 40 : 38),
    backgroundSize: 'contain',
    backgroundColor: '#FFFFFF',
  },
}));
