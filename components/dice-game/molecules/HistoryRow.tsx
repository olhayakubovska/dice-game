'use client';

import { TableCell, TableRow } from '@mui/material';
import { HistoryItem } from '@/types/game';

interface Props {
  item: HistoryItem;
}

export default function HistoryRow({ item }: Props) {
  return (
    <TableRow>
      <TableCell>{item.time}</TableCell>
      <TableCell>
        {item.guess === 'under' ? 'Under' : 'Over'} {item.threshold}
      </TableCell>
      <TableCell sx={{ color: item.isWin ? 'success.main' : 'error.main', fontWeight: 500 }}>
        {item.result}
      </TableCell>
    </TableRow>
  );
}
