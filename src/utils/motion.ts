export const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
  exit: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const zoomIn = (delay: number, duration: number) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const wordCardNav = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

export const slideIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => ({
  hidden: {
    x:
      direction === "left"
        ? -window.innerWidth
        : direction === "right"
        ? window.innerWidth
        : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
  exit: {
    x:
      direction === "left"
        ? window.innerWidth
        : direction === "right"
        ? -window.innerWidth
        : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeIn",
    },
  },
});

export const flashcard = {
  enter: {
    x: 0,
    rotate: 0,
    opacity: 0,
    scale: 29 / 30,
    translateY: -8,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    translateY: 0,
    transition: { duration: 0.2, type: "tween" },
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.2 },
    };
  },
};

export const flashcardCover = {
  enter: {
    x: 0,
    rotate: 0,
    scale: 1,
    translateY: 0,
  },
  center: {
    x: 0,
    scale: 31 / 30,
    translateY: 8,
    transition: { duration: 0.2, type: "tween", ease: "linear", delay: 0.2 },
    transitionEnd: { scale: 1, translateY: 0 },
  },
  exit: {
    x: 0,
    scale: 31 / 30,
    translateY: 8,
    opacity: 0,
    transition: { duration: 0.2, type: "tween", ease: "linear", delay: 0.2 },
  },
};

export const fade = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};
