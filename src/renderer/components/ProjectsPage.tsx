import { Typography } from '@mui/material';
import ContentCard from './ContentCard';

interface ProjectsPageProps {
  isDark: boolean;
}

export default function ProjectsPage({ isDark }: ProjectsPageProps) {
  return (
    <ContentCard isDark={isDark}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Projects
      </Typography>
      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Add your project list, tables, or editor panels here.
      </Typography>
    </ContentCard>
  );
}
