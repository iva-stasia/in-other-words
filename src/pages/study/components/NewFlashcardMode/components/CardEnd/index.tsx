import { Link, Typography } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { CardEndContainer } from "./CardEnd.styled";

const CardEnd = () => {
  return (
    <CardEndContainer>
      <Typography p={3} variant="h4">
        All cards are learned 🎉
      </Typography>

      <Link
        component={RouterLink}
        underline="none"
        to="/study"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ fontWeight: 600 }}
        >
          Choose another training
        </Typography>
      </Link>
    </CardEndContainer>
  );
};

export default CardEnd;
