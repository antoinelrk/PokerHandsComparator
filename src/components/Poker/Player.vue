<template>
    <div class="player">
        <div class="position">{{ player.position }}</div>
        <div class="avatar">
            <img :src="player.avatar" alt="">
        </div>
        <div class="hand">
            <!-- <span>{{ player.handType ?? "Non distribuée" }}</span> -->
            <Card v-for="card in player.cards" :card="card" :classList="'inHand'"></Card>
            <EmptySlot v-for="index in 2 - props.player.cards.length" :classList="'inHand'"/>
        </div>
        <div class="username">{{ player.name }}</div>
    </div>
</template>

<script setup>
import Card from './Card.vue'
import EmptySlot from './EmptySlot.vue'

const props = defineProps({
    player: Object
})

</script>

<style lang="scss">
.player {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: solid 8px #942f2f;
    border-radius: 9999px;
    // overflow: hidden;

    &.folded {
        transform: scale(.8);
    }

    .position {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 9999px;
        border: solid 4px #942f2f;
    }

    .username {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        width: 100%;
        bottom: 0;
        padding: .2em .1em;
        background-color: gray;
        border-radius: 6px;
        border: solid 2px darken(gray, 15);
        z-index: 50;
    }

    .avatar {
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 9999px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    .hand {
        position: absolute;
        display: flex;
        column-gap: .2em;
        bottom: 0;
        transform: translateY(50%);
        justify-content: space-between;
        z-index: 51;
    }

    &.dealer {
        top: 0;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: pink;
    }

    &.mid {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(50%);
    }

    &.top-left {
        top: -32px;
        left: 64px;
    }

    &.bottom-left {
        bottom: 0;
        left: 0;
    }

    &.top-right {
        top: -32px;
        right: 64px;
    }

    &.bottom-right {
        bottom: 0;
        right: 0;
    }
}
</style>