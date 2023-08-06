import ky from "ky";

const WORDS_API_KEY = import.meta.env.VITE_WORDS_API_KEY as string;

export const wordsApi = ky.create({
  prefixUrl: "https://wordsapiv1.p.rapidapi.com/words",
  headers: {
    "X-RapidAPI-Key": WORDS_API_KEY,
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
});
