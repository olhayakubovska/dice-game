'use client';

import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { HistoryItem } from '@/types/game';

interface Props {
  history: HistoryItem[];
}

const headerCellSx = { fontWeight: 700 };

export default function HistoryTable({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellSx}>Time</TableCell>
          <TableCell sx={headerCellSx}>Guess</TableCell>
          <TableCell sx={headerCellSx}>Result</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.time}</TableCell>
            <TableCell>
              {item.guess === 'under' ? 'Under' : 'Over'} {item.threshold}
            </TableCell>
            <TableCell sx={{ color: item.isWin ? 'success.main' : 'error.main', fontWeight: 700 }}>
              {item.result}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
