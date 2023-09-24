import React from 'react';
import styled from 'styled-components';

interface BlankCardProps {
  onBlankCardClick: () => void;
}

const BlankCard = styled.div`
    width: 160px;
    background-color: lightgreen;
    cursor: pointer;
    height: 220px;
    margin: 16px;
    border-radius: 8px;
`;

const Card: React.FC<BlankCardProps> = ({ 
onBlankCardClick
}) => {
  return (
      <BlankCard
        onClick={() => onBlankCardClick()}
      />
  );
};

export default Card;