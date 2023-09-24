import { getCardRank } from "./CardUtils";
import { CardType } from "../components/Card";

export const getMoveScore = (cards: CardType[]): number => {
    let score = 0;
    cards.forEach((card) => {
        score += getCardRank(card);
    });
    return score;
}