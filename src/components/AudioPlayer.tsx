import { IconButton } from "@mui/material";
import { VolumeUpRounded } from "@mui/icons-material";
import { AudioPlayerProps } from "../types";

const AudioPlayer = ({ audioURL }: AudioPlayerProps) => {
  const audio = new Audio(audioURL);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.play().catch((error) => console.error("Error playing audio:", error));
  };

  return (
    <IconButton onClick={(e) => playAudio(e)}>
      <VolumeUpRounded />
    </IconButton>
  );
};

export default AudioPlayer;
