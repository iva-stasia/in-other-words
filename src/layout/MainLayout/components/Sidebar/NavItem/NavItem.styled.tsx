import { Link, LinkProps, ListItemText, styled } from "@mui/material";

const StyledLink = styled(Link)<
  LinkProps & { component: React.ElementType; to: string }
>({
  width: "100%",
  textDecoration: "none",
});

const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop != "open",
})<{ open: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create("opacity"),
  [theme.breakpoints.up("md")]: {
    ...(open ? { opacity: 1 } : { opacity: 0 }),
  },
}));

export { StyledLink, StyledListItemText };
