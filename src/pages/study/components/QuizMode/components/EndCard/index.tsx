import { Box, Link, Typography } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";

interface EndCardProps {
  current: number;
  total: number;
}

const EndCard = ({ current, total }: EndCardProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">Quiz finished 🔥</Typography>

      <Typography variant="h5">
        Your score: {current}/{total}
      </Typography>

      <Link component={RouterLink} underline="none" to="/study" pt={4}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 600 }}
        >
          Choose another training
        </Typography>
      </Link>
    </Box>
  );
};

export default EndCard;
