import React from 'react';
import Card, { CardType } from './Card';
import BlankCard from './BlankCard';
import { deckVariants } from './StyledComponents';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface FlopProps {
  cards: CardType[];
  onFlopCardSelect?: (event: React.MouseEvent<HTMLImageElement>, card: CardType) => void;
  computerSelectedFlopCardCodes?: string[];
  playerSelectedFlopCardCodes?: string[];
  playerSelectedCard?: CardType;
  playerTurn: boolean;
  onBlankCardClick: () => void;
}

const HandContainer = styled(motion.div)`
  grid-row-start: 2;
  grid-column-start: span 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Flop: React.FC<FlopProps> = ({
  cards,
  onFlopCardSelect,
  computerSelectedFlopCardCodes,
  playerSelectedFlopCardCodes,
  playerSelectedCard,
  playerTurn,
  onBlankCardClick
}) => {
  return (
    <HandContainer
      variants={deckVariants}
      initial="hidden"
      animate="visible"
    >
      {!!playerTurn &&
        <BlankCard
          onBlankCardClick={onBlankCardClick}
          showCursor={!!playerSelectedCard}
        />
      }
      {/* Render the flop's cards */}
      {cards.length > 0 && cards.map((card: CardType) => (
        <Card
          key={card.code}
          card={card}
          type={computerSelectedFlopCardCodes?.includes(card.code) ? 'huge' : 'big'}
          onCardClick={onFlopCardSelect}
          showCursor={!!playerSelectedCard}
          hidden={playerSelectedFlopCardCodes?.includes(card.code)}
        />
      ))}
    </HandContainer>
  );
};

export default Flop;