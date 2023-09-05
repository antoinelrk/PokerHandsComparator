<template>
    <div class="card" :class="props.classList">
        <div class="front">
            <div class="value" :class="props.card.gfx.hexColor">{{ props.card.value }}</div>
            <div class="icon">
                <img :src="props.card.gfx.icon">
            </div>
            <div class="value revert" :class="props.card.gfx.hexColor">{{ props.card.value }}</div>
        </div>
        <!-- <div class="back"></div> -->
    </div>
</template>

<script setup>
const props = defineProps({
    card: Object,
    classList: String
})
</script>

<style lang="scss">
.card {
    position: relative;
    display: flex;
    border: solid 3px transparent;
    transform-style: preserve-3d;
    transition: transform 1s ease;

    &.inBoard {
        width: 130px;
        height: 180px;
    }

    &.inHand {
        width: calc(130px / 2);
        height: calc(180px / 2);

        .front {
            filter: drop-shadow(0 0 1px black);

            .icon {
                width: calc(45px / 2);
                height: calc(45px / 2);
            }
            .value {
                font-size: 14px;
                padding: 0 3px;
            }
        }
    }

    .front {
        position: absolute;
        overflow: hidden;
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background-color: #fff;

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
            height: auto;
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
}

@keyframes flip {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(180deg);
    }
}
</style>