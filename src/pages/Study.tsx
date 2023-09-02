import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import flashcardIcon from "../../public/flashcards.png";

const studyModes = [
  {
    title: "Flashcards",
    path: "/flashcards",
    icon: flashcardIcon,
  },
];

const Study = () => {
  const activePage = useSelector((state: RootState) => state.menu.activePage);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography
        mb={2}
        variant="h5"
        noWrap
        component="div"
        sx={{ fontWeight: 600 }}
      >
        {activePage}
      </Typography>
    </Box>
  );
};

export default Study;
