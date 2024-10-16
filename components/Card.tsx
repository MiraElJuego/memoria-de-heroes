// components/Card.tsx
import { motion } from 'framer-motion';

interface CardProps {
  card: string;
  index: number;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, index, isFlipped, onClick }) => {
  console.log('Card rendered', index);
  return (
    <motion.div
      className="card w-full h-full cursor-pointer"
      onClick={onClick}
      animate={{ rotateY: isFlipped ? 0 : 180 }}
      transition={{ duration: 0.6 }}
      style={{ perspective: '1000px' }}
    >
      <div
        className="card-inner w-full h-full relative hover:scale-110 hover:shadow-2xl ease-in-out transition-transform duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="card-front absolute w-full h-full rounded-lg shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            backgroundImage: `url(${card})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotateY(0deg)',
          }}
        />
        <div
          className="card-back absolute w-full h-full rounded-lg shadow-lg bg-blue-800"
          style={{
            backfaceVisibility: 'hidden',
            backgroundImage: 'url(/images/card-cover.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotateY(180deg)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default Card;
