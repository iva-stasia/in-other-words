import {
  Box,
  Stack,
  Table,
  TableBody,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Order, Word } from "../../types";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../../store/slices/dialogSlice";
import {
  setOwnSortedWords,
  setSelectedWord,
} from "../../store/slices/wordSlice";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import {
  Container,
  StyledPaper,
  StyledTableContainer,
} from "./WordTable.styled";
import WordTableRow from "./components/WordTableRow";
import { motion } from "framer-motion";
import { fade, fadeIn } from "../../utils/motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "../Loader";

interface WordTableProps {
  words: Word[];
  title: string;
}

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
  const loading = useSelector((state: RootState) => state.words.loading);
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Word | null>(null);
  const [selected, setSelected] = useState<Word[]>([]);
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

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
    if (orderBy === "word") {
      return stableSort(words, getComparator(order, orderBy));
    }
    return words;
  }, [order, orderBy, words]);

  useEffect(() => {
    dispatch(setOwnSortedWords(sortedRows));
  }, [sortedRows, dispatch]);

  return (
    <Container
      component={motion.div}
      variants={matchDownSm ? fade : fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        pt={1}
      >
        <Typography variant="h6" noWrap component="div" color="text.secondary">
          {title}
        </Typography>

        <EnhancedTableToolbar
          selected={selected}
          setSelected={setSelected}
          title={title}
        />
      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <StyledPaper elevation={0}>
          <StyledTableContainer>
            {words.length ? (
              <Table stickyHeader aria-label="table">
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
                      <WordTableRow
                        key={row.word}
                        row={row}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        handleCheckboxClick={handleCheckboxClick}
                        handleRowClick={handleRowClick}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Box sx={{ bgcolor: "backgroundSecond.main" }}>
                There are no words yet. Enter a word in the search to add it.
              </Box>
            )}
          </StyledTableContainer>
        </StyledPaper>
      )}
    </Container>
  );
};

export default WordTable;
