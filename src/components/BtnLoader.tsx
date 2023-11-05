import { Box, keyframes, styled } from "@mui/material";

interface BtnLoaderProps {
  color: string;
}

const rotation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

const StyledBtnLoader = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ color, theme }) => ({
  width: "16px",
  height: "16px",
  border: `2px solid`,
  borderRadius: "50%",
  display: "inline-block",
  animation: `${rotation} 1s infinite linear`,
  ...(color === "primary" && {
    borderColor: theme.palette.primary.main,
  }),
  ...(color === "text" && {
    borderColor: theme.palette.primary.contrastText,
  }),
  borderBottomColor: "transparent",
}));

const BtnLoader = ({ color }: BtnLoaderProps) => {
  return (
    <Box
      sx={{
        height: "16px",
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
      }}
    >
      <StyledBtnLoader color={color} />
    </Box>
  );
};

export default BtnLoader;
