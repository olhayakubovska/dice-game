import { Container } from "@mui/material";
import DiceGame from "@/components/dice-game/DiceGame";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ py: 1 }}>
      <DiceGame />
    </Container>
  );
}
