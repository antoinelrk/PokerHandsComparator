<template>
    <main>
        <h1 class="app-title">Poker Hands Comparator</h1>
        <div class="controls">
            <button class="button-control" v-show="!distributed.value" @click="distribute">Distribuer</button>
            <button class="button-control" v-show="distributed.value && !flopped.value" @click="sendFlop">Envoyer le flop</button>
            <button class="button-control" v-show="distributed.value && flopped.value && !gameEnd.value" @click="addCardToBoard">Envoyer une carte</button>
        </div>
        <div class="table-wrapper">
            <ul class="left">
                <li>
                    <Player v-for="player in playersLeft" :player="player" />
                </li>
            </ul>
            <ul class="right">
                <li>
                    <Player v-for="player in playersRight" :player="player" />
                </li>
            </ul>
        </div>
        <Board :cards="boardCards" />
    </main>
    <footer>
        <a href="https://antoinelrk.com">AntoineLRK</a> • <a href="https://github.com/antoinelrk/PokerHandsComparator">Dépôt github</a> • alpha-2.0
    </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Player from './components/Player.vue';
import Board from './components/Board.vue'
import playersListData from './players'
import { useDeckStore } from './stores/deck'
import Poker from './poker';

const deckStore = useDeckStore()

const playersList = ref(playersListData)
const boardCards = ref([])
const distributed = ref({
    type: Boolean,
    value: false
})
const flopped = ref({
    type: Boolean,
    value: false
})
const gameEnd = ref({
    type: Boolean,
    value: false
})

const distribute = () => {
    // On push 2 cartes à chaque joueurs à partir du deck du store
    // Le double value c'est chelou, à vérifier
    playersList.value.forEach(player => {
        player.cards.push(deckStore.pickCard())
        player.cards.push(deckStore.pickCard())
        /**
         * On recheck les mains
         */
        player.handType = Poker.check([...player.cards, ...boardCards.value])
    })
    distributed.value.value = true
}
const sendFlop = () => {
    // On push trois cartes dans le board à partir du deck du store
    boardCards.value.push(deckStore.pickCard())
    boardCards.value.push(deckStore.pickCard())
    boardCards.value.push(deckStore.pickCard())
    playersList.value.forEach(player => {
        player.handType = Poker.check([...player.cards, ...boardCards.value])
    })
    flopped.value.value = true
}
const addCardToBoard = () => {
    // On push une carte dans le board à partir du deck du store
    if (boardCards.value.length < 5) {
        boardCards.value.push(deckStore.pickCard())
        boardCards.value.length === 5 ? gameEnd.value.value = true : ''
        playersList.value.forEach(player => {
            player.handType = Poker.check([...player.cards, ...boardCards.value])
        })
    }
}


const playersLeft = computed(() => [...playersList.value].splice(0, Math.floor(playersList.value.length / 2)))
const playersRight = computed(() => [...playersList.value].splice(Math.floor(playersList.value.length / 2)))

</script>

<style lang="scss">
.controls {
    display: flex;
    justify-content: center;
    column-gap: 16px;

    button.button-control {
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
