import React from 'react';
import Card, {CardType} from './Card';
import { motion } from 'framer-motion';
import { HandContainer } from './StyledComponents';

interface PlayerHandProps {
  cards: CardType[];
  playerSelectedCard?: CardType;
  onPlayerCardSelect?: (event: React.MouseEvent<HTMLImageElement>, card: CardType) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, playerSelectedCard, onPlayerCardSelect }) => {
  return (
    <HandContainer
      initial={{scale: 0.5, opacity: 0.3}}
      animate={{scale: 1, opacity: 1, transition: { duration: 0.5 }}}
    >
    {cards.map((card, index) => (
        <motion.div
        key={index}
        whileHover={{ y: -10 }}
      >
        <Card
          key={card.code}
          card={card}
          hidden={playerSelectedCard?.code === card.code}
          onCardClick={onPlayerCardSelect}
          type={'medium'}
          showCursor={true}
        />
      </motion.div>
    ))}
  </HandContainer>
  );
};

export default PlayerHand;