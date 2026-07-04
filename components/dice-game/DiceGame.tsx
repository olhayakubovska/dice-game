'use client';

import { Box } from '@mui/material';
import { THRESHOLD_MAX, THRESHOLD_MIN } from '@/lib/constants';
import ResultAlertArea from './organisms/ResultAlertArea';
import ResultDisplay from './organisms/ResultDisplay';
import HistoryTable from './organisms/HistoryTable';
import GuessSelector from './molecules/GuessSelector';
import ThresholdSlider from './molecules/ThresholdSlider';
import PlayButton from './molecules/PlayButton';
import { useDiceGame } from '@/hooks/useDiceGame';

export default function DiceGame() {
  const {
    threshold, setThreshold, guess, setGuess,
    isOverImpossible, isUnderImpossible,
    loading, lastResult, error, history, handlePlay,
  } = useDiceGame();

  return (
    <Box>
      <ResultAlertArea threshold={threshold} guess={guess} lastResult={lastResult} error={error} />

      <ResultDisplay value={lastResult ? lastResult.result : null} loading={loading} />

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
