import { CardType } from "../components/Card";

// draw cards from deck - default is 4
// method uses splice to draw cards from deck
export const drawCardsFromDeck = (cardsDeck: CardType[], numOfCards = 4): CardType[] => {
  //consider a case where the deck has less cards than numOfCards - if it can happen
  // draw cards
  const drawnCards = cardsDeck.splice(0, numOfCards);

  return drawnCards;
}

// replace jacks in a given flop
// jacks are inserted at a random place in the deck (not within the first four cards in deck) and cards are drawn from deck instead of them
// method is recursive - will keep replacing jacks until no jacks are in the flop
export const replaceJacks = (flop: CardType[], deck: CardType[]): CardType[] => {
  const jacks = flop.filter(card => card.value === 'JACK');
  const validCards = flop.filter(card => card.value !== 'JACK');

  if (jacks.length === 0) {
    // no jacks in deck - return flop
    return flop;
  }

  jacks.forEach(jack => {
    // generate random index excluding the first 4 cards
    const randomIndex = Math.floor(Math.random() * (deck.length - 4)) + 4;
    // insert jack at the random index in the deck
    deck.splice(randomIndex, 0, jack);
  });

  // draw cards instead of the jacks
  const replacedCards = drawCardsFromDeck(deck, jacks.length);

  const newCards = [...validCards, ...replacedCards];
  return replaceJacks(newCards, deck);
}
