import { defineStore } from "pinia"

export const useDeckStore = defineStore('deck', () => {
    const suits = [
        {
            name: 'spade',
            icon: `./images/spade.svg`,
            color: `black`
        },
        {
            name: 'club',
            icon: `./images/club.svg`,
            color: `black`
        },
        {
            name: 'heart',
            icon: `./images/heart.svg`,
            color: `red`
        },  
        {
            name: 'diamond',
            icon: `./images/diamond.svg`,
            color: `red`
        }
    ]

    const ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']

    let originalDeck = []

    suits.forEach((suit) => {
        ranks.forEach((value) => {
            originalDeck.push({
                value: value,
                suit: suit
            })
        })
    })

    let deck = originalDeck

    const chooseFixedCard = (key) => {
        return deck.splice(key, 1)[0]
    }

    const pickedCard = () => deck.splice(Math.floor(Math.random() * deck.length), 1)[0]

    return {
        originalDeck,
        deck,
        pickedCard,
        ranks,
        suits,
        chooseFixedCard
    }
})
