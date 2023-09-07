import { Box, IconButton, Theme, styled, useMediaQuery } from "@mui/material";
import { EffectCards, Pagination, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { useRef } from "react";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import FlashcardComponent from "./components/FlashcardComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import type { Swiper as SwiperType } from "swiper";

export enum Progress {
  New,
  Step1,
  Step2,
  Step3,
  Learnt,
}

const Flashcards = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);
  const swiperRef = useRef<SwiperType | null>(null);
  const matchDownMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const learningWords = words
    .filter(({ progress }) => progress !== Progress.Learnt)
    .slice(0, 10);

  const handleFail = () => {
    console.log("fail");
    if (!swiperRef.current) return;

    // set progress to New
    // set repitition date

    swiperRef.current.slideNext();
  };

  const handlePass = () => {
    console.log("pass");
    if (!swiperRef.current) return;

    // set progress to Step1/2/3/Learnt
    // set repitition date

    swiperRef.current.slideNext();
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        sx={{
          mt: 2,
          overflow: { xs: "hidden", md: "visible" },
          height: { xs: "100%", md: "auto" },
          width: "100%",
          position: "relative",
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          alignItems: "center",
          justifyContent: { xs: "space-between", md: "center" },
        }}
      >
        <FailBtn size="large" onClick={handleFail}>
          <CloseRounded fontSize="inherit" />
        </FailBtn>

        <StyledSwiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect={matchDownMd ? "creative" : "cards"}
          grabCursor={false}
          allowTouchMove={false}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["0%", 0, -1],
            },
            next: {
              shadow: true,
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCards, Pagination, EffectCreative]}
          pagination={{
            type: "progressbar",
          }}
        >
          {learningWords.map((word) => (
            <StyledSwiperSlide key={word.word}>
              <FlashcardComponent word={word} />
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>

        <PassBtn size="large" onClick={handlePass}>
          <CheckRounded fontSize="inherit" />
        </PassBtn>
      </Box>
    </Box>
  );
};

export default Flashcards;

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

    ".swiper-wrapper": {
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
}));

const PassBtn = styled(FailBtn)(({ theme }) => ({
  color: theme.palette.success.light,
  backgroundColor: `${theme.palette.success.light}20`,
  borderColor: theme.palette.success.light,
}));
