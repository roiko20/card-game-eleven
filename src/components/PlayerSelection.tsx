import React, { useEffect } from 'react';
import Card, { CardType } from './Card';

interface CursorFollowerProps {
  cards: CardType[];
  initialPosition: { x: number; y: number };
}

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
      }}
    >
      {cards.map((card: CardType) => (
        <Card key={card.code} card={card} />
      ))}
    </div>
  );
};

export default CursorFollower;
