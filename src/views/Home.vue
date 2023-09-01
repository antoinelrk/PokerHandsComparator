<template>
    <main class="home">
        <div class="controls">
            <ButtonControl @click="createNewRoom">Create a room</ButtonControl>
        </div>
        <ul class="data-table">
            <li v-for="room in roomsStore.rooms">Room ID: {{ room.id }}</li>
        </ul>
    </main>
</template>

<script setup>
import Room from '../core/Room.js'
import ButtonControl from '../components/ui/ButtonControl.vue'
import { useRouter } from 'vue-router'
import { useRoomsStore } from '../stores/rooms.js'
const roomsStore = useRoomsStore()
const router = useRouter()

const createNewRoom = () => {
    const newRoom = new Room()
    roomsStore.addRoom(newRoom)
    router.push(`/room/${newRoom.id}`)

    console.log(newRoom.players)

    /**
     * On doit sauvegarder l'état de la room dans le store "rooms", on peut même laisser le store gérer l'id si on le souhaite.
     */
}
</script>

<style lang="scss" scoped>
main.home {
    display: flex;
}
</style>