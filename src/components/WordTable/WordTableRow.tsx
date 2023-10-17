import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { Word } from "../../types";
import AudioPlayer from "../AudioPlayer";

interface WordTableRowProps {
  row: Word;
  isItemSelected: boolean;
  labelId: string;
  handleRowClick: (event: React.MouseEvent<unknown>, word: string) => void;
  handleCheckboxClick: (event: React.MouseEvent<unknown>, word: Word) => void;
}

const WordTableRow = ({
  row,
  isItemSelected,
  labelId,
  handleRowClick,
  handleCheckboxClick,
}: WordTableRowProps) => {
  return (
    <TableRow
      hover
      onClick={(event) => handleRowClick(event, row.word)}
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{
        cursor: "pointer",
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => handleCheckboxClick(event, row)}
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        sx={{ fontWeight: 700, pr: 2 }}
      >
        {row.audioURL ? <AudioPlayer audioURL={row.audioURL} /> : ""}
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        sx={{ fontWeight: 700 }}
      >
        {row.word}
      </TableCell>
      <TableCell>
        {row.definitions.map((def, index) => (
          <Box key={index}>{def.definition}</Box>
        ))}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
        {row.set}
      </TableCell>
    </TableRow>
  );
};

export default WordTableRow;
