<template>
    <main class="room">
        <div class="controls">
            <ButtonControl v-show="!distributed.value" @click="distribute">Distribuer</ButtonControl>
            <ButtonControl v-show="distributed.value && !flopped.value" @click="sendFlop">Envoyer le flop</ButtonControl>
            <ButtonControl v-show="distributed.value && flopped.value && !gameEnd.value" @click="addCardToBoard">Envoyer une carte</ButtonControl>
            <ButtonControl v-show="gameEnd.value" @click="resetRoom">Retourner à l'accueil</ButtonControl>
        </div>
        <h3 class="room-id">Room: {{ this.$route.params.uuid }}</h3>
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
</template>

<script setup>
import ButtonControl from '../../components/ui/ButtonControl.vue'
import { ref, computed, reactive } from 'vue'
import Player from '../../components/Player.vue';
import Board from '../../components/Board.vue'
import playersListData from '../../players'
import { useDeckStore } from '../../stores/deck'
import Poker from '../../poker';
import { useRouter } from 'vue-router'
import { useRoomsStore } from '../../stores/rooms'

const roomsStore = useRoomsStore()
const deckStore = useDeckStore()
const router = useRouter()

const playersList = reactive(playersListData)
const boardCards = reactive([])
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

// playersList.push({
//     name: "Kiwodd",
//     handType: null,
//     cards: []
// })

const distribute = () => {
    // On push 2 cartes à chaque joueurs à partir du deck du store
    // Le double value c'est chelou, à vérifier
    playersList.forEach(player => {
        player.cards.push(deckStore.pickCard())
        player.cards.push(deckStore.pickCard())
        /**
         * On recheck les mains
         */
        player.handType = Poker.check([...player.cards, ...boardCards])
    })
    distributed.value.value = true
}
const sendFlop = () => {
    // On push trois cartes dans le board à partir du deck du store
    boardCards.push(deckStore.pickCard())
    boardCards.push(deckStore.pickCard())
    boardCards.push(deckStore.pickCard())
    playersList.forEach(player => {
        player.handType = Poker.check([...player.cards, ...boardCards])
    })
    flopped.value.value = true
}
const addCardToBoard = () => {
    // On push une carte dans le board à partir du deck du store
    if (boardCards.length < 5) {
        boardCards.push(deckStore.pickCard())
        boardCards.length === 5 ? gameEnd.value.value = true : ''
        playersList.forEach(player => {
            player.handType = Poker.check([...player.cards, ...boardCards])
        })
    }
}
const resetRoom = () => {
    boardCards.length = 0
    playersList.forEach(player => {
        player.cards = []
        player.handType = null
    })
    router.push('/')
}

const playersLeft = computed(() => [...playersList].splice(0, Math.floor(playersList.length / 2)))
const playersRight = computed(() => [...playersList].splice(Math.floor(playersList.length / 2)))
</script>

<style lang="scss">
.controls {
    display: flex;
    padding: .5em;
    width: auto;
    margin: 0 auto;
    justify-content: center;
}
h3.room-id {
    margin: 1em auto 0 auto;
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