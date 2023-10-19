import { Icon } from "@mui/material";
import progressIcon0 from "/progress-0.png";
import progressIcon1 from "/progress-1.png";
import progressIcon2 from "/progress-2.png";
import progressIcon3 from "/progress-3.png";
import progressIcon4 from "/progress-4.png";

interface ProgressIconProps {
  progress: number;
}

const ProgressIcon = ({ progress }: ProgressIconProps) => {
  return (
    <Icon sx={{ display: "inline-block" }}>
      {progress === 0 && (
        <img
          src={progressIcon0}
          height={24}
          width={24}
          style={{ display: "block" }}
        />
      )}
      {progress === 1 && (
        <img
          src={progressIcon1}
          height={24}
          width={24}
          style={{ display: "block" }}
        />
      )}
      {progress === 2 && (
        <img
          src={progressIcon2}
          height={24}
          width={24}
          style={{ display: "block" }}
        />
      )}
      {progress === 3 && (
        <img
          src={progressIcon3}
          height={24}
          width={24}
          style={{ display: "block" }}
        />
      )}
      {progress === 4 && (
        <img
          src={progressIcon4}
          height={24}
          width={24}
          style={{ display: "block" }}
        />
      )}
    </Icon>
  );
};

export default ProgressIcon;
