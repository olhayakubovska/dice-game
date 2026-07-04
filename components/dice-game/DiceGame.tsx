'use client';

import { Box } from '@mui/material';
import { THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';
import PlayResult from './components/PlayResult';
import GuessSelector from './components/GuessSelector';
import ThresholdSlider from './components/ThresholdSlider';
import PlayButton from './components/PlayButton';
import HistoryTable from './components/HistoryTable';
import { useDiceGame } from '@/hooks/useDiceGame';

export default function DiceGame() {
  const {
    threshold, setThreshold, guess, setGuess,
    isOverImpossible, isUnderImpossible,
    loading, lastResult, error, history, handlePlay,
  } = useDiceGame();

  return (
    <Box>
      <PlayResult
        threshold={threshold}
        guess={guess}
        lastResult={lastResult}
        error={error}
        loading={loading}
      />

      <GuessSelector
        value={guess}
        onChange={setGuess}
        underDisabled={isUnderImpossible}
        overDisabled={isOverImpossible}
      />

      <ThresholdSlider
        value={threshold}
        onChange={setThreshold}
        min={THRESHOLD_MIN}
        max={THRESHOLD_MAX}
      />

      <PlayButton loading={loading} onClick={handlePlay} />

      <HistoryTable history={history} />
    </Box>
  );
}
