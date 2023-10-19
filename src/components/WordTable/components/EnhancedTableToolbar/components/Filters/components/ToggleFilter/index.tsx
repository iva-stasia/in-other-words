import {
  Icon,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import progressIcon0 from "/progress-0.png";
import progressIcon2 from "/progress-2.png";
import progressIcon4 from "/progress-4.png";
import { useSearchParams } from "react-router-dom";

const ToggleFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams({ progress: "all" });

  const progress = searchParams.get("progress");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newProgress: string | null
  ) => {
    if (!newProgress) return;

    setSearchParams((prev) => {
      prev.set("progress", newProgress);

      return prev;
    });
  };

  return (
    <ToggleButtonGroup
      value={progress}
      exclusive
      onChange={handleChange}
      aria-label="word progress filter"
      size="small"
    >
      <ToggleButton value="all" aria-label="all words">
        <Tooltip title="All words">
          <Typography variant="button">All</Typography>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="new" aria-label="new words">
        <Tooltip title="New words">
          <Icon>
            <img
              src={progressIcon0}
              height={24}
              width={24}
              style={{ display: "block" }}
            />
          </Icon>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="learning" aria-label="words in progress">
        <Tooltip title="Words you are learning">
          <Icon>
            <img
              src={progressIcon2}
              height={24}
              width={24}
              style={{ display: "block" }}
            />
          </Icon>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="learned" aria-label="learned words">
        <Tooltip title="Learned words">
          <Icon>
            <img
              src={progressIcon4}
              height={24}
              width={24}
              style={{ display: "block" }}
            />
          </Icon>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleFilter;
