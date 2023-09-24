import React, { useEffect, useState } from 'react';
import Card, { CardType } from './Card';
import { HandContainer } from './StyledComponents';
import BlankCard from './BlankCard';

interface FlopProps {
  cards: CardType[];
  onFlopCardSelect?: (event: React.MouseEvent<HTMLImageElement>, card: CardType) => void;
  computerSelectedFlopCardCodes?: string[];
  playerSelectedCard?: CardType;
  playerTurn: boolean;
  onBlankCardClick: () => void;
}

const Flop: React.FC<FlopProps> = ({
  cards,
  onFlopCardSelect,
  computerSelectedFlopCardCodes,
  playerSelectedCard,
  playerTurn,
  onBlankCardClick
}) => {
  return (
    <HandContainer
      initial={{ scale: 0.5, opacity: 0.3 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
    >
      {!!playerTurn &&
        <BlankCard
          onBlankCardClick={onBlankCardClick}
        />
      }
      {/* Render the flop's cards */}
      {cards.map((card: CardType) => (
        <Card
          key={card.code}
          card={card}
          type={computerSelectedFlopCardCodes?.includes(card.code) ? 'huge' : 'big'}
          onCardClick={onFlopCardSelect}
          showCursor={!!playerSelectedCard}
        />
      ))}
    </HandContainer>
  );
};

export default Flop;