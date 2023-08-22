import { Skeleton, TableCell, TableRow } from "@mui/material";

const RowSkeleton = () => {
  return (
    <TableRow hover sx={{
      "&:last-child td, &:last-child th": { border: 0 },
    }}>
      <TableCell padding="checkbox">
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        padding="normal"
        sx={{ fontWeight: 700, pr: 2 }}
      >
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        padding="none"
        sx={{ fontWeight: 700 }}
      >
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
        <Skeleton></Skeleton>
      </TableCell>
    </TableRow>
  );
};

export default RowSkeleton;
