import { Theme } from '@mui/material';

export const getDesignTokens = (theme: Theme) => ({
  palette: theme.palette,
  typography: {
    fontFamily: 'Nunito, Arial',
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      fontFamily: 'Nunito, Arial',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
            '::-webkit-search-cancel-button': {
              WebkitAppearance: 'none',
              appearance: 'none',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'calc(24px + 1rem)',
          color: 'inherit',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.Mui-selected': {
            // color: theme.palette.text.primary,
            // color: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            // backgroundColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.dark,
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
    // MuiToolbar: {
    //   styleOverrides: {
    //     root: {
    //       '&.MuiToolbar-regular': {
    //         minHeight: '80px',
    //       },
    //     },
    //   },
    // },
  },
});
