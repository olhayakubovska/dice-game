'use client';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { HistoryItem } from '@/types/game';
import HistoryRow from '../molecules/HistoryRow';

interface Props {
  history: HistoryItem[];
}

const headerCellSx = { fontWeight: 700 };

export default function HistoryTable({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <Table size="small" sx={{ mt: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellSx}>Time</TableCell>
          <TableCell sx={headerCellSx}>Guess</TableCell>
          <TableCell sx={headerCellSx}>Result</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((item) => (
          <HistoryRow key={item.id} item={item} />
        ))}
      </TableBody>
    </Table>
  );
}
