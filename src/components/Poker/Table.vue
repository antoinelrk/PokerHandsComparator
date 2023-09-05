<template>
    <section class="poker-table">
        <Player
            v-for="player in playersList"
            :class="player.tablePosition"
            :position="player.position"
            :player="player"
        ></Player>
        <Board :cards="board"></Board>
    </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

import Player from './Player.vue'
import Board from './Board.vue'

const props = defineProps({
    board: Array,
    playersList: Array
})

console.log(props.board)
</script>

<style lang="scss">
section.poker-table {
    position: relative;
    display: flex;
    width: 66%;
    aspect-ratio: 2/1;
    border-radius: 9999px;
    background-image: url(../../assets/noise.png);
    background-repeat: repeat;
    background-size: 5%;
    background-color: #0AA44E;
    border: solid 20px #942f2f;
}
</style>