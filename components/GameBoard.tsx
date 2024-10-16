'use client';
// components/GameBoard.tsx

import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import Confetti from 'react-confetti';
import { shuffleArray } from '@/utils/shuffle';
import { useWindowSize } from '@/hooks/useWindowSize';

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
  const { width, height } = useWindowSize();

  const getGridDimensions = useCallback(() => {
    if (width && height) {
      if (width < height) { // Vertical orientation
        if (width < 768) return { cols: 4, rows: 6 }; // Mobile
        if (width < 1024) return { cols: 8, rows: 8 }; // Tablet
        return { cols: 9, rows: 9 }; // Desktop
      } else { // Horizontal orientation
        if (height < 768) return { cols: 6, rows: 4 }; // Mobile
        if (height < 1024) return { cols: 8, rows: 8 }; // Tablet
        return { cols: 9, rows: 9 }; // Desktop
      }
    }
    return { cols: 6, rows: 6 }; // Default
  }, [width, height]);

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
    <div className="flex flex-col items-center justify-between h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Memoria de Heroes</h1>
      <div className={`grid gap-2 w-full flex-grow`} style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}>
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
      {gameWon && <Confetti />}
      <div className="mt-4 flex justify-between items-center w-full">
        <p>Intentos: {attempts}</p>
        <button onClick={resetGame} className="px-4 py-2 bg-blue-500 text-white rounded">Reiniciar</button>
      </div>
    </div>
  );
};

export default GameBoard;
