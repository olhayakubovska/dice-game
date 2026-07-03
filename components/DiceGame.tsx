'use client';

import { useCallback, useEffect } from 'react';
import {
  Alert, Box, Button, FormControlLabel, Grow, Paper, Radio, RadioGroup,
  Slider, Typography,
} from '@mui/material';
import { GuessType } from '@/types/game';
import { MAX_HISTORY, THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';
import ResultAlert from './ResultAlert';
import HistoryTable from './HistoryTable';
import { useDiceGame } from '@/hooks/useDiceGame';
import { diceSliderMarks, diceSliderSx } from './diceSliderSx';

const RESULT_DISPLAY_WIDTH = 300;
const RESULT_DISPLAY_HEIGHT = 170;
const RESULT_FONT_SIZE = 96;
const RESULT_FONT_WEIGHT = 300;
const HISTORY_ROW_HEIGHT = 37;
const HISTORY_RESERVED_HEIGHT = HISTORY_ROW_HEIGHT * (MAX_HISTORY + 1);

export default function DiceGame() {
  const {
    threshold, setThreshold, guess, setGuess,
    loading, lastResult, error, history, handlePlay,
  } = useDiceGame();

  const isOverImpossible = threshold >= THRESHOLD_MAX;
  const isUnderImpossible = threshold <= THRESHOLD_MIN;

  useEffect(() => {
    if (isOverImpossible && guess === 'over') {
      setGuess('under');
    } else if (isUnderImpossible && guess === 'under') {
      setGuess('over');
    }
  }, [isOverImpossible, isUnderImpossible, guess, setGuess]);

  const handleThresholdChange = useCallback((_: Event, newThreshold: number | number[]) => {
    if (typeof newThreshold === 'number') setThreshold(newThreshold);
  }, [setThreshold]);

  const handleGuessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value as GuessType);
  }, [setGuess]);

  return (
    <Box>
      <Box sx={{ display: 'grid', pb: 2 }}>
        <Box sx={{ gridArea: '1 / 1', visibility: 'hidden' }} aria-hidden>
          <ResultAlert result={{ result: 0, isWin: true }} threshold={threshold} guess={guess} />
        </Box>

        <Box sx={{ gridArea: '1 / 1' }}>
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {lastResult && (
            <ResultAlert result={lastResult} threshold={threshold} guess={guess} />
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Paper
          elevation={0}
          aria-live="polite"
          sx={{
            width: RESULT_DISPLAY_WIDTH,
            height: RESULT_DISPLAY_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            borderRadius: 2,
          }}
        >
          <Grow key={lastResult ? lastResult.result : threshold} in timeout={300}>
            <Typography
              variant="h1"
              sx={{ fontSize: RESULT_FONT_SIZE, fontWeight: RESULT_FONT_WEIGHT, color: 'text.primary' }}
            >
              {lastResult ? lastResult.result : threshold}
            </Typography>
          </Grow>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3}}>
        <RadioGroup
          row
          value={guess}
          onChange={handleGuessChange}
        >
          <FormControlLabel
            value="under"
            control={<Radio color="secondary" />}
            label="Under"
            disabled={isUnderImpossible}
          />
          <FormControlLabel
            value="over"
            control={<Radio color="secondary" />}
            label="Over"
            disabled={isOverImpossible}
          />
        </RadioGroup>
      </Box>

      <Box sx={{ px: 4, mb: 3 }}>
        <Slider
          value={threshold}
          onChange={handleThresholdChange}
          min={THRESHOLD_MIN}
          max={THRESHOLD_MAX}
          step={1}
          marks={diceSliderMarks}
          valueLabelDisplay="on"
          color="secondary"
          sx={diceSliderSx}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">{THRESHOLD_MIN}</Typography>
          <Typography variant="caption" color="text.secondary">{THRESHOLD_MAX}</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        onClick={handlePlay}
        disabled={loading}
        sx={{ py: 1.5, fontWeight: 700, letterSpacing: 1 }}
      >
        {loading ? 'Rolling...' : 'PLAY'}
      </Button>

      <Box sx={{ mt: 4, minHeight: HISTORY_RESERVED_HEIGHT }}>
        {history.length > 0 && <HistoryTable history={history} />}
      </Box>
    </Box>
  );
}
