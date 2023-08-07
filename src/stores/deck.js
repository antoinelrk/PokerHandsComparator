import { defineStore } from "pinia"

export const useDeckStore = defineStore('deck', () => {
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
    const originalDeck = []
    /**
     * On boucle sur chaque couleurs
     */
    gfxTypes.forEach(gfx => {
        /**
         * Sur chaque couleur on boucle sur les ranks
         */
        rawRanks.forEach(rank => {
            originalDeck.push(
                {
                    value: rank,
                    color: gfx.name,
                    gfx: {
                        icon: gfx.icon,
                        hexColor: gfx.hexColor
                    }
                },
            )
        })
    })

    let deck = originalDeck

    /**
     * Pour choisir une carte spécifique, la clé correspond a sa place dans le tableau
     */
    const pickSpecificCard = (key) => deck.splice(key, 1)[0]

    const pickCard = () => deck.splice(Math.floor(Math.random() * deck.length), 1)[0]

    return {
        deck,
        gfxTypes,
        rawRanks,
        pickCard,
        pickSpecificCard
    }
})