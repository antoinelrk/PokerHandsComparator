import { defineStore } from "pinia"
import { useDeckStore } from "./deck"

export const useHandsStore = defineStore('hands', () => {
    const deck = useDeckStore()
    
})