<template>
    <button class="control-btn">
        <slot></slot>
    </button>
</template>

<style lang="scss">
button.control-btn {
    display: flex;
    width: auto;
    border: 0;
    padding: 8px 16px;
    border-radius: 4px;
    background-color:  rgba(255, 255, 255, .75);
    cursor: pointer;
}
</style>