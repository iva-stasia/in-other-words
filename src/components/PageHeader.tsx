import { useSelector } from 'react-redux';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fade, fadeIn } from '../utils/motion';

const PageHeader = () => {
  const { pathname } = useLocation();
  const activePage = useSelector((state: RootState) => state.menu.activePage);
  const path = pathname.slice(1).split('/');
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component={motion.div}
      variants={matchDownSm ? fade : fadeIn('down', 'tween', 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      {path.length >= 2 ? (
        <Link
          component={RouterLink}
          underline="none"
          to={`/${path[0]}`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <ArrowBackRounded />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            {activePage}
          </Typography>
        </Link>
      ) : (
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            fontWeight: 600,
          }}
        >
          {activePage}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
