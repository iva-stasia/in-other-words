import { Box, styled } from "@mui/material";

const CalendarContainer = styled(Box)(({ theme }) => ({
  "& .react-calendar": {
    overflow: "hidden",
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
    border: "none",
    borderRadius: theme.shape.borderRadius,
    fontFamily: "inherit",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  "& .react-calendar__navigation button": {
    color: theme.palette.text.primary,
    transition: theme.transitions.create("color"),

    "&:hover": {
      color: theme.palette.primary.main,
      background: theme.palette.background.default,
    },

    "&:focus": {
      color: theme.palette.primary.main,
      background: theme.palette.background.default,
    },
  },

  "& .react-calendar__month-view__days": {
    marginBottom: theme.spacing(0.5),
  },

  "& .react-calendar__month-view__days__day--weekend abbr, .react-calendar__month-view__days__day abbr":
    {
      color: theme.palette.text.primary,
    },

  "& .react-calendar__month-view__days__day--neighboringMonth abbr": {
    color: theme.palette.text.disabled,
  },

  "& .react-calendar__tile": {
    pointerEvents: "none",
    borderRadius: "50%",
    height: 50 - 8,
    marginBottom: theme.spacing(0.5),
  },

  "& .react-calendar__tile--active": {
    position: "relative",
    background: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
    borderInline: "4px solid",
    borderInlineColor: theme.palette.background.default,

    "&::before": {
      content: '""',
      display: "block",
      height: "4px",
      width: "4px",
      background: theme.palette.tertiary.contrastText,
      position: "absolute",
      bottom: "8px",
      left: "50%",
      transform: "translate(-50%, 0)",
      borderRadius: "50%",
    },
  },

  "& .react-calendar__tile--active abbr": {
    color: theme.palette.tertiary.contrastText,
  },

  "& .user-activity": {
    background: theme.palette.tertiary.main,
    borderRadius: 0,
    borderInline: "4px solid",
    borderInlineColor: theme.palette.tertiary.main,
  },

  "& .user-activity-single": {
    borderRadius: "50%",
    borderColor: theme.palette.background.default,
  },

  "& .user-activity-start": {
    borderRadius: "50% 0 0 50%",
    borderLeftColor: theme.palette.background.default,
  },

  "& .user-activity-end": {
    borderRadius: "0 50% 50% 0",
    borderRightColor: theme.palette.background.default,
  },

  "& .user-activity abbr": {
    color: theme.palette.tertiary.contrastText,
  },
}));

export { CalendarContainer };
