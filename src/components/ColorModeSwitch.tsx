import { IconButton, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleColorMode } from '../store/slices/colorModeSlice';
import { Brightness4Rounded, Brightness7Rounded } from '@mui/icons-material';

const ColorModeSwitch = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(toggleColorMode())}
      aria-label="Switch Color Mode"
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Rounded />
      ) : (
        <Brightness4Rounded />
      )}
    </IconButton>
  );
};

export default ColorModeSwitch;
