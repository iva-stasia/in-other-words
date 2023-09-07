import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import flashcardIcon from "/flashcard.png";
import { Link as RouterLink } from "react-router-dom";

const studyModes = [
  {
    title: "Flashcards",
    path: "flashcards",
    icon: flashcardIcon,
    description:
      "Master new words effortlessly with flashcards. Flip to reveal definitions, examples, and more.",
  },
];

const Study = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        alignItems="stretch"
        mt={2}
      >
        {studyModes.map(({ title, path, icon, description }) => (
          <Grid item xs={12} sm={6} lg={3} key={title}>
            <Link component={RouterLink} to={`/study/${path}`} underline="none">
              <Card
                sx={{
                  position: "relative",
                  height: 1,
                  cursor: "pointer",
                  "&:hover .MuiBox-root": {
                    scale: "1.1",
                    opacity: "0.8",
                  },
                }}
                elevation={0}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    zIndex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" component="div" pb={8}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${icon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                    backgroundSize: "auto 80%",
                    opacity: "0.4",
                    transformOrigin: "center right",
                    transition: (theme) =>
                      theme.transitions.create(["opacity", "scale"]),
                  }}
                />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Study;
