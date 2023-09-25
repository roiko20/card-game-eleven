import React from 'react';
import Card, { CardType } from './Card';
import styled from 'styled-components';

interface CursorFollowerProps {
  cards: CardType[];
  initialPosition: { x: number; y: number };
}

const StackedCard = styled.div<{ index: number }>`
  margin-left: ${({ index }) => `${index * -50}px`};
  grid-area: 1 / 1 / 2 / 2;
`;

const CursorFollower: React.FC<CursorFollowerProps> = ({ cards, initialPosition }) => {

  return (
    <div
      style={{
        position: 'fixed',
        left: initialPosition.x - 80,
        top: initialPosition.y - 80,
        width: '160px',
        pointerEvents: 'none', // Ensures the cursor follower doesn't interfere with mouse events
        zIndex: 9999, // Set a high z-index to make sure it's on top of other elements
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gridTemplateRows: '150px 1fr',
      }}
    >
      {cards.map((card: CardType, index: number) => (
        <StackedCard index={index}>
          <Card key={card.code} card={card} />
        </StackedCard>
      ))}
    </div>
  );
};

export default CursorFollower;
