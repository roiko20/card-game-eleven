import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card, {CardType} from './Card';
import { HandContainer } from './StyledComponents';

interface ComputerHandProps {
    cards: CardType[];
    computerSelectedCard? : CardType;
}

const ComputerHand: React.FC<ComputerHandProps> = ({ cards, computerSelectedCard }) => {
  return (
    <HandContainer
      initial={{scale: 0.5, opacity: 0.3}}
      animate={{scale: 1, opacity: 1, transition: { duration: 0.5 }}}
    >
      {/* Render the computer's cards */}
      {cards.map((card : CardType) => (
        <Card
          key={card.code}
          card={card}
          // showBack={card.code !== computerSelectedCard?.code}
          type={card.code === computerSelectedCard?.code ? 'medium' : 'small'}
          />
      ))}
    </HandContainer>
  );
};

export default ComputerHand;