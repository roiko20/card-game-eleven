import React, { useState, useEffect } from 'react';
import PlayerHand from './PlayerHand';
import axios from 'axios';
import ComputerHand from './ComputerHand';
import Card, { CardType } from './Card';
import Flop from './Flop';
import cardsData from './CardsData';
import PlayerSelection from './PlayerSelection';
import SidePile from './SidePile';
import styled from 'styled-components';
import BlankCard from './BlankCard';
import { getCardValueByCode, getCardRank } from '../utils/CardUtils';
import { drawCardsFromDeck, replaceJacks } from '../utils/DeckUtils';
import { getMoveScore } from '../utils/MoveUtils';

interface Move {
  cardCodes: string[];
  scoreRank: number;
}

const GameBoardContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  height: 100vh;
  background-color: green;
  // justify-content: center;
  display: grid;
  grid-template-rows: repeat(3, 1fr); /* 3 columns */
  grid-gap: 10px; /* Adjust the gap between items as needed */
`;

const HandContainer = styled.div`
  display: grid;
  padding: 16px;
`;


const GameBoard: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  // shouldn't need it
  const [deckId, setDeckId] = useState<string>('');
  const [cardsDeck, setCardsDeck] = useState<CardType[]>([]);
  const [computerCards, setComputerCards] = useState<CardType[]>([]);
  const [playerCards, setPlayerCards] = useState<CardType[]>([]);
  const [flopCards, setFlopCards] = useState<CardType[]>([]);
  const [computerSelectedCard, setComputerSelectedCard] = useState<CardType| undefined>();
  const [playerSelectedCard, setPlayerSelectedCard] = useState<CardType | undefined>();
  const [playerSelectedFlopCards, setPlayerSelectedFlopCards] = useState<CardType[]>([]);
  const [computerSelectedFlopCardCodes, setComputerSelectedFlopCardCodes] = useState<string[]>([]);
  const [computerSidePile, setComputerSidePile] = useState<CardType[]>([]);
  const [playerSidePile, setPlayerSidePile] = useState<CardType[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Fetch the deck of cards from the API and deal a round
  useEffect(() => {
    // axios
    //   .get('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
    //   .then((response) => {
        // console.log(response.data.cards);
        // // set deck ID in state
        // setDeckId(response.data.deck_id);
        // // get deck cards
        // const deck = response.data.cards;
        const deck = cardsData;
        // draw player cards from deck
        setPlayerCards(drawCardsFromDeck(deck));
        // draw computer cards from deck
        setComputerCards(drawCardsFromDeck(deck));
        // draw flop cards
        const flopCards = drawCardsFromDeck(deck);
        // replace any jacks in the flop - it shouldn't have any
        setFlopCards(replaceJacks(flopCards, deck));
        // set the final cards in the deck
        setCardsDeck(deck);
      // });
  }, []);

  useEffect(() => {
    const updateCursorPosition = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    if(!playerTurn) {
      console.log('generating computer moves');
      const possibleMoves = generatePossibleMoves(computerCards, flopCards);
      console.log('Possible Moves:');
      console.log(possibleMoves);
      const moveToMake = findBestMove(possibleMoves);
      if (!moveToMake) {
        handleComputerDrop();
      }
      else {
        handleComputerMove(moveToMake);
      }
      console.log('moveToMake:');
      console.log(moveToMake);
    }
    
  }, [playerTurn]);

  useEffect(() => {
    console.log('in use effect');
    if (cardsDeck.length !== 0 && playerCards.length === 0 && computerCards.length === 0) {
      console.log('dealing new hand');
      const deck = cardsDeck;
      // draw player cards from deck
      setPlayerCards(drawCardsFromDeck(deck));
      // draw computer cards from deck
      setComputerCards(drawCardsFromDeck(deck));
    }
  }, [playerCards, computerCards]);

  function generatePossibleMoves(computerHand: CardType[], flopCards: CardType[]): Move[] {
    let validMoves: Move[] = [];
  
    function pickCardsFromFlop(pickedCards: CardType[], remainingFlop: CardType[], foundValidMove: boolean): void {
      const sumOfPickedCards = pickedCards.reduce((accumulator, pickedCard) => accumulator + getCardValueByCode(pickedCard.code), 0);
  
      if (sumOfPickedCards === 11) {
        validMoves.push({
          cardCodes: pickedCards.map(card => card.code),
          scoreRank: getMoveScore(pickedCards),
        });
        foundValidMove = true;
        return; // Terminate the recursion for this starting card.
      }
  
      if (remainingFlop.length === 0 || foundValidMove) return; // Terminate if no more cards or a valid move is found.
  
      for (let i = 0; i < remainingFlop.length; i++) {
        const cardToCheck = remainingFlop[i];
  
        if (sumOfPickedCards + getCardValueByCode(cardToCheck.code) <= 11) {
          pickCardsFromFlop([...pickedCards, cardToCheck], remainingFlop.slice(i + 1), foundValidMove);
        }
      }
    }
  
    for (const cardInHand of computerHand) {
      if (cardInHand.value === 'JACK') {
        console.log('card in hand checked now is jack:', cardInHand.code);
        const cardsToPickUpWithjack = flopCards.filter((flopCard) => flopCard.value !== 'QUEEN' && flopCard.value !== 'KING');
        console.log('cards to pick up with it:');
        console.log(cardsToPickUpWithjack);
        if (cardsToPickUpWithjack.length > 0) {
          validMoves.push({
            cardCodes: [cardInHand.code, ...cardsToPickUpWithjack.map(card => card.code)],
            scoreRank: getMoveScore([cardInHand, ...cardsToPickUpWithjack])
          })
          continue;
          // if another valid move is later equal in score to jack score - keep jack and pickup with the other card
        }
      }
      else if (cardInHand.value === 'QUEEN' || cardInHand.value === 'KING') {
        const optionalRoyalityCardsToPickUp = flopCards.filter((flopCard) => flopCard.value === cardInHand.value);
        optionalRoyalityCardsToPickUp.forEach(optionalRoyalityCardToPickUp => {
          validMoves.push({
            cardCodes: [cardInHand.code, optionalRoyalityCardToPickUp.code],
            scoreRank: getMoveScore([cardInHand, optionalRoyalityCardToPickUp])
          })
        })
        continue;
      }
      pickCardsFromFlop([cardInHand], flopCards, false);
    }
  
    return validMoves;
  }

  function handleComputerDrop() {
    const cardToDrop = computerCards.reduce((minCard, currentCard) => {
      const minScore = getCardRank(minCard);
      const currentScore = getCardRank(currentCard);
  
      return currentScore < minScore ? currentCard : minCard;
    });
    setComputerSelectedCard(cardToDrop);
    setTimeout(() => {
      setFlopCards([cardToDrop, ...flopCards]);
      const newComputerHand = computerCards.filter((card) => card.code !== cardToDrop.code);
      setComputerCards(newComputerHand);
      setPlayerTurn(true);
    }, 2000);
  }

  function findBestMove(moves: Move[]): Move | null {
    if (moves.length === 0) {
      return null; // Return null if there are no moves.
    }
  
    return moves.reduce((bestMove, currentMove) => {
      return currentMove.scoreRank > bestMove.scoreRank ? currentMove : bestMove;
    }, moves[0]);
  }

  function handleComputerMove(move: Move) {
    const computerHandCardCodeToUse = move.cardCodes[0];
    const flopHandCardCodesToPickup = move.cardCodes.slice(1);
    setComputerSelectedFlopCardCodes(flopHandCardCodesToPickup);
    const newComputerHand = computerCards.filter((card) => card.code !== computerHandCardCodeToUse);
    const computerCardToUse = computerCards.filter((card) => card.code === computerHandCardCodeToUse)[0];
    const newFlop = flopCards.filter((card) => !flopHandCardCodesToPickup.includes(card.code));
    const flopCardsToPickup = flopCards.filter((card) => flopHandCardCodesToPickup.includes(card.code));
    setComputerSelectedCard(computerCardToUse);
    setTimeout(() => {
      setComputerCards(newComputerHand);
      setFlopCards(newFlop);
      setComputerSidePile([...computerSidePile, ...flopCardsToPickup, computerCardToUse]);
      setComputerSelectedCard(undefined);
      setPlayerTurn(true)
    }, 2000);
  }

  const handlePlayerCardSelect = (event: React.MouseEvent<HTMLImageElement>, card: CardType) => {
    event.stopPropagation();
    // if player card is a J - pick up all cards from the deck
    setPlayerSelectedCard(card);
    if (card.value === 'JACK') {
      pickUpCardsWithJack(card);
    }
  }

  const dropPlayerselectedCard = () => {
    if (!playerSelectedCard) return;
    const cardToDrop = playerSelectedCard;
    setPlayerSelectedCard(undefined);
    setFlopCards([cardToDrop, ...flopCards]);
    const newPlayerHand = playerCards.filter((card) => card.code !== cardToDrop.code);
    setPlayerCards(newPlayerHand);
    setPlayerTurn(false);
  }

  const pickupPlayerCardsToSidePile = (cardsToPickUp: CardType[], card: CardType, newFlop: CardType[], newPlayerHand: CardType[]) => {
    setPlayerSidePile([...playerSidePile, ...cardsToPickUp, card]);
    setFlopCards(newFlop);
    setPlayerSelectedCard(undefined);
    setPlayerCards(newPlayerHand);
    setPlayerTurn(playerTurn => !playerTurn);
  }

  const pickUpCardsWithJack = (jackCard: CardType) => {
    // get new flop - all cards besides kings and queens
    const { cardsToPickUp, newFlop } = flopCards.reduce(
      (result: { cardsToPickUp: CardType[]; newFlop: CardType[] }, card: CardType) => {
        if (card.value !== 'QUEEN' && card.value !== 'KING') {
          result.cardsToPickUp.push(card);
        } else {
          result.newFlop.push(card);
        }
        return result;
      },
      { cardsToPickUp: [], newFlop: [] }
    );

    // remove used card from player hand
    const newPlayerHand = playerCards.filter((card) => card.code !== jackCard.code);

    pickupPlayerCardsToSidePile(cardsToPickUp, jackCard, newFlop, newPlayerHand);
  }

  const handlePlayerFlopClick = (event: React.MouseEvent<HTMLImageElement>, card: CardType) => {
    console.log('player selected card:');
    console.log(playerSelectedCard);
    console.log('flop card clicked:');
    console.log(card);
    event.stopPropagation();
    // player must select a card from his hand before selecting flop cards - do nothing
    if (!playerSelectedCard) return;
    // if playerCard is a Q/K - check if it's the same picture as playerCard to allow pick up
    if (playerSelectedCard.value === 'QUEEN' || playerSelectedCard.value === 'KING') {
      if (playerSelectedCard.value === card.value) {
        const newFlop = flopCards.filter((flopCard) => flopCard.code !== card.code);
        const newPlayerHand = playerCards.filter((playerCard) => playerCard.code !== playerSelectedCard.code);
        pickupPlayerCardsToSidePile([card], playerSelectedCard, newFlop, newPlayerHand);
      }
    }
    // if player card + flop selected card >= 12 - do not allow pickup
    if (getCardValueByCode(playerSelectedCard.code) + getCardValueByCode(card.code) > 12) {
      return;
    }
    // if player card + flop card < 11 - pick up flop card
    const sumOfCurrentSelectedPlayerCards = playerSelectedFlopCards.reduce((accumulator, pickedCard) => accumulator + getCardValueByCode(pickedCard.code), 0);
    if (getCardValueByCode(playerSelectedCard.code) + sumOfCurrentSelectedPlayerCards + getCardValueByCode(card.code) < 11) {
      setPlayerSelectedFlopCards([...playerSelectedFlopCards, card]);
      const newFlop = flopCards.filter((flopCard) => flopCard.code !== card.code);
      setFlopCards(newFlop);
      setPlayerTurn(false);
    }
    if (getCardValueByCode(playerSelectedCard.code) + sumOfCurrentSelectedPlayerCards + getCardValueByCode(card.code) === 11) {
      const newFlop = flopCards.filter((flopCard) => flopCard.code !== card.code);
      setFlopCards(newFlop);
      console.log('doing it');
      const newPlayerHand = playerCards.filter((playerCard) => playerCard.code !== playerSelectedCard.code);
      console.log('new player hand:');
      console.log(newPlayerHand);
      setPlayerCards(newPlayerHand);
      setPlayerSidePile([...playerSidePile, playerSelectedCard, ...playerSelectedFlopCards, card]);
      setPlayerSelectedCard(undefined);
      setPlayerSelectedFlopCards([]);
      setPlayerTurn(false);
    }
    if (getCardValueByCode(playerSelectedCard.code) + sumOfCurrentSelectedPlayerCards + getCardValueByCode(card.code) > 11) {
      console.log('invalid move - decide on design for it');
    }
  }

  const handlePlayerCancelSelection = () => {
    console.log('clickedddd');
    setPlayerSelectedCard(undefined);
  }
  
  return (
    <GameBoardContainer onClick={() => handlePlayerCancelSelection()}>
      {/* <h2>Score: {score}</h2> */}
      <HandContainer>
      {computerSidePile && 
        <SidePile
          cards={computerSidePile}
          isPlayerSidePile={false}
        />
      }
      {computerCards &&
        <ComputerHand
          cards={computerCards}
          computerSelectedCard={computerSelectedCard}
        />
      }
      </HandContainer>
      {flopCards &&
          <Flop
            cards={flopCards}
            onFlopCardSelect={handlePlayerFlopClick}
            computerSelectedFlopCardCodes={computerSelectedFlopCardCodes}
            playerSelectedCard={playerSelectedCard}
            playerTurn={playerTurn}
            onBlankCardClick={dropPlayerselectedCard}
          />
      }
      <HandContainer>
        {playerCards &&
          <PlayerHand
            cards={playerCards}
            playerSelectedCard={playerSelectedCard}
            onPlayerCardSelect={handlePlayerCardSelect}
          />
        }
        {playerSidePile && 
          <SidePile
            cards={playerSidePile}
            isPlayerSidePile={true}
          />
        }
      </HandContainer>
      {playerSelectedCard &&
        <PlayerSelection cards={[playerSelectedCard]} initialPosition={cursorPosition} />
      }
    </GameBoardContainer>
  );
};

export default GameBoard;