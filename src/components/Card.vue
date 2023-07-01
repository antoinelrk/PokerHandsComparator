<template>
    <div class="card" :class="(player?.state.win ? 'winner' : '')">
        <div class="value" :class="card.suit.color">{{ card.value }}</div>
        <div class="icon">
            <img :src="card.suit.icon">
        </div>
        <div class="value revert" :class="card.suit.color">{{ card.value }}</div>
    </div>
</template>

<script setup>
defineProps(['card', 'state'])
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    display: flex;
    width: 130px;
    height: 180px;
    border-radius: 6px;
    background-color: white;
    border: solid 3px transparent;
    overflow: hidden;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, .2));
    // transform: rotateY(45deg);
    // transform-style: preserve-3d;

    &.winner {
        border: solid 4px red;
    }

    .icon {
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 45px;
        height: 45px;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .value {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: auto;
        padding: 0 6px;
        height: 32px;
        font-weight: 800;
        // font-family: 'Shippori Mincho';
        font-family: 'Pridi';
        font-weight: 500;
        font-size: 24px;

        &.normal {
            top: 0;
            left: 0;
            transform: none;
        }

        &.revert {
            bottom: 0;
            right: 0;
            transform: rotate(180deg);
        }

        &.black {
            color: var(--card-black);
        }

        &.red {
            color: var(--card-red);
        }
    }
}
</style>