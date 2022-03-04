import { makeStyles } from '@mui/styles';

export const useBoardStyles = makeStyles({
  container: {
    width: '100%',
    overflowX: 'scroll'
  },
  cell: {
    minWidth: 20,
    height: 20,
    border: '1px solid grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    display: 'flex'
  }
});
