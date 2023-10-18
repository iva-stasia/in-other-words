import { Link, Typography } from "@mui/material";
import { EffectCards, Pagination, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import { NavLink as RouterLink } from "react-router-dom";

import useFlashcardModeFacade from "./flashcardModeFacade";
import FlashcardComponent from "./components/flashcard/FlashcardComponent";
import { Word } from "../../../../types";
import {
  CardEnd,
  FailBtn,
  FlashcardsContainer,
  PassBtn,
  StyledSwiper,
  StyledSwiperSlide,
} from "./FlashcardMode.styled";

interface FlashcardModeProps {
  words: Word[];
}

const FlashcardMode = ({ words }: FlashcardModeProps) => {
  const {
    wordsToDisplay,
    setCurIndex,
    cardEnd,
    matchDownMd,
    handleFail,
    handlePass,
    swiperRef,
  } = useFlashcardModeFacade(words);

  return (
    <FlashcardsContainer>
      <FailBtn size="large" onClick={handleFail} disabled={cardEnd}>
        <CloseRounded fontSize="inherit" />
      </FailBtn>

      <StyledSwiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        effect={matchDownMd ? "creative" : "cards"}
        grabCursor={false}
        allowTouchMove={false}
        onSlideChange={(swiper) => setCurIndex(swiper.realIndex)}
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
        {wordsToDisplay.map((word) => (
          <StyledSwiperSlide key={word.word}>
            <FlashcardComponent word={word} />
          </StyledSwiperSlide>
        ))}

        <CardEnd cardEnd={cardEnd} slot="wrapper-end">
          <Typography p={3} variant="h4">
            All cards are sorted 🎉
          </Typography>

          <Link
            component={RouterLink}
            underline="none"
            to="/study"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ fontWeight: 600 }}
            >
              Choose another training
            </Typography>
          </Link>
        </CardEnd>
      </StyledSwiper>

      <PassBtn size="large" onClick={handlePass} disabled={cardEnd}>
        <CheckRounded fontSize="inherit" />
      </PassBtn>
    </FlashcardsContainer>
  );
};

export default FlashcardMode;
