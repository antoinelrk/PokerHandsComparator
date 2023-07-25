<template>
    <div class="card" @click="flipCard($event)" :class="classList">
        <div class="front">
            <div class="value" :class="card.suit.color">{{ card.value }}</div>
            <div class="icon">
                <img :src="card.suit.icon">
            </div>
            <div class="value revert" :class="card.suit.color">{{ card.value }}</div>
        </div>
        <div class="back"></div>
    </div>
</template>

<script>
export default {
    props: ['card', 'state', 'classList'],
}

</script>

<style lang="scss" scoped>
.card {
    position: relative;
    display: flex;
    width: 130px;
    height: 180px;
    border: solid 3px transparent;
    transform-style: preserve-3d;
    // animation: flip 3s linear infinite alternate-reverse;
    transition: transform 1s ease;
    transform: rotateY(180deg);

    // &:hover {
    //     transition: transform 1s ease;
    //     transform: rotateY(0);
    // }

    &.winner {
        border: solid 4px red;
    }

    &.reveal {
        transform: rotateY(0);
    }

    .front, .back {
        position: absolute;
        overflow: hidden;
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, .2));
        border-radius: 6px;
    }

    .front {
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

    .back {
        width: 100%;
        height: 100%;
        background-image: url(../components/back.png);
        background-size: 100% 100%;
        transform: rotateY(180deg);
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