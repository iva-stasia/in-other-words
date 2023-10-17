import { Box, IconButton, styled } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

const FlashcardsContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(2),
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("md")]: {
    overflow: "hidden",
    marginTop: 0,
    height: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));

const StyledSwiper = styled(Swiper)(({ theme }) => ({
  height: "400px",
  maxWidth: "640px",
  width: "100%",
  overflow: "visible",
  position: "relative",
  marginInline: 0,
  paddingInline: theme.spacing(10),

  [theme.breakpoints.down("lg")]: {
    maxWidth: "460px",
  },

  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    height: "calc(100% - 90px)",
    paddingInline: theme.spacing(0),
    paddingTop: theme.spacing(4),
    order: -1,
  },

  ".swiper-wrapper": {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      transformStyle: "flat",
    },
  },

  ".swiper-slide": {
    overflow: "visible",
  },

  " .swiper-pagination-progressbar.swiper-pagination-horizontal": {
    overflow: "hidden",
    top: "120%",
    height: "8px",
    left: theme.spacing(10),
    right: theme.spacing(10),
    width: "auto",
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.down("md")]: {
      top: "0",
      left: theme.spacing(0),
      right: theme.spacing(0),
      zIndex: "0",
    },
  },

  " .swiper-pagination-progressbar .swiper-pagination-progressbar-fill": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledSwiperSlide = styled(SwiperSlide)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  fontSize: "1.8rem",

  ".swiper-slide-shadow": {
    borderRadius: theme.shape.borderRadius,
  },
}));

const FailBtn = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.light,
  backgroundColor: `${theme.palette.error.light}20`,
  border: "2px solid",
  borderColor: theme.palette.error.light,
  "&:disabled": {
    borderColor: theme.palette.action.disabled,
  },
}));

const PassBtn = styled(FailBtn)(({ theme }) => ({
  color: theme.palette.success.light,
  backgroundColor: `${theme.palette.success.light}20`,
  borderColor: theme.palette.success.light,
}));

const CardEnd = styled(Box, {
  shouldForwardProp: (prop) => prop != "cardEnd",
})<{ cardEnd: boolean }>(({ cardEnd, theme }) => ({
  position: "absolute",
  top: -2,
  left: 0,
  height: "100%",
  width: "calc(100% - 4px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: "2px solid",
  borderColor: `${theme.palette.primary.main}20`,
  opacity: 0,
  transition: theme.transitions.create("opacity"),
  ...(cardEnd && {
    opacity: 1,
    zIndex: "999",
  }),
}));

export {
  FlashcardsContainer,
  StyledSwiper,
  StyledSwiperSlide,
  FailBtn,
  PassBtn,
  CardEnd,
};
