import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 16px;
`;

export const HandContainer = styled(CardsContainer)`
display: flex;
align-items: center;
justify-content: center; /* Center the content inside the center container horizontally */
//align-items: center; /* Center the content inside the center container vertically */
`;

export const deckVariants = {
  hidden: {scale: 0.5, opacity: 0.3, y:100},
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
}