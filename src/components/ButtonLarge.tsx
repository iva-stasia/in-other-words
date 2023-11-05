import { Button, Typography } from "@mui/material";
import BtnLoader from "./BtnLoader";

interface ButtonLargeProps {
  isSubmitting: boolean;
  title: string;
}

const ButtonLarge = ({ isSubmitting, title }: ButtonLargeProps) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={isSubmitting}
      sx={{ mt: 3, mb: 2 }}
    >
      <Typography variant="button" sx={{ opacity: isSubmitting ? 0 : 1 }}>
        {title}
      </Typography>
      {isSubmitting && <BtnLoader color="text" />}
    </Button>
  );
};

export default ButtonLarge;
