import { v4 as uuidv4 } from 'uuid';

export default class Room {
    id = null
    board = []
    _players = []

    constructor () {
        this.id = uuidv4()
    }

    set players (player) {
        this._players = player
    }
}