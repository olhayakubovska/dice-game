"use client";

import { Alert, AlertTitle } from "@mui/material";
import StatusIcon from "../atoms/StatusIcon";
import { GuessType, PlayResponse } from "@/types/game";

const ALERT_WIDTH = 600;
const ALERT_HEIGHT_WITH_SUBTITLE = 76;
const ALERT_HEIGHT = 48;

interface Props {
  result: PlayResponse;
  threshold: number;
  guess: GuessType;
}

export default function ResultAlert({ result, threshold }: Props) {
  const direction = result.result > threshold ? "higher" : "lower";

  return (
    <Alert
      variant="filled"
      severity={result.isWin ? "success" : "error"}
      icon={<StatusIcon isWin={result.isWin} />}
      sx={{
        mb: 2,
        width: ALERT_WIDTH,
        height: result.isWin ? ALERT_HEIGHT : ALERT_HEIGHT_WITH_SUBTITLE,
        py: '6px',
        px: '16px',
      }}
    >
      <AlertTitle>{result.isWin ? "You won" : "You lost"}</AlertTitle>
      {!result.isWin && `Number was ${direction}`}
    </Alert>
  );
}
