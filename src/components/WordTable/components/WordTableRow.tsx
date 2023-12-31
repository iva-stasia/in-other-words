import { Box, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { Word } from "../../../types";
import AudioPlayer from "../../AudioPlayer";

import ProgressIcon from "../../ProgressIcon";

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
            "aria-label": "Mark the word with a checkmark",
          }}
        />
      </TableCell>

      <TableCell
        id={labelId}
        scope="row"
        padding="none"
        sx={{ fontWeight: 700, pr: 2 }}
      >
        {row.audioURL ? <AudioPlayer audioURL={row.audioURL} /> : ""}
      </TableCell>

      <TableCell
        id={labelId}
        scope="row"
        padding="none"
        sx={{ py: { xs: 1, sm: 0 }, pr: { xs: 0.5, sm: 0 } }}
      >
        <Typography fontWeight={700}>{row.word}</Typography>

        <Box sx={{ display: { xs: "block", sm: "none" }, pt: 1 }}>
          {row.translation && (
            <Typography variant="body2" fontStyle="italic">
              {row.translation}
            </Typography>
          )}
          {row.definitions.map((def, index) => (
            <Box key={index}>{def.definition}</Box>
          ))}
        </Box>
      </TableCell>

      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
        {row.translation && (
          <Typography variant="body2" fontStyle="italic">
            {row.translation}
          </Typography>
        )}
        {row.definitions.map((def, index) => (
          <Box key={index}>{def.definition}</Box>
        ))}
      </TableCell>

      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
        {row.set}
      </TableCell>

      <TableCell
        align="center"
        sx={{ display: { xs: "none", sm: "table-cell" } }}
      >
        <ProgressIcon progress={row.learning.progress} />
      </TableCell>
    </TableRow>
  );
};

export default WordTableRow;
