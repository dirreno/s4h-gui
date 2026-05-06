import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface ContentCardProps {
  children: ReactNode;
  isDark: boolean;
  sx?: SxProps<Theme>;
}

export default function ContentCard({
  children,
  isDark,
  sx,
}: ContentCardProps) {
  const cardStyles = {
    backgroundColor: isDark ? 'rgb(17, 24, 45)' : 'rgb(255, 255, 255)',
    borderColor: isDark
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(15, 23, 42, 0.08)',
  };
  const sxStyles = [] as SxProps<Theme>[];

  if (sx) {
    if (Array.isArray(sx)) {
      sxStyles.push(...sx);
    } else {
      sxStyles.push(sx);
    }
  }

  return (
    <Box
      className="ContentCard"
      sx={[cardStyles, ...sxStyles] as SxProps<Theme>}
    >
      {children}
    </Box>
  );
}

ContentCard.defaultProps = {
  sx: undefined,
};
