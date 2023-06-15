<template>
    <div class="board">
        <Card v-for="card in boardCards" :card="card" />
    </div>
</template>

<script setup>
import Card from './Card.vue';
defineProps(['boardCards'])
const flop = 3
const turn = 4
const river = 5
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
}
</style>