'use client';

import { useCallback, useEffect } from 'react';
import {
  Alert, Box, Button, FormControlLabel, Grow, Paper, Radio, RadioGroup,
  Slider, Typography,
} from '@mui/material';
import { GuessType } from '@/types/game';
import { THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';
import ResultAlert from './ResultAlert';
import HistoryTable from './HistoryTable';
import { useDiceGame } from '@/hooks/useDiceGame';
import { diceSliderMarks, diceSliderSx, MARK_SIZE } from './diceSliderSx';

const RESULT_DISPLAY_WIDTH = 320;
const RESULT_DISPLAY_HEIGHT = 200;
const RESULT_FONT_SIZE = 96;
const RESULT_FONT_WEIGHT = 300;
const RESULT_FONT_LINE_HEIGHT = '117%';
const RESULT_FONT_LETTER_SPACING = '-1.5px';
const PLAY_BUTTON_WIDTH = 320;
const PLAY_BUTTON_HEIGHT = 62;
const SLIDER_TOP_SPACING = 37;
const SLIDER_BLOCK_HEIGHT = 42;

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
      <Box sx={{ display: 'grid', pb: 1 }}>
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
              sx={{
                fontSize: RESULT_FONT_SIZE,
                fontWeight: RESULT_FONT_WEIGHT,
                lineHeight: RESULT_FONT_LINE_HEIGHT,
                letterSpacing: RESULT_FONT_LETTER_SPACING,
                color: 'text.primary',
              }}
            >
              {lastResult ? lastResult.result : threshold}
            </Typography>
          </Grow>
        </Paper>
      </Box>

      <Box sx={{ width: PLAY_BUTTON_WIDTH, mx: 'auto' }}>
        <RadioGroup
          row
          value={guess}
          onChange={handleGuessChange}
          sx={{ justifyContent: 'center' }}
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

      <Box
        sx={{
          width: PLAY_BUTTON_WIDTH,
          height: SLIDER_BLOCK_HEIGHT,
          mx: 'auto',
          mb: 3,
          mt: `${SLIDER_TOP_SPACING}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Slider
          value={threshold}
          onChange={handleThresholdChange}
          min={THRESHOLD_MIN}
          max={THRESHOLD_MAX}
          step={1}
          marks={diceSliderMarks}
          valueLabelDisplay="on"
          color="secondary"
          sx={{
            ...diceSliderSx,
            width: `calc(100% - ${MARK_SIZE}px)`,
            mx: `${MARK_SIZE / 2}px`,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="caption" color="text.secondary">{THRESHOLD_MIN}</Typography>
          <Typography variant="caption" color="text.secondary">{THRESHOLD_MAX}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handlePlay}
          disabled={loading}
          sx={{
            width: PLAY_BUTTON_WIDTH,
            height: PLAY_BUTTON_HEIGHT,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {loading ? 'Rolling...' : 'PLAY'}
        </Button>
      </Box>

      {history.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <HistoryTable history={history} />
        </Box>
      )}
    </Box>
  );
}
