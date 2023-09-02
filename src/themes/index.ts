import { Theme } from "@mui/material";

export const getDesignTokens = (theme: Theme) => ({
  palette: theme.palette,
  typography: {
    fontFamily: "Nunito, Arial",
    fontWeightMedium: 600,
    button: {
      fontSize: "0.875rem",
      fontFamily: "Nunito, Arial",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:focus": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
            "::-webkit-search-cancel-button": {
              WebkitAppearance: "none",
              appearance: "none",
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "calc(24px + 1rem)",
          color: "inherit",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&.Mui-selected": {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.dark,
            },
          },
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.backgroundSecond.main}`,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: theme.palette.backgroundSecond.main,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: theme.palette.secondary.dark,
            minHeight: 24,
            border: "none",
          },
          "&::-webkit-scrollbar-button, & *::-webkit-scrollbar-button": {
            backgroundColor: theme.palette.backgroundSecond.main,
          },
          transition: "background-color 300ms ease",
        },
      },
    },
  },
});
