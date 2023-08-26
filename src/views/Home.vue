<template>
    <main class="home">
        <div class="controls">
            <ButtonControl @click="createNewRoom">Create a room</ButtonControl>
        </div>
    </main>
</template>

<script setup>
import ButtonControl from '../components/ui/ButtonControl.vue'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router'
const router = useRouter()

const createNewRoom = () => {
    const roomId = uuidv4()
    console.log(roomId)
    router.push(`/room/${roomId}`)

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