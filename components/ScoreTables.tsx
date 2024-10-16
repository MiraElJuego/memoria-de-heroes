'use client';
// components/ScoresTable.tsx
import { useEffect, useState } from 'react';

interface Score {
  playerName: string;
  score: number;
}

const ScoresTable: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('memory-game-scores') || '[]');
    setScores(savedScores);
  }, []);

  return (
    <div>
      <h2>Tabla de Récords</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.playerName} - {score.score} intentos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoresTable;
