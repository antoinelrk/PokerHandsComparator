const gfxTypes = [
    {
        name: `spade`,
        icon: `./images/spade.svg`,
        hexColor: `black`
    },
    {
        name: `club`,
        icon: `./images/club.svg`,
        hexColor: `black`
    },
    {
        name: `diamond`,
        icon: `./images/diamond.svg`,
        hexColor: `red`
    },
    {
        name: `heart`,
        icon: `./images/heart.svg`,
        hexColor: `red`
    }
]
const rawRanks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']


function sortCards (hand) {
    let localCards = hand.sort((a, b) => rawRanks.indexOf(a.value) - rawRanks.indexOf(b.value));
    return localCards
}

function mostSuit (values) {
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

function isPair(hand) {
    const ranks = hand.map(card => card.value)
    return ranks.some(rank => ranks.filter(r => r === rank).length === 2)
}

function isTwoPair(hand) {
    const ranks = hand.map(card => card.value)
    const rankCounts = ranks.reduce((count, rank) => {
        count[rank] = (count[rank] || 0) + 1
        return count
    }, {})

    let pairCount = 0

    for (const rank in rankCounts) {
        if (rankCounts[rank] === 2) {
            pairCount++
        }
    }

    return pairCount >= 2
}

function isThreeOfAKind(hand) {
    const ranks = hand.map(card => card.value);
    return ranks.some(rank => ranks.filter(r => r === rank).length === 3);
}

function isStraight(hand) {
    if (hand.length < 5) return false

    const sortedRanks = hand.map(card => card.value).sort((a, b) => rawRanks.indexOf(a) - rawRanks.indexOf(b));
    const uniqueRanks = Array.from(new Set(sortedRanks));

    if (uniqueRanks.length < 5) { return false }

    for (let i = 0; i < uniqueRanks.length - 4; i++) {
      const startRankIndex = rawRanks.indexOf(uniqueRanks[i]);
      let isStraight = true;

      for (let j = 0; j < 5; j++) {
        if (rawRanks[startRankIndex + j] !== uniqueRanks[i + j]) {
          isStraight = false;
          break;
        }
      }

      if (isStraight) { return true }
    }

    return false;
}

function isFlush(hand) {
    if (hand.length < 5) {
        return false
    } else {
        const suits = hand.map(card => card.color);
        const suitCounts = suits.reduce((count, suit) => {
          count[suit] = (count[suit] || 0) + 1;
          return count;
        }, {});
    
        return Object.values(suitCounts).some(count => count >= 5);
    }
}

function isFullHouse(hand) {
    return isPair(hand) && isThreeOfAKind(hand);
}

function isFourOfAKind(hand) {
    const ranks = hand.map(card => card.value);
    return ranks.some(rank => ranks.filter(r => r === rank).length === 4);
}

function isStraightFlush(hand) {
    return isStraight(hand) && isFlush(hand);
}

function isRoyalFlush(hand) {
    if (isStraightFlush(hand)) {
        let topHead = ['A', 'K', 'Q', 'J', '10']
        const currentSuit = mostSuit(hand.map(card => card.suit.name))
        let currentCards = hand.filter((card) => {
            return (card.suit.name === currentSuit) && (topHead.includes(card.value))
        })
        if (currentCards.length === 5) return true
    }
    return false
}

/**
 * La variable hand correspond à la main complète du joueur, board compris.
 */
const check = (hand) => {
    if (hand.length === 0) return

    if (isRoyalFlush(hand)) {
        return "Quinte Flush Royal"
    }  else if (isStraightFlush(hand)) {
        return "Quinte Flush"
    } else if (isFourOfAKind(hand)) {
        return "Carré"
    }  else if (isFullHouse(hand)) {
        return "Full House"
    } else if (isFlush(hand)) {
        return "Flush"
    } else if (isStraight(hand)) {
        return 'Quinte';
    } else if (isThreeOfAKind(hand)) {
        return 'Brelan';
    } else if (isTwoPair(hand)) {
        return "Double Paire"
    } else if (isPair(hand)) {
        return "Paire"
    } else {
        return "Cartes Hautes"
    }
}

export default {
    check
}