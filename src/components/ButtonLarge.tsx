import { Button } from "@mui/material";

interface ButtonLargeProps {
  disabled: boolean;
  title: string;
}

const ButtonLarge = ({ disabled, title }: ButtonLargeProps) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={disabled}
      sx={{ mt: 3, mb: 2 }}
    >
      {title}
    </Button>
  );
};

export default ButtonLarge;
