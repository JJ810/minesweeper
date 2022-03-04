import { makeStyles } from '@mui/styles';

export const useAppStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    minWidth: 300,
    padding: 50
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  levelSelector: {
    width: 200
  }
});
