import {
  CloseRounded,
  FilterListOffRounded,
  FilterListRounded,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import Filter from './components/Filter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import ToggleFilter from './components/ToggleFilter';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../../../../../utils/motion';

interface FiltersProps {
  title: string;
}

const Filters = ({ title }: FiltersProps) => {
  const [open, setOpen] = useState(false);
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  const { pathname } = useLocation();
  const [_searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const inSet = pathname.includes('word-sets');

  const wordSetsOptions = wordSets.map((set) => set.title);

  const handleReset = () => {
    setSearchParams((prev) => {
      prev.delete('progress');
      prev.delete('set');

      return prev;
    });
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={2}
      sx={{
        width: { xs: 'calc(100vw - 32px)', sm: 'auto' },
      }}
    >
      {!open && (
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="text.secondary"
          sx={{
            display: { sx: 'block', sm: 'none' },
            position: 'absolute',
            top: '8px',
          }}
        >
          {title}
        </Typography>
      )}
      <AnimatePresence>
        {open && (
          <Stack
            component={motion.div}
            variants={matchDownSm ? {} : fadeIn('left', 'tween', 0, 0.3)}
            initial="hidden"
            animate="show"
            exit="exit"
            direction={{ xs: 'column', sm: 'row' }}
            gap={{ xs: 1, sm: 2 }}
            width={1}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                order: { xs: 1, sm: 0 },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <ToggleFilter />
              {!inSet && <Filter title="Set" options={wordSetsOptions} />}
            </Box>

            <Tooltip title="Reset filters" sx={{ alignSelf: 'flex-start' }}>
              <IconButton onClick={handleReset}>
                <FilterListOffRounded />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </AnimatePresence>

      <Box
        sx={{ position: { xs: 'absolute', sm: 'initial' }, right: 0, top: 0 }}
      >
        <Tooltip title={open ? 'Close filters' : 'Filter list'}>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <CloseRounded /> : <FilterListRounded />}
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Filters;
