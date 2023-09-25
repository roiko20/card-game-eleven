import React from 'react';
import Card, {CardType} from './Card';
import { motion } from 'framer-motion';
import { HandContainer } from './StyledComponents';
import {deckVariants} from './StyledComponents';

interface PlayerHandProps {
  cards: CardType[];
  playerSelectedCard?: CardType;
  onPlayerCardSelect?: (event: React.MouseEvent<HTMLImageElement>, card: CardType) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, playerSelectedCard, onPlayerCardSelect }) => {
  return (
    <HandContainer
      variants={deckVariants}
      initial="hidden"
      animate="visible"
    >
    {cards.map((card, index) => (
        <Card
          key={card.code}
          card={card}
          hidden={playerSelectedCard?.code === card.code}
          onCardClick={onPlayerCardSelect}
          type={'medium'}
          showCursor={true}
        />
    ))}
  </HandContainer>
  );
};

export default PlayerHand;