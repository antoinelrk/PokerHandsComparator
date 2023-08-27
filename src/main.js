import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Room from './views/room/Room.vue'
import './assets/app.scss'

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/room/:uuid',
            name: 'Room',
            component: Room
         }
    ]
})
app.use(router)
app.use(pinia)
app.mount('#app')