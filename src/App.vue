<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script setup>
import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'
</script>