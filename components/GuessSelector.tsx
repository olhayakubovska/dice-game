'use client';

import { useCallback } from 'react';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { GuessType } from '@/types/game';

const CONTENT_WIDTH = 320;

interface Props {
  value: GuessType;
  onChange: (value: GuessType) => void;
  underDisabled: boolean;
  overDisabled: boolean;
}

export default function GuessSelector({ value, onChange, underDisabled, overDisabled }: Props) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as GuessType);
  }, [onChange]);

  return (
    <Box sx={{ width: CONTENT_WIDTH, mx: 'auto' }}>
      <RadioGroup row value={value} onChange={handleChange} sx={{ justifyContent: 'center' }}>
        <FormControlLabel
          value="under"
          control={<Radio color="secondary" />}
          label="Under"
          disabled={underDisabled}
        />
        <FormControlLabel
          value="over"
          control={<Radio color="secondary" />}
          label="Over"
          disabled={overDisabled}
        />
      </RadioGroup>
    </Box>
  );
}
