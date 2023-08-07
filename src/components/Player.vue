<template>
    <div class="player-component">
        <h2 class="player-name">{{ props.player.name }}</h2>
        <h3>{{ props.player.handType ?? "Non distribuée" }}</h3>
        <div class="hand">
            <Card v-for="card in props.player.cards" :card="card" :classList="reveal === false ? 'reveal' : 'reveal'" />
            <EmptySlot v-for="index in 2 - props.player.cards.length" />
        </div>
    </div>
</template>

<script setup>
import Card from './Card.vue'
import EmptySlot from './EmptySlot.vue'
import Poker from '../poker.js'
import { onMounted } from 'vue';

const props = defineProps({
    player: Object
})

// onMounted(() => props.player.handType = Poker.check(props.player.cards))
</script>

<style lang="scss">
.player-component {
    display: flex;
    flex-direction: column;
    margin: 0 auto 0 0;
    font-weight: 800;
    font-size: 24px;
    font-family: sans-serif;
    row-gap: .5em;
    color: white;

    h2.player-name {
        display: flex;
        margin: 0 auto;
        filter: drop-shadow(0 0 16px rgba(0, 0, 0, .5));
    }

    h3 {
        margin: 0 auto;
        font-size: 20px;
    }

    .hand {
        display: flex;
        column-gap: 8px;
        width: auto;
        perspective: var(--perspective);

        &:hover {
            .card {
                transition: transform 1s ease;
                transform: rotateY(0);
            }
        }
    }
}
</style>
