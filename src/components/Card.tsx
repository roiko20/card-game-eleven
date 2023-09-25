import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export interface CardType {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
    };
    value: string;
    suit: string;
}

interface CardProps {
  showBack?: boolean;
  card: CardType;
  hidden?: boolean;
  onCardClick?: (event: React.MouseEvent<HTMLImageElement>, card: CardType) => void;
  type?: 'small' | 'medium' | 'big' | 'huge';
  showCursor?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const StyledCard = styled(motion.img)<{ size?: 'small' | 'medium' | 'big' | 'huge'; hidden?: boolean;}>`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
  width: ${({ size }) => (size === 'small' ? '120px' : size === 'big' ? '160px' : size === 'huge'? '180px' : '140px')};
`;

const backOfCardImageUrl = 'https://www.deckofcardsapi.com/static/img/back.png';

const Card: React.FC<CardProps> = ({ 
    showBack = false,
    card,
    type = 'medium',
    hidden = false,
    onCardClick,
    showCursor = false
}) => {
  return (
      <StyledCard
        src={showBack ? backOfCardImageUrl : card.image} 
        alt={card.code}
        size={type}
        hidden={hidden}
        onClick={(event) => onCardClick && onCardClick(event, card)}
        variants={cardVariants}
        whileHover={showCursor ? {y: -10, cursor: 'grab'} : {}}
      />
  );
};

export default Card;