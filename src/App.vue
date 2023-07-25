<template>
    <!-- <Loader /> -->
    <main>
        <h1 class="app-title">Poker Hands Comparator</h1>
        <div class="controls">
            <button class="sendFlop" v-show="state.board_cards.length === 0" @click="sendFlop()">Envoyer le flop</button>
            <button class="pickCard" v-show="state.board_cards.length < 5 && state.board_cards.length >= 3" @click="addCardToBoard()">Envoyer une carte</button>
        </div>
        <div class="table-wrapper">
            <ul class="left">
                <li v-for="player in playersLeft" :key="player.id"><Player :player="player" /></li>
            </ul>
            <ul class="right">
                <li v-for="player in playersRight" :key="player.id"><Player :player="player" /></li>
            </ul>
        </div>
        <Board :boardCards="state.board_cards"/>
    </main>
    <footer>
        <a href="https://antoinelrk.com">AntoineLRK</a> • <a href="https://github.com/antoinelrk/PokerHandsComparator">Dépôt github</a> • alpha-1.1
    </footer>
</template>

<script>
import Player from './components/Player.vue';
import Loader from './components/Loader.vue';
import Board from './components/Board.vue';
import { useDeckStore } from './stores/deck.js'
import { usePlayersStore } from './stores/players.js'
import { ref, reactive } from 'vue'

export default {
    components: {
        Player, Board
    },
    setup () {
        const store = useDeckStore()
        const playerStore = usePlayersStore()

        const state = reactive({
            board_cards: []
        })

        const sendFlop = () => {
            state.board_cards.push(store.pickedCard())
            state.board_cards.push(store.pickedCard())
            state.board_cards.push(store.pickedCard())

            state.board_cards.map((card) => {
                console.log(`Board: ${card.value} ${card.suit.name}`)
            })

        }

        const addCardToBoard = () => {
            if (state.board_cards.length < 5) {
                const card = store.pickedCard()
                state.board_cards.push(card)
                console.log(`Board: ${card.value} ${card.suit.name}`)
            }
        }

        // board_cards = [
        //     // store.chooseFixedCard(13),
        //     store.pickedCard(),
        //     store.pickedCard(),
        //     store.pickedCard(),
        //     // store.pickedCard(),
        //     // store.pickedCard()
        // ]

        // const addCardToBoard = () => {
        //     board_cards.push(store.pickedCard())

        //     console.log(`Board modifié: ${board_cards.length}`)
        // }

        // Tapis: # #0AA44E

        playerStore.addPlayer(state.board_cards)
        playerStore.addPlayer(state.board_cards)
        playerStore.addPlayer(state.board_cards)
        playerStore.addPlayer(state.board_cards)
        playerStore.addPlayer(state.board_cards)
        playerStore.addPlayer(state.board_cards)

        const playersLeft = [...playerStore.playersList].splice(0, Math.floor(playerStore.playersList.length / 2))
        const playersRight = [...playerStore.playersList].splice(Math.floor(playerStore.playersList.length / 2))
        
        return {
            playersLeft,
            playersRight,
            playerStore,
            state,
            store,
            addCardToBoard,
            sendFlop
        }
    }
}
</script>

<style lang="scss">
.controls {
    display: flex;
    justify-content: center;
    column-gap: 16px;

    button.pickCard {
        display: flex;
        width: auto;
        border: 0;
        padding: 8px 16px;
        border-radius: 4px;
        background-color:  rgba(255, 255, 255, .75);
        cursor: pointer;
    }
    button.sendFlop {
        display: flex;
        width: auto;
        border: 0;
        padding: 8px 16px;
        border-radius: 4px;
        background-color:  rgba(255, 255, 255, .75);
        cursor: pointer;
    }
}
.table-wrapper {
    display: flex;

    ul {
        display: flex;
        flex-direction: column;
        margin: 0 1em;
        width: 50%;
        row-gap: 2em;

        &.right {
            li {
                margin-left: auto;
            }
        }
    
        li {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
