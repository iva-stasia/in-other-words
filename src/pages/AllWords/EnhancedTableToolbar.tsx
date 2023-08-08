import { DeleteRounded, FilterListRounded } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Stack direction="row" alignItems='center'>
      {numSelected > 0 && (
        <Typography mr={2} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => console.log("Deleted!")}>
            <DeleteRounded />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={() => console.log("Filtered!")} disabled>
            <FilterListRounded />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default EnhancedTableToolbar;
