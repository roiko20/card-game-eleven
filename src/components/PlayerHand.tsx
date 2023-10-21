import React from 'react';
import Card, {CardType} from './Card';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {deckVariants} from './StyledComponents';

interface PlayerHandProps {
  cards: CardType[];
  playerSelectedCard?: CardType;
  onPlayerCardSelect?: (event: React.MouseEvent<HTMLImageElement>, card: CardType) => void;
}

const HandContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row-start: 3;
  grid-column-start: 2;
  height: 100%;
`;

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, playerSelectedCard, onPlayerCardSelect }) => {
  return (
    <HandContainer
      variants={deckVariants}
      initial="hidden"
      animate="visible"
    >
    {cards.map((card) => (
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