import { Email, GitHub, LinkedIn } from '@mui/icons-material';

export const contacts = [
  {
    title: 'GitHub',
    path: 'https://github.com/iva-stasia',
    icon: <GitHub />,
  },
  {
    title: 'LinkedIn',
    path: 'https://www.linkedin.com/in/iva-stasia/',
    icon: <LinkedIn />,
  },
  {
    title: 'Gmail',
    path: 'mailto:iva21sta@gmail.com',
    icon: <Email />,
  },
];

export const LATIN_CHAR_REG_EXP = /^[a-z\s,.-]+$/i;
