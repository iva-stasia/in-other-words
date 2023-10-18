import { Box, CardContent, Typography } from "@mui/material";
import {
  StyledAddRounded,
  StyledButtonBase,
  StyledCard,
} from "./CreateSetBtn.styled";
import JdenticonGenerator from "../../../../components/JdenticonGenerator";

interface CreateSetBtnProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  handleCreateSetClick: () => void;
}

const CreateSetBtn = ({
  buttonRef,
  handleCreateSetClick,
}: CreateSetBtnProps) => {
  return (
    <StyledButtonBase
      focusRipple
      disableRipple
      disableTouchRipple
      onClick={handleCreateSetClick}
      ref={buttonRef}
    >
      <StyledCard elevation={0}>
        <Box position="relative">
          <StyledAddRounded fontSize="large" />
          <Box sx={{ opacity: "0.15" }}>
            <JdenticonGenerator value="0" />
          </Box>
        </Box>
        <CardContent>
          <Typography variant="h6" component="div" color="primary">
            Create new set
          </Typography>
        </CardContent>
      </StyledCard>
    </StyledButtonBase>
  );
};

export default CreateSetBtn;
