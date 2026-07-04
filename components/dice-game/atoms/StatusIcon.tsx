'use client';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props {
  isWin: boolean;
}

export default function StatusIcon({ isWin }: Props) {
  return isWin ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />;
}
