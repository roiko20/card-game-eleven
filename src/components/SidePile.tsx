import React from 'react';
import Card, {CardType} from './Card';
import { CardsContainer } from './StyledComponents';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StackedCard = styled(motion.div)<{ index: number, isPlayerSidePile: boolean }>`
  margin-left: ${({ index, isPlayerSidePile }) => (index === 0 ? '0'
                                : isPlayerSidePile ? '-121.25px' : '-118.75px')}; /* Adjust the value as needed for overlapping */
`;

interface SidePileProps {
    cards: CardType[];
    isPlayerSidePile: boolean;
}

// const PileContainer = styled(CardsContainer)<{ isPlayerSidePile: boolean}>`
//   // position: absolute;
//   // left: ${({ isPlayerSidePile }) => (isPlayerSidePile ? 'auto' : '52px' )};
//   // right: ${({ isPlayerSidePile }) => (isPlayerSidePile ? '52px' : 'auto' )};
// `;

const PileContainer = styled(motion.div)`
  position: relative;
  left: 35%;
`;

const SidePile: React.FC<SidePileProps> = ({ cards, isPlayerSidePile }) => {
  return (
    <PileContainer
      style={{
        gridRowStart: isPlayerSidePile ? 3 : 1,
        gridColumnStart: 3
      }}
    >
        {/* Render the side pile cards */}
        {cards.map((card: CardType, index: number) => (
          // <StackedCard
          //   key={index}
          //   index={index}
          //   initial={{ x: isPlayerSidePile ? -300 : 300, y: isPlayerSidePile ? -300 : 300 }}
          //   isPlayerSidePile={isPlayerSidePile}
          //   animate={{ scale: 1, x: 0, y: 0, transition: { duration: 0.5 }}}
          // >
            <img
              src={'https://www.deckofcardsapi.com/static/img/back.png'} 
              alt={card.code}
              style={{
              height: '100%',
              position: 'absolute',
              left: `${index * 3}px`
            }}
            //size={type}
            //hidden={hidden}
            //onClick={(event) => onCardClick && onCardClick(event, card)}
            //variants={cardVariants}
            //whileHover={showCursor ? {y: -10, cursor: 'grab'} : {}}
            />
          // </StackedCard>
        ))}
    </PileContainer>
  );
};

export default SidePile;