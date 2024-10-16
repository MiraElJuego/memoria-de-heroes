'use client';
// components/GameBoard.tsx

import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import dynamic from 'next/dynamic';
import { shuffleArray } from '@/utils/shuffle';
import ScoresTable from './ScoreTables';

// Importación dinámica de Confetti para evitar problemas de SSR
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const generateCards = (): string[] => {
  return [
    'images/memory-game-01.jpg',
    'images/memory-game-02.jpg',
    'images/memory-game-03.jpg',
    'images/memory-game-04.jpg',
    'images/memory-game-05.jpg',
    'images/memory-game-06.jpg',
    'images/memory-game-07.jpg',
    'images/memory-game-08.jpg',
    'images/memory-game-09.jpg',
    'images/memory-game-10.jpg',
    'images/memory-game-11.jpg',
    'images/memory-game-12.jpg',
    'images/memory-game-13.jpg',
    'images/memory-game-14.jpg',
    'images/memory-game-15.jpg',
    'images/memory-game-16.jpg',
    'images/memory-game-17.jpg',
    'images/memory-game-18.jpg',
  ];
};

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true); // Nuevo estado
  const [showScores, setShowScores] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const getGridDimensions = useCallback(() => {
    const { width, height } = windowSize;
    console.log('Window size:', width, height);
    if (width && height) {
      if (width < height) { // Vertical orientation
        if (width < 768) return { cols: 4, rows: 9 }; // Mobile
        if (width < 1024) return { cols: 6, rows: 6 }; // Tablet
        return { cols: 6, rows: 6 }; // Desktop
      } else { // Horizontal orientation
        if (height < 768) return { cols: 9, rows: 4 }; // Mobile
        if (height < 1024) return { cols: 6, rows: 6 }; // Tablet
        return { cols: 6, rows: 6 }; // Desktop
      }
    }
    return { cols: 6, rows: 6 }; // Default
  }, [windowSize]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initializeCards = useCallback(() => {
    setIsInitializing(true); // Iniciar la inicialización
    const { cols, rows } = getGridDimensions();
    const totalCards = cols * rows;
    const initialCards = generateCards();
    const shuffledCards = shuffleArray([...initialCards, ...initialCards]).slice(0, totalCards);
    setCards(shuffledCards);
    setTimeout(() => setIsInitializing(false), 500); // Finalizar la inicialización después de 500ms
  }, [getGridDimensions]);

  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  const handleFlip = (index: number) => {
    if (isInitializing || flippedCards.length === 2 || matchedCards.includes(index)) return;
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (flipped: number[]) => {
    const [first, second] = flipped;
    if (cards[first] === cards[second]) {
      const newMatchedCards = [...matchedCards, first, second];
      setMatchedCards(newMatchedCards);
      setFlippedCards([]);

      if (newMatchedCards.length === cards.length) {
        setGameWon(true);
        saveScore('Jugador', attempts + 1);  // +1 because this attempt counts
      }
    } else {
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    initializeCards();
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setGameWon(false);
  };

  const saveScore = (playerName: string, score: number) => {
    const currentScores = JSON.parse(localStorage.getItem('memory-game-scores') || '[]');
    currentScores.push({ playerName, score });
    currentScores.sort((a: { score: number }, b: { score: number }) => a.score - b.score);
    localStorage.setItem('memory-game-scores', JSON.stringify(currentScores));
  };

  const { cols, rows } = getGridDimensions();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-900 text-white p-4">
      <header className="w-full flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-400">Memoria de Héroes</h1>
        <div>
          <button
            onClick={() => setShowScores(!showScores)}
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {showScores ? 'Ocultar Récords' : 'Ver Récords'}
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <main className="flex-grow w-full flex justify-center items-center">
        {showScores ? (
          <ScoresTable />
        ) : (
          <div
            className={`grid gap-2 w-full max-w-4xl`}
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              aspectRatio: `${cols} / ${rows}`
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                index={index}
                isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                onClick={() => handleFlip(index)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="w-full text-center mt-4">
        <p className="text-xl">Intentos: <span className="font-bold text-yellow-400">{attempts}</span></p>
      </footer>

      {gameWon && <Confetti />}
    </div>
  );
};

export default GameBoard;
