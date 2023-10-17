import { Box, CardContent, Link, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import JdenticonGenerator from "../../../../components/JdenticonGenerator";
import { DeleteRounded } from "@mui/icons-material";
import { WordSet } from "../../../../types";
import {
  JdenticonContainer,
  StyledCard,
  StyledIconButton,
} from "./SetCard.styled";

interface SetCardProps {
  set: WordSet;
  handleDeleteSet: (event: React.MouseEvent, set: WordSet) => void;
}

const SetCard = ({ set, handleDeleteSet }: SetCardProps) => {
  return (
    <Link
      component={RouterLink}
      to={`/word-sets/${set.title}`}
      underline="none"
    >
      <StyledCard elevation={0}>
        <Box position="relative" overflow="hidden">
          <JdenticonContainer>
            <JdenticonGenerator value={set.pictureId} />
          </JdenticonContainer>

          <Tooltip title="Delete">
            <StyledIconButton
              aria-label="close"
              onClick={(e) => handleDeleteSet(e, set)}
            >
              <DeleteRounded />
            </StyledIconButton>
          </Tooltip>
        </Box>

        <CardContent>
          <Typography variant="h6" component="div">
            {set.title}
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default SetCard;
