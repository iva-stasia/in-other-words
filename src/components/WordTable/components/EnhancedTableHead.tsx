import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order, Word } from "../../../types";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Word
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | null;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Word;
  label: string;
  numeric: boolean;
  sortable: boolean;
  mobileDisplay: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "audioURL",
    numeric: false,
    disablePadding: true,
    label: "Audio",
    sortable: false,
    mobileDisplay: "table-cell",
  },
  {
    id: "word",
    numeric: false,
    disablePadding: true,
    label: "Word",
    sortable: true,
    mobileDisplay: "table-cell",
  },
  {
    id: "definitions",
    numeric: false,
    disablePadding: false,
    label: "Definition",
    sortable: false,
    mobileDisplay: "none",
  },
  {
    id: "set",
    numeric: false,
    disablePadding: false,
    label: "Set",
    sortable: false,
    mobileDisplay: "none",
  },
  {
    id: "learning",
    numeric: true,
    disablePadding: false,
    label: "Progress",
    sortable: false,
    mobileDisplay: "none",
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Word) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all words",
            }}
          />
        </TableCell>
        {headCells.map((headCell) =>
          headCell.sortable ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                display: {
                  xs: headCell.mobileDisplay,
                  sm: "table-cell",
                },
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sx={{
                display: {
                  xs: headCell.mobileDisplay,
                  sm: "table-cell",
                },
              }}
            >
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
