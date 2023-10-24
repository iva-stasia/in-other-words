import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

interface BorderLinearProgressProps {
  current: number;
  total: number;
}

const Progress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 10,
  borderRadius: 5,
  border: "2px solid",
  borderColor: theme.palette.primary.main,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "transparent",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const BorderLinearProgress = ({
  current,
  total,
}: BorderLinearProgressProps) => {
  return (
    <Progress variant="determinate" value={((current + 1) * 100) / total} />
  );
};

export default BorderLinearProgress;
