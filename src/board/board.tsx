import { Box, Typography } from '@mui/material';

import { Client } from '../lib/client';
import { useBoardStyles } from './styles';

interface BoardProps {
  map: string[];
}

const Board: React.FC<BoardProps> = ({ map }) => {
  const classes = useBoardStyles();

  const handleCellClick = (col: number, row: number) => {
    Client.socket.send(`open ${col} ${row}`);
  };

  if (!map.length) {
    return <Typography>Welcome! Press Start button to get started!</Typography>;
  }

  return (
    <Box className={classes.container}>
      {map.map((item: string, rowIndex: number) => (
        <Box className={classes.row} key={`board-${rowIndex}`}>
          {item.split('').map((cell: string, colIndex: number) =>
            cell !== '□' ? (
              <Box
                key={`cell-${rowIndex}-${colIndex}`}
                className={classes.cell}
                data-testid={`cell-${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(colIndex, rowIndex)}>
                <Typography color={cell !== '*' ? 'green' : 'red'}>{cell}</Typography>
              </Box>
            ) : (
              <Box
                key={`cell-${rowIndex}-${colIndex}`}
                className={classes.cell}
                bgcolor="darkGrey"
                data-testid={`cell-${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(colIndex, rowIndex)}
              />
            )
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Board;
