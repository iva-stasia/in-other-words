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
    title: "Dedicated Learner",
    days: 7,
    icon: achievement,
  },
  {
    title: "Streak Champion",
    days: 14,
    icon: dreams,
  },
  {
    title: "Learning Enthusiast",
    days: 30,
    icon: fire,
  },
  {
    title: "Streak Master",
    days: 60,
    icon: fireworks,
  },
  {
    title: "Streak Legend",
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
    title: "Word Explorer",
    days: 25,
    icon: stars,
  },
  {
    title: "Word Apprentice:",
    days: 50,
    icon: valuation,
  },
  {
    title: "Word Aficionado",
    days: 100,
    icon: planet,
  },
  {
    title: "Word Maestro",
    days: 250,
    icon: threeStars,
  },
  {
    title: "Word Guru",
    days: 500,
    icon: quality,
  },
  {
    title: "Word Virtuoso",
    days: 1000,
    icon: successStar,
  },
  {
    title: "Word Connoisseur",
    days: 2000,
    icon: trophy,
  },
];
