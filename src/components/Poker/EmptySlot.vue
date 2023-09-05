<template>
    <div class="empty-card" :class="classList"></div>
</template>

<script setup>
const props = defineProps({
    classList: String
})
</script>

<style lang="scss" scoped>
.empty-card {
    position: relative;
    display: flex;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // transform: rotateY(45deg);
    // transform-style: preserve-3d;
    border: solid 3px #ffffff88;

    &.inHand {
        width: calc(130px / 2);
        height: calc(180px / 2);
    }
    &.inBoard {
        width: 130px;
        height: 180px;
    }
}
</style>