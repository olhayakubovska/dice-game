'use client';

import { Button } from '@mui/material';

const PLAY_BUTTON_WIDTH = 320;
const PLAY_BUTTON_HEIGHT = 42;

interface Props {
  loading: boolean;
  onClick: () => void;
}

export default function PlayButton({ loading, onClick }: Props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={onClick}
      disabled={loading}
      sx={{
        display: 'flex',
        width: PLAY_BUTTON_WIDTH,
        height: PLAY_BUTTON_HEIGHT,
        mx: 'auto',
        mt: 2,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      {loading ? 'Rolling...' : 'PLAY'}
    </Button>
  );
}
