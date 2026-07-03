'use client';

import { Box, Button } from '@mui/material';

const PLAY_BUTTON_WIDTH = 320;
const PLAY_BUTTON_HEIGHT = 42;

interface Props {
  loading: boolean;
  onClick: () => void;
}

export default function PlayButton({ loading, onClick }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={onClick}
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
  );
}
