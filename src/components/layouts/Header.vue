<template>
    <header>
        <h1 class="app-title">PokerGame</h1>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
header {
    display: flex;
    height: 64px;
    background-color: rgba(white, .15);
    width: 100%;
    padding: 0 1em;
    justify-content: space-between;
    align-items: center;

    h1.app-title {
        display: flex;
    }

    nav {
        display: flex;

        ul {
            display: flex;
            column-gap: 1em;

            li {

            }
        }
    }
}
</style>