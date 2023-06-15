<template>
    <div class="player-component">
        <h3 class="winner">Player #{{ player.id }}: {{ player.state.win_type }}</h3>
        <div class="hand">
            <Card v-for="card in player.cards" :card="card" :player="player" />
        </div>
    </div>
</template>

<script setup>
import Card from './Card.vue';

defineProps(['player'])
</script>

<style lang="scss">
.player-component {
    display: flex;
    flex-direction: column;
    margin: 0 auto 0 0;
    font-weight: 800;
    font-size: 24px;
    row-gap: .5em;

    h3 {
        display: flex;
        color: white;
        margin: 0 auto;
        font-size: 20px;
        filter: drop-shadow(0 0 16px rgba(0, 0, 0, .5));
    }

    .hand {
        display: flex;
        column-gap: 8px;
        width: auto;
    }
}
</style>