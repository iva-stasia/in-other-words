import ky from "ky";
import { WordAudioResult } from '../types';
const WORDS_API_KEY = import.meta.env.VITE_WORDS_API_KEY as string;
const VITE_WORD_AUDIO_API_KEY = import.meta.env
  .VITE_WORD_AUDIO_API_KEY as string;

export const wordsApi = ky.create({
  prefixUrl: "https://wordsapiv1.p.rapidapi.com/words",
  headers: {
    "X-RapidAPI-Key": WORDS_API_KEY,
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
});

const wordAudioApi = ky.create({
  prefixUrl: "https://dictionaryapi.com/api/v3/references/collegiate/json",
});

export const getWordAudio = async (word: string) => {
  const audioData = await wordAudioApi(
    `${word}?key=${VITE_WORD_AUDIO_API_KEY}`
  ).json<WordAudioResult[]>();

  if (audioData[0].hwi && audioData[0].hwi.prs) {
    const audio = audioData[0].hwi.prs[0].sound.audio;
    let subdirectory = "";

    if (/^bix/.test(audio)) {
      subdirectory = "bix";
    } else if (/^gg/.test(audio)) {
      subdirectory = "gg";
    } else if (/^[0-9\p{P}]/.test(audio)) {
      subdirectory = "number";
    } else {
      subdirectory = audio.charAt(0);
    }

    const audioURL = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`;
    return audioURL;
  }

  return "";
};
