import { IconButton, Typography } from "@mui/material";
import { VolumeUpRounded } from "@mui/icons-material";
import { AudioPlayerProps } from "../types";

const AudioPlayer = ({ audioURL, pronunciation }: AudioPlayerProps) => {
  const audio = new Audio(audioURL);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.play().catch((error) => console.error("Error playing audio:", error));
  };

  return (
    <IconButton color='primary' onClick={(e) => playAudio(e)}>
      <VolumeUpRounded/>
      {pronunciation && <Typography ml={1}>[{pronunciation}]</Typography>}
    </IconButton>
  );
};

export default AudioPlayer;
