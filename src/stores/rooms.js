import { defineStore } from "pinia"
import { v4 as uuidv4 } from 'uuid';
import { reactive } from "vue";

export const useRoomsStore = defineStore('rooms', () => {
    const rooms = reactive([])

    const addRoom = (room) => rooms.push(room)

    return {
        rooms,
        addRoom
    }
})