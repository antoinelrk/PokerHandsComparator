<template>
    <div class="board">
        <Card v-for="card in boardCards" :card="card" :classList="classeu" />
        <EmptySlot v-for="index in 5 - boardCards.length" />
    </div>
</template>

<script>
import Card from './Card.vue';
import EmptySlot from './EmptySlot.vue';
import { defineProps } from 'vue';

export default {
    props: ['boardCards'],
    components: {
        Card, EmptySlot
    },
    setup () {
        const classeu = "reveal"
        const flop = 3
        const turn = 4
        const river = 5
        return {
            classeu
        }
    }
}
</script>

<style lang="scss" scoped>
.board {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    column-gap: 8px;
    width: auto;
    transform: translateX(-50%) translateY(-50%);
    perspective: var(--perspective);
}
</style>