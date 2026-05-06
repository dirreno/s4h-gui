import { Typography } from '@mui/material';
import ContentCard from './ContentCard';

interface OverviewPageProps {
  isDark: boolean;
}

export default function OverviewPage({ isDark }: OverviewPageProps) {
  return (
    <ContentCard isDark={isDark}>
      <Typography
        variant="overline"
        sx={{ color: 'primary.main', letterSpacing: 2 }}
      >
        Overview
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
        Introduction
      </Typography>
      <Typography sx={{ mt: 2, color: 'text.secondary', maxWidth: 720 }}>
        socio4health is an extraction, transformation, and loading tool designed
        to simplify the process of collecting and merging data from multiple
        sources into a unified database structure.
      </Typography>
    </ContentCard>
  );
}
