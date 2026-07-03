'use client';

import { useEffect } from 'react';
import {
  Alert, Box, Button, FormControlLabel, Paper, Radio, RadioGroup,
  Slider, Typography,
} from '@mui/material';
import { GuessType } from '@/types/game';
import { THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';
import ResultAlert from './ResultAlert';
import HistoryTable from './HistoryTable';
import { useDiceGame } from '@/hooks/useDiceGame';
import { diceSliderMarks, diceSliderSx } from './diceSliderSx';

const RESULT_DISPLAY_WIDTH = 300;
const RESULT_DISPLAY_HEIGHT = 170;
const RESULT_FONT_SIZE = 96;
const RESULT_FONT_WEIGHT = 300;

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

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {lastResult && (
        <ResultAlert result={lastResult} threshold={threshold} guess={guess} />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Paper
          elevation={0}
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
          <Typography
            variant="h1"
            sx={{ fontSize: RESULT_FONT_SIZE, fontWeight: RESULT_FONT_WEIGHT, color: 'text.primary' }}
          >
            {lastResult ? lastResult.result : '?'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <RadioGroup
          row
          value={guess}
          onChange={(e) => setGuess(e.target.value as GuessType)}
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
          onChange={(_, val) => {
            if (typeof val === 'number') setThreshold(val);
          }}
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

      {history.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <HistoryTable history={history} />
        </Box>
      )}
    </Box>
  );
}
