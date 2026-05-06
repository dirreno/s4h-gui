import { useState, type ReactNode } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ContentCard from './ContentCard';

interface SettingsPanelProps {
  isDark: boolean;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}

type PythonResult = Record<string, unknown>;

type PandasDataFrame = {
  shape: number[];
  columns: string[];
  data: unknown[][];
  summary?: Record<string, number>;
};

function PythonDataFrameView({
  dataFrame,
  isDark,
}: {
  dataFrame: PandasDataFrame;
  isDark: boolean;
}) {
  const renderCellValue = (value: unknown): ReactNode => {
    if (value === null || value === undefined) return '';
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return String(value);
    }
    return JSON.stringify(value);
  };

  const { shape } = dataFrame;
  const { columns } = dataFrame;
  const { data } = dataFrame;
  const { summary } = dataFrame;

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: isDark
          ? 'rgba(56, 142, 60, 0.1)'
          : 'rgba(56, 142, 60, 0.05)',
        border: '1px solid',
        borderColor: isDark
          ? 'rgba(56, 142, 60, 0.3)'
          : 'rgba(56, 142, 60, 0.2)',
        borderRadius: '8px',
        overflowX: 'auto',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          color: isDark ? '#81c784' : '#2e7d32',
          fontWeight: 'bold',
        }}
      >
        {`DataFrame: ${shape[0]} rows × ${shape[1]} columns`}
      </Typography>

      <Table
        size="small"
        sx={{
          '& thead': {
            backgroundColor: isDark
              ? 'rgba(76, 175, 80, 0.15)'
              : 'rgba(76, 175, 80, 0.1)',
          },
          '& tbody tr:nth-of-type(odd)': {
            backgroundColor: isDark
              ? 'rgba(76, 175, 80, 0.05)'
              : 'rgba(76, 175, 80, 0.02)',
          },
          '& th, & td': {
            borderColor: isDark
              ? 'rgba(76, 175, 80, 0.2)'
              : 'rgba(76, 175, 80, 0.15)',
            color: isDark ? '#fff' : '#000',
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={`header-${column}`}
                sx={{
                  fontWeight: 'bold',
                  color: isDark ? '#81c784' : '#2e7d32',
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={JSON.stringify(row)}>
              {columns.map((column) => {
                const cell = row[columns.indexOf(column)];

                return (
                  <TableCell key={`${JSON.stringify(row)}-${column}`}>
                    {renderCellValue(cell)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {summary && (
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: isDark
              ? 'rgba(76, 175, 80, 0.2)'
              : 'rgba(76, 175, 80, 0.15)',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: isDark ? '#81c784' : '#2e7d32',
              fontWeight: 'bold',
            }}
          >
            Summary Statistics:
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 1,
            }}
          >
            {Object.entries(summary).map(([key, value]) => (
              <Typography
                key={key}
                variant="body2"
                sx={{
                  color: isDark ? '#b0bec5' : '#546e7a',
                }}
              >
                <strong>{key}:</strong>
                {typeof value === 'number'
                  ? ` ${value.toFixed(2)}`
                  : ` ${value}`}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

function PythonResultView({
  pythonResult,
  isDark,
}: {
  pythonResult: PythonResult;
  isDark: boolean;
}) {
  const dataFrame = pythonResult.pandas_dataframe as
    | PandasDataFrame
    | undefined;

  if (dataFrame) {
    return <PythonDataFrameView dataFrame={dataFrame} isDark={isDark} />;
  }

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: isDark
          ? 'rgba(56, 142, 60, 0.1)'
          : 'rgba(56, 142, 60, 0.05)',
        border: '1px solid',
        borderColor: isDark
          ? 'rgba(56, 142, 60, 0.3)'
          : 'rgba(56, 142, 60, 0.2)',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: isDark ? '#81c784' : '#2e7d32',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
        }}
      >
        {JSON.stringify(pythonResult, null, 2)}
      </Typography>
    </Box>
  );
}

export default function SettingsPanel({
  isDark,
  mode,
  onToggleMode,
}: SettingsPanelProps) {
  const [pythonResult, setPythonResult] = useState<PythonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runPythonScript = async () => {
    setIsLoading(true);
    setError(null);
    setPythonResult(null);

    try {
      const result = await window.electron?.ipcRenderer.invoke('run-python');

      if (result && typeof result === 'object') {
        setPythonResult(result as PythonResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentCard isDark={isDark}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Settings
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Appearance
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            border: '1px solid',
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(15, 23, 42, 0.12)',
            borderRadius: 2,
            backgroundColor: isDark
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Theme mode</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {mode === 'dark'
                ? 'Dark mode is enabled'
                : 'Light mode is enabled'}
            </Typography>
          </Box>
          <Switch
            checked={mode === 'dark'}
            onChange={onToggleMode}
            slotProps={{ input: { 'aria-label': 'Toggle dark mode' } }}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Python Integration Example
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Click the button below to execute a Python script from your React app
          using IPC.
        </Typography>

        <Button
          variant="contained"
          onClick={runPythonScript}
          disabled={isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: 'inherit' }} />
              Running...
            </>
          ) : (
            'Run Python Script'
          )}
        </Button>

        {error && (
          <Box
            sx={{
              p: 2,
              mt: 2,
              backgroundColor: isDark
                ? 'rgba(211, 47, 47, 0.1)'
                : 'rgba(211, 47, 47, 0.05)',
              border: '1px solid',
              borderColor: isDark
                ? 'rgba(211, 47, 47, 0.3)'
                : 'rgba(211, 47, 47, 0.2)',
              borderRadius: '8px',
              color: isDark ? '#ff9999' : '#c62828',
            }}
          >
            <Typography variant="body2">
              <strong>Error:</strong> {error}
            </Typography>
          </Box>
        )}

        {pythonResult && (
          <Box sx={{ mt: 2 }}>
            <PythonResultView pythonResult={pythonResult} isDark={isDark} />
          </Box>
        )}
      </Box>
    </ContentCard>
  );
}
