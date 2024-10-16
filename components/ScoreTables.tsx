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
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Tabla de Récords</h2>
      {scores.length > 0 ? (
        <ul className="space-y-2">
          {scores.map((score, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded">
              <span className="text-white">{score.playerName}</span>
              <span className="text-yellow-400 font-bold">{score.score} intentos</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Aún no hay récords registrados.</p>
      )}
    </div>
  );
};

export default ScoresTable;
