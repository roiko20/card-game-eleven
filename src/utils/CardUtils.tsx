import { CardType } from "../components/Card";

export const getCardValueByCode = (cardCode: string): number => {
    // Get the first char of the card code
    const cardStrChar = cardCode.charAt(0);
    // Ace is 1
    if (cardStrChar === 'A') return 1;
    // Get the card numeric value
    const cardIntChar = parseInt(cardStrChar);
    // 10 is 0
    if (cardIntChar === 0) return 10;
    // Return the number if it is one
    if (!isNaN(cardIntChar)) return cardIntChar;
    // Royalty - return 12 to fail
    return 12;
  }

  export const getCardRank = (card: CardType): number => {
    // Clubs winner is whoever has at least 7 clubs - 13 points => each club is 13/7 = 1.85 points
    // 10 of diamonds - 3 points
    if (card.code === '0D') return 3;
    // Dudula (2 of clubs) - 2 points + club
    if (card.code === '2C') return 3.85;
    // Jack is 1 point + club
    if (card.code === 'JC') return 2.85;
    // Ace is 1 point + club
    if (card.code === 'AC') return 2.85;
    // Get the first char of the card code
    const cardStrChar = card.code.charAt(0);
    // jack is 1 point
    if (cardStrChar === 'J') return 1;
    // ace is 1 point
    if (cardStrChar === 'A') return 1;
    // Get the card suit value
    const cardSuitStrChar = card.code.charAt(1);
    // club is 1.85 points
    if (cardSuitStrChar === 'C') return 1.85;
    // no points for other cards
    return 0;
  }

