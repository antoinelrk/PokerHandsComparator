import { defineStore } from "pinia"
import { useDeckStore } from './deck.js'

export const usePlayersStore = defineStore('players', () => {
    let playersList = []
    const deckStore = useDeckStore()

    let localRanks = [...deckStore.ranks]
    let localSuits = [...deckStore.suits]

    const sortCards = (cards) => {
        let localCards = cards.sort((a, b) => localRanks.indexOf(a.value) - localRanks.indexOf(b.value));
        return localCards
    }

    const mostSuit = (values) => {
        // Créer un objet pour stocker le nombre d'occurrences de chaque valeur
        let occurrences = {};
      
        // Parcourir le tableau et compter les occurrences
        values.forEach(function(element) {
          if (occurrences[element]) {
            occurrences[element]++;
          } else {
            occurrences[element] = 1;
          }
        });
      
        // Trouver la valeur avec le plus grand nombre d'occurrences
        let plusGrandeOccurrence = 0;
        let valeurPlusGrandeOccurrence = null;
      
        for (let valeur in occurrences) {
          if (occurrences[valeur] > plusGrandeOccurrence) {
            plusGrandeOccurrence = occurrences[valeur];
            valeurPlusGrandeOccurrence = valeur;
          }
        }
      
        return valeurPlusGrandeOccurrence;
    }


    /**
     * Paire
     */
    const isPair = (cards) => {
        const ranks = cards.map(card => card.value);
        return ranks.some(rank => ranks.filter(r => r === rank).length === 2);
    }

    /**
     * Double paire
     */
    const isTwoPair = (cards) => {
        const ranks = cards.map(card => card.value);
        const rankCounts = ranks.reduce((count, rank) => {
          count[rank] = (count[rank] || 0) + 1;
          return count;
        }, {});
    
        let pairCount = 0;
        for (const rank in rankCounts) {
          if (rankCounts[rank] === 2) {
            pairCount++;
          }
        }
    
        return pairCount >= 2;
    }


    /**
     * Brelan
     */
    const isThreeOfAKind = (cards) => {
        const ranks = cards.map(card => card.value);
        return ranks.some(rank => ranks.filter(r => r === rank).length === 3);
    }

    /**
     * Quinte
     */
    const isStraight = (cards) => {
        const sortedRanks = cards.map(card => card.value).sort((a, b) => localRanks.indexOf(a) - localRanks.indexOf(b));
        const uniqueRanks = Array.from(new Set(sortedRanks));
    
        if (uniqueRanks.length < 5) { return false }
    
        for (let i = 0; i < uniqueRanks.length - 4; i++) {
          const startRankIndex = localRanks.indexOf(uniqueRanks[i]);
          let isStraight = true;
    
          for (let j = 0; j < 5; j++) {
            if (localRanks[startRankIndex + j] !== uniqueRanks[i + j]) {
              isStraight = false;
              break;
            }
          }
    
          if (isStraight) { return true }
        }
    
        return false;
    }

    /**
     * Couleur
     */
    const isFlush = (cards) => {
        const suits = cards.map(card => card.suit.name);
        const suitCounts = suits.reduce((count, suit) => {
          count[suit] = (count[suit] || 0) + 1;
          return count;
        }, {});
    
        return Object.values(suitCounts).some(count => count >= 5);
    }

    /**
     * Full House
     */
    const isFullHouse = (cards) => {
        return isPair(cards) && isThreeOfAKind(cards);
    }
    
    /**
     * Carré
     */
    const isFourOfAKind = (cards) => {
        const ranks = cards.map(card => card.value);
        return ranks.some(rank => ranks.filter(r => r === rank).length === 4);
    }

    /**
     * Quinte Flush
     */
    const isStraightFlush = (cards) => {
        return isStraight(cards) && isFlush(cards);
    }

    /**
     * Quinte Flush Royale
     */
    const isRoyalFlush = (cards) => {
        if (isStraightFlush(cards)) {
            let topHead = ['A', 'K', 'Q', 'J', '10']
            const currentSuit = mostSuit(cards.map(card => card.suit.name))
            let currentCards = cards.filter((card) => {
                return (card.suit.name === currentSuit) && (topHead.includes(card.value))
            })
            if (currentCards.length === 5) return true
        }
        return false
    }

    const getHandType = (cards) => {
        if (isRoyalFlush(cards)) {
            return "Quinte flush royale"
        } else if (isStraightFlush(cards)) {
            return 'Quinte flush';
        } else if (isFourOfAKind(cards)) {
            return 'Carré';
        } else if (isFullHouse(cards)) {
            return 'Full House';
        } else if (isFlush(cards)) {
            return 'Couleur';
        } else if (isStraight(cards)) {
            return 'Quinte'
        } else if (isThreeOfAKind(cards)) {
            return 'Brelan'
        } else if (isTwoPair(cards)) {
            return 'Double Paire'
        } else if (isPair(cards)) {
            return 'Paire'
        }
        else {
            return 'Cartes hautes'
        }
    }

    const addPlayer = (board_cards) => {
        const currentCards = [deckStore.pickedCard(), deckStore.pickedCard()]

        const completeHand = [
            ...board_cards,
            ...currentCards
        ]

        let newPlayer = {
            id: playersList.length + 1,
            cards: [
                currentCards[0], currentCards[1]
            ],
            state: {
                win: false,
                win_type: getHandType(completeHand),
                completeHand: completeHand
            }
        }
        playersList.push(newPlayer)
        return newPlayer
    }

    return {
        addPlayer,
        playersList
    }
})