import { Container, Box } from "@mui/material";
import DiceGame from "@/components/DiceGame";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box>
        <DiceGame />
      </Box>
    </Container>
  );
}
