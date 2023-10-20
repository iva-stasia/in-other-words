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

const progressFilterOptions = [
  {
    title: "New",
    ariaLabel: "New words",
    icon: progressIcon0,
  },
  {
    title: "Learning",
    ariaLabel: "Words in progress",
    icon: progressIcon2,
  },
  {
    title: "Learned",
    ariaLabel: "Learned words",
    icon: progressIcon4,
  },
];

const ToggleFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams({ progress: "All" });

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
      sx={{ height: "40px" }}
    >
      <ToggleButton value="All" aria-label="All words" sx={{ flex: 1 }}>
        <Tooltip title="All words">
          <Typography variant="button">All</Typography>
        </Tooltip>
      </ToggleButton>

      {progressFilterOptions.map(({ title, ariaLabel, icon }) => (
        <ToggleButton
          key={title}
          value={title}
          aria-label={ariaLabel}
          sx={{ flex: 1 }}
        >
          <Tooltip title={title}>
            <Icon>
              <img
                src={icon}
                height={24}
                width={24}
                style={{ display: "block" }}
              />
            </Icon>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleFilter;
