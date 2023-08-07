<template>
    <div class="board">
        <Card v-for="card in props.cards" :card="card" :classList="`reveal`" />
        <EmptySlot v-for="index in 5 - props.cards.length" />
    </div>
</template>

<script setup>
import Card from './Card.vue'
import EmptySlot from './EmptySlot.vue';
const props = defineProps({
    cards: Array,
})
</script>

<style lang="scss">
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