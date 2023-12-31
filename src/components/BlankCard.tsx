import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

interface BlankCardProps {
  onBlankCardClick: () => void;
  showCursor: boolean;
}

const BlankCard = styled(motion.div)`
  height: 100%;
  width: 13rem;
  margin: 16px;
  border-radius: 8px;
  border: 3px dashed lightgreen;
  background-color: MediumSeaGreen;
  box-sizing: border-box;
`;

const Card: React.FC<BlankCardProps> = ({ 
onBlankCardClick,
showCursor
}) => {
  return (
      <BlankCard
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      whileHover={showCursor ? {scale: 1.05, cursor: 'grab'} : {}}
        onClick={() => onBlankCardClick()}
      />
  );
};

export default Card;