import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Board from './board/board';
import { sagaActions } from './store/sagaActions';
import { useAppDispatch, useAppSelector } from './store/hook';
import { mapSelector, messageSelector } from './board/boardSlice';
import { useAppStyles } from './common/appStyles';

function App() {
  const dispatch = useAppDispatch();
  const classes = useAppStyles();
  const map = useAppSelector(mapSelector);
  const message = useAppSelector(messageSelector);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    dispatch({ type: sagaActions.INIT_GAME });
  }, []);

  const handleLevelChange = (e: SelectChangeEvent) => {
    setLevel(Number(e.target.value));
  };

  const handleStart = () => {
    dispatch({ type: sagaActions.START_GAME, payload: `new ${level}` });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.controlsWrapper}>
          <Select
            className={classes.levelSelector}
            variant="standard"
            value={level.toString()}
            label="Level"
            onChange={handleLevelChange}>
            <MenuItem value={1}>Beginner</MenuItem>
            <MenuItem value={2}>Amateur</MenuItem>
            <MenuItem value={3}>Intermediate</MenuItem>
            <MenuItem value={4}>Expert</MenuItem>
          </Select>
          <Button variant="contained" data-testid="btn-start" onClick={handleStart}>
            {map.length ? 'Reset' : 'Start'}
          </Button>
        </Box>
        <Board map={map} />
        {message !== 'OK' && (
          <Typography variant="h5" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;
