import rocket from "/achievements/rocket.png";
import mission from "/achievements/mission.png";
import achievement from "/achievements/achievement.png";
import dreams from "/achievements/dreams.png";
import fire from "/achievements/fire.png";
import fireworks from "/achievements/fireworks.png";
import planet from "/achievements/planet.png";
import quality from "/achievements/quality.png";
import stars from "/achievements/stars.png";
import successStar from "/achievements/success-star.png";
import success from "/achievements/success.png";
import trophy from "/achievements/trophy.png";
import valuation from "/achievements/valuation.png";
import threeStars from "/achievements/three-stars.png";

export const streakAchievements = [
  {
    title: "Newcomer",
    days: 3,
    icon: rocket,
  },
  {
    title: "Learner",
    days: 7,
    icon: dreams,
  },
  {
    title: "Champion",
    days: 14,
    icon: achievement,
  },
  {
    title: "Enthusiast",
    days: 30,
    icon: fire,
  },
  {
    title: "Master",
    days: 60,
    icon: fireworks,
  },
  {
    title: "Legend",
    days: 90,
    icon: success,
  },
  {
    title: "Ultimate Streak",
    days: 365,
    icon: mission,
  },
];

export const wordAchievements = [
  {
    title: "Explorer",
    words: 25,
    icon: stars,
  },
  {
    title: "Apprentice",
    words: 50,
    icon: valuation,
  },
  {
    title: "Aficionado",
    words: 100,
    icon: planet,
  },
  {
    title: "Maestro",
    words: 250,
    icon: threeStars,
  },
  {
    title: "Guru",
    words: 500,
    icon: quality,
  },
  {
    title: "Virtuoso",
    words: 1000,
    icon: successStar,
  },
  {
    title: "Connoisseur",
    words: 2000,
    icon: trophy,
  },
];
