import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function createData(word: string, definition: string, progress: number) {
  return { word, definition, progress };
}

const rows = [
  createData('Frozen', 'Frozen yoghurt', 0),
  createData('Ice', 'Ice cream sandwich', 0),
  createData('Eclair', 'Eclair', 0),
  createData('Cupcake', 'Cupcake', 0),
  createData('Gingerbread', 'Gingerbread', 0),
];

const AllWords = () => {
  const { activePage } = useSelector((state: RootState) => state.menu);

  return (
    <Box>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ flexGrow: 1, mb: 2, fontWeight: 600 }}>
        {activePage}
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell>Definition</TableCell>
              <TableCell align="right">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.word}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.word}
                </TableCell>
                <TableCell>{row.definition}</TableCell>
                <TableCell align="right">{row.progress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllWords;
