import { useLocation, NavLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import type { ReactNode } from 'react';
import logoSrc from '../../../assets/icons/48x48.png';

export interface NavigationItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface AppSidebarProps {
  isDark: boolean;
  items: NavigationItem[];
}

export default function AppSidebar({ isDark, items }: AppSidebarProps) {
  const location = useLocation();
  const SIDEBAR_WIDTH = 96;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          background: isDark
            ? 'linear-gradient(180deg, rgba(16, 21, 38, 0.98) 0%, rgba(11, 16, 32, 0.98) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 246, 251, 0.98) 100%)',
          borderRight: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
        },
      }}
    >
      <Toolbar sx={{ px: 3, py: 2, alignItems: 'flex-start' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 1,
              pt: 0.25,
            }}
          >
            <Box
              component="img"
              src={logoSrc}
              alt="s4h gui logo"
              sx={{ width: 48, height: 'auto', objectFit: 'contain' }}
            />
          </Box>
        </Box>
      </Toolbar>
      <Divider
        sx={{
          borderColor: isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(15, 23, 42, 0.08)',
        }}
      />
      <Box sx={{ px: 1.5, py: 2 }}>
        <List disablePadding>
          {items.map((item) => {
            const isSelected = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                selected={isSelected}
                sx={{
                  mb: 0.5,
                  borderRadius: 3,
                  color: 'text.secondary',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 1,
                  '&:hover': {
                    // remove the default inset so hover fills the sidebar
                    ml: -1.5,
                    mr: -1.5,
                    width: 'calc(100% + 24px)',
                    borderRadius: 0,
                    backgroundColor: isDark
                      ? 'rgba(124, 77, 255, 0.12)'
                      : 'rgba(63, 81, 181, 0.08)',
                  },
                  '&.Mui-selected': {
                    color: isDark ? 'common.white' : 'primary.main',
                    backgroundColor: isDark
                      ? 'rgba(124, 77, 255, 0.18)'
                      : 'rgba(63, 81, 181, 0.10)',
                    ml: -1.5,
                    mr: -1.5,
                    width: 'calc(100% + 24px)',
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: isDark
                        ? 'rgba(124, 77, 255, 0.26)'
                        : 'rgba(63, 81, 181, 0.16)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    textAlign: 'center',
                    display: 'block',
                    color: 'inherit',
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
