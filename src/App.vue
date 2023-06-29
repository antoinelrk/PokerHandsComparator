<template>
    <!-- <Loader /> -->
    <main>
        <h1 class="app-title">Poker Hands Comparator</h1>
        <div class="table-wrapper">
            <ul class="left">
                <li v-for="player in playersLeft" :key="player.id">
                    <Player :player="player" />
                </li>
            </ul>
            <ul class="right">
                <li v-for="player in playersRight" :key="player.id">
                    <Player :player="player" />
                </li>
            </ul>
        </div>
        <Board :boardCards="board_cards"/>
    </main>
    <footer>
        <a href="https://antoinelrk.com">AntoineLRK</a> • <a href="https://github.com/antoinelrk/PokerHandsComparator">Dépôt github</a> • alpha-1.0
    </footer>
</template>

<script setup>
import Player from './components/Player.vue';
import Loader from './components/Loader.vue';
import Board from './components/Board.vue';
import { useDeckStore } from './stores/deck.js'
import { usePlayersStore } from './stores/players.js'

const store = useDeckStore()
const playerStore = usePlayersStore()

const board_cards = [
    // store.chooseFixedCard(13),
    store.pickedCard(),
    store.pickedCard(),
    store.pickedCard(),
    // store.pickedCard(),
    // store.pickedCard()
]

// Tapis: # #0AA44E

playerStore.addPlayer(board_cards)
playerStore.addPlayer(board_cards)
playerStore.addPlayer(board_cards)
playerStore.addPlayer(board_cards)
playerStore.addPlayer(board_cards)
playerStore.addPlayer(board_cards)

const playersLeft = [...playerStore.playersList].splice(0, Math.floor(playerStore.playersList.length / 2))
const playersRight = [...playerStore.playersList].splice(Math.floor(playerStore.playersList.length / 2))
</script>

<style lang="scss">
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
