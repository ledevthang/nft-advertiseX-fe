import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'column',
    cursor: 'pointer',
  },
  imgWithDelete: {
    position: 'relative',
    width: 'fit-content',
    '&:hover button': {
      opacity: 1,
      transform: 'translateY(30%)',
    },
  },
  label: {
    fontSize: 12,
  },
  img: {
    width: 120,
    height: 120,
    objectFit: 'cover',
  },
  delete: {
    position: 'absolute',
    opacity: 0,
    right: 8,
    transform: 'translateY(0)',
    transition: 'transform 0.5s, opacity 0.5s',
    color: 'white',
    width: 24,
    height: 24,
    backgroundColor: '#BDBDBD',
    borderRadius: 22,
  },
}));
