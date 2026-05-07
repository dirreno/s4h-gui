import { useMemo, useState, useEffect } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import StorageIcon from '@mui/icons-material/Storage';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookIcon from '@mui/icons-material/Book';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SortIcon from '@mui/icons-material/Sort';
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

import s4h from '../../assets/s4h.png';
import AppSidebar, { type NavigationItem } from './components/AppSidebar';
import OverviewPage from './components/OverviewPage';
import ProjectsPage from './components/ProjectsPage';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

const SIDEBAR_WIDTH = 96;

const navigation: NavigationItem[] = [
  {
    label: 'Getting Started',
    icon: <PlayArrowIcon />,
    path: '/',
  },
  {
    label: 'Data Extraction',
    icon: <StorageIcon />,
    path: '/datasources',
  },
  {
    label: 'Dictionary',
    icon: <BookIcon />,
    path: '/dictionary',
  },
  {
    label: 'Classification',
    icon: <SortIcon />,
    path: '/classification',
  },
  {
    label: 'Harmonize',
    icon: (
      <Box
        component="img"
        src={s4h}
        alt="Harmonize"
        sx={{ width: 32, height: 32, objectFit: 'contain' }}
      />
    ),
    path: '/harmonize',
  },
  {
    label: 'Settings',
    icon: <SettingsRoundedIcon />,
    path: '/settings',
  },
];

const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#3f51b5' : '#7c4dff',
      },
      background: {
        default: mode === 'light' ? '#f4f7fb' : '#0b1020',
        paper: mode === 'light' ? '#ffffff' : '#11182d',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
    },
  });

function Shell({
  mode,
  onToggleMode,
}: {
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}) {
  const location = useLocation();

  const activeTitle = useMemo(() => {
    const currentEntry = navigation.find(
      (item) => item.path === location.pathname,
    );

    return currentEntry?.label ?? 'Workspace';
  }, [location.pathname]);

  const isDark = mode === 'dark';

  // Native window controls are used; renderer window buttons removed.

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          ml: `${SIDEBAR_WIDTH}px`,
          borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
          backgroundImage: isDark
            ? 'linear-gradient(180deg, rgba(17, 24, 45, 0.96), rgba(17, 24, 45, 0.72))'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.92))',
          color: 'text.primary',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700 }}
          >
            {activeTitle}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} />
        </Toolbar>
      </AppBar>
      <AppSidebar isDark={isDark} items={navigation} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          minHeight: '100vh',
          background: isDark
            ? 'radial-gradient(circle at top right, rgba(124, 77, 255, 0.18), transparent 36%), linear-gradient(180deg, #0b1020 0%, #0d1326 100%)'
            : 'radial-gradient(circle at top right, rgba(63, 81, 181, 0.10), transparent 36%), linear-gradient(180deg, #f4f7fb 0%, #eef3f9 100%)',
        }}
      >
        <Routes>
          <Route path="/" element={<OverviewPage isDark={isDark} />} />
          <Route path="/projects" element={<ProjectsPage isDark={isDark} />} />
          <Route
            path="/settings"
            element={
              <SettingsPanel
                isDark={isDark}
                mode={mode}
                onToggleMode={onToggleMode}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (window.electron?.ipcRenderer?.sendMessage) {
      window.electron.ipcRenderer.sendMessage('theme-changed', mode);
    }
  }, [mode]);

  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Shell mode={mode} onToggleMode={toggleMode} />
      </Router>
    </ThemeProvider>
  );
}
