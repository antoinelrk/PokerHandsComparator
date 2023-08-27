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
    <router-view></router-view>
    <footer>
        <a href="https://antoinelrk.com">AntoineLRK</a> • <a href="https://github.com/antoinelrk/PokerHandsComparator">Dépôt github</a> • alpha-3.0
    </footer>
</template>