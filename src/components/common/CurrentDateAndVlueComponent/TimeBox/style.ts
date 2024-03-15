import { makeStyles } from '@material-ui/core';
export const useStyle = makeStyles((theme) => ({
  container: {
    marginRight: 24,
  },
  label: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '140%',
    color: '#6F6BC5',
    marginBottom: 8,
  },
  value: {
    display: 'grid',
    '& > div': {
      margin: 'auto',
      color: '#6F6BC5',
    },
    width: 60,
    height: 60,
    backgroundColor: 'rgba(111, 107, 197, 0.08)',
    border: '1px solid #6F6BC5',
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '140%',
  },
}));
