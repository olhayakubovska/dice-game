'use client';

import { Box } from '@mui/material';
import { THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';
import PlayResult from './PlayResult';
import GuessSelector from './GuessSelector';
import ThresholdSlider from './ThresholdSlider';
import PlayButton from './PlayButton';
import HistoryTable from './HistoryTable';
import { useDiceGame } from '@/hooks/useDiceGame';

export default function DiceGame() {
  const {
    threshold, setThreshold, guess, setGuess,
    isOverImpossible, isUnderImpossible,
    loading, lastResult, error, history, handlePlay,
  } = useDiceGame();

  return (
    <Box>
      <PlayResult threshold={threshold} guess={guess} lastResult={lastResult} error={error} />

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
