import {
  Box,
  Checkbox,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Order, Word, WordTableProps } from "../../types";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../../store/slices/dialogSlice";
import {
  setOwnSortedWords,
  setSelectedWord,
} from "../../store/slices/wordSlice";
import AudioPlayer from "../../components/AudioPlayer";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import RowSkeleton from "./RowSkeleton";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const WordTable = ({ words, title }: WordTableProps) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Word | null>(null);
  const [selected, setSelected] = useState<Word[]>([]);
  const loading = useSelector((state: RootState) => state.words.loading);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(words);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Word
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (_event: React.MouseEvent<unknown>, word: string) => {
    dispatch(setWordDataDialog(true));
    dispatch(setSelectedWord({ word, source: "ownDictionary" }));
  };

  const handleCheckboxClick = (
    event: React.MouseEvent<unknown>,
    word: Word
  ) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(word);
    let newSelected: Word[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, word);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (word: Word) => selected.indexOf(word) !== -1;

  const sortedRows = useMemo(() => {
    if (orderBy === "word" || orderBy === "set") {
      return stableSort(words, getComparator(order, orderBy));
    }
    return words;
  }, [order, orderBy, words]);

  useEffect(() => {
    dispatch(setOwnSortedWords(sortedRows));
  }, [sortedRows, dispatch]);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {loading ? (
          <Skeleton>
            <Typography variant="h5">{title}</Typography>
          </Skeleton>
        ) : (
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="text.secondary"
          >
            {title}
          </Typography>
        )}
        {!!words.length && (
          <EnhancedTableToolbar selected={selected} setSelected={setSelected} />
        )}
      </Stack>

      <Paper
        elevation={0}
        sx={{ width: "100%", overflow: "hidden", transition: "all 300ms ease" }}
      >
        <TableContainer>
          {loading ? (
            <Table>
              <TableBody>
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
              </TableBody>
            </Table>
          ) : words.length ? (
            <Table aria-label="table">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={words.length}
              />
              <TableBody>
                {sortedRows.map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, row.word)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.word}
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
                        {row.audioURL ? (
                          <AudioPlayer audioURL={row.audioURL} />
                        ) : (
                          ""
                        )}
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
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {row.set}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ bgcolor: "backgroundSecond.main" }}>
              There are no words yet. Enter a word in the search to add it.
            </Box>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default WordTable;
