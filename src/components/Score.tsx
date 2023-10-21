import React from 'react';
import styled from 'styled-components';
import { GiClubs } from 'react-icons/gi';
import { BsTrophyFill } from 'react-icons/bs';
import { PiMaskHappyFill } from 'react-icons/pi';

const ScoreData = styled.div<{ isPlayerScore?: boolean;}>`
  display:flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Concert One', cursive;
  font-size: 1.5vw;
  gap: 8px;
  grid-row-start: ${({ isPlayerScore }) => (isPlayerScore && '3')};
  grid-column-start: ${({ isPlayerScore }) => (isPlayerScore && '1')};
  justify-content: center;
`;

const StyledTitle = styled.span`
  font-size: 2vw;
  margin-bottom: 8px;
`;

interface ScoreProps {
    title: string;
    score: number;
    clubs: number;
    bonus: number;
    isPlayerScore?: boolean;
}

const Score: React.FC<ScoreProps> = ({ title, score, clubs, bonus, isPlayerScore }) => {
  return (
    <ScoreData isPlayerScore={isPlayerScore}>
        <StyledTitle>{title}</StyledTitle>
        <span><BsTrophyFill /> {score}</span>
        <span><GiClubs /> {clubs}</span>
        <span><PiMaskHappyFill /> {bonus}</span>
    </ScoreData>
  );
};

export default Score;