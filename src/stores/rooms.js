import { defineStore } from "pinia"
import { v4 as uuidv4 } from 'uuid';
import { reactive } from "vue";

export const useRoomsStore = defineStore('rooms', () => {
    const rooms = reactive([])

    const createRoom = (player) => {
        rooms.push({
            id: uuidv4(),
            players: [player],
            state: 'idle'
        })
    }

    return {
        rooms,
        createRoom
    }
})