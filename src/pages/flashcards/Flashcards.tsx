import { Typography } from "@mui/material";
import { EffectCards, Pagination, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import {
  CardEnd,
  FailBtn,
  FlashcardsContainer,
  PassBtn,
  StyledSwiper,
  StyledSwiperSlide,
} from "./Flashcards.styled";
import useFlashcardsFacade from "./flashcardsFacade";
import FlashcardComponent from "./components/flashcard/FlashcardComponent";
import { Word } from "../../types";

interface FlashcardsProps {
  words?: Word[];
}

const Flashcards = ({ words }: FlashcardsProps) => {
  const {
    setCurIndex,
    cardEnd,
    matchDownMd,
    handleFail,
    handlePass,
    swiperRef,
    wordsToDisplay,
  } = useFlashcardsFacade();

  const currentWords = words ? words : wordsToDisplay;

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
        {currentWords.map((word) => (
          <StyledSwiperSlide key={word.word}>
            <FlashcardComponent word={word} />
          </StyledSwiperSlide>
        ))}
        <CardEnd cardend={cardEnd ? 1 : 0} slot="wrapper-end">
          <Typography p={3} variant="h4">
            All cards are sorted 🎉
          </Typography>
        </CardEnd>
      </StyledSwiper>

      <PassBtn size="large" onClick={handlePass} disabled={cardEnd}>
        <CheckRounded fontSize="inherit" />
      </PassBtn>
    </FlashcardsContainer>
  );
};

export default Flashcards;
