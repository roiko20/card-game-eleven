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

const PileContainer = styled(CardsContainer)<{ isPlayerSidePile: boolean}>`
  position: absolute;
  left: ${({ isPlayerSidePile }) => (isPlayerSidePile ? 'auto' : '52px' )};
  right: ${({ isPlayerSidePile }) => (isPlayerSidePile ? '52px' : 'auto' )};
`;

const SidePile: React.FC<SidePileProps> = ({ cards, isPlayerSidePile }) => {
  return (
    <PileContainer isPlayerSidePile={isPlayerSidePile}>
        {/* Render the side pile cards */}
        {cards.map((card: CardType, index: number) => (
          <StackedCard
            key={index}
            index={index}
            initial={{ x: isPlayerSidePile ? -300 : 300, y: isPlayerSidePile ? -300 : 300 }}
            isPlayerSidePile={isPlayerSidePile}
            animate={{ scale: 1, x: 0, y: 0, transition: { duration: 0.5 }}}
          >
            <Card card={card} showBack={true} type={'small'}/>
          </StackedCard>
        ))}
    </PileContainer>
  );
};

export default SidePile;