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
      className="card"
      onClick={onClick}
      animate={{ rotateY: isFlipped ? 0 : 180 }}
      transition={{ duration: 0.6 }}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="card-inner"
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          className="card-front"
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${card})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotateY(0deg)',
          }}
        />
        <div
          className="card-back"
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
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
