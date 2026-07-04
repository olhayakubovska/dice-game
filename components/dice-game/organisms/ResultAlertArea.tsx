"use client";

import { Alert, Box } from "@mui/material";
import { GuessType, PlayResponse } from "@/types/game";
import ResultAlert from "../molecules/ResultAlert";

interface Props {
  threshold: number;
  guess: GuessType;
  lastResult: PlayResponse | null;
  error: string | null;
}

export default function ResultAlertArea({ threshold, guess, lastResult, error }: Props) {
  return (
    <Box sx={{ display: "grid", pb: 1 }}>
      <Box sx={{ gridArea: "1 / 1", visibility: "hidden" }} aria-hidden>
        <ResultAlert result={{ result: 0, isWin: false }} threshold={threshold} guess={guess} />
      </Box>

      <Box sx={{ gridArea: "1 / 1" }}>
        {error && <Alert severity="error">{error}</Alert>}
        {lastResult && (
          <ResultAlert result={lastResult} threshold={threshold} guess={guess} />
        )}
      </Box>
    </Box>
  );
}
