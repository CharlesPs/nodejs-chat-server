
import { Chat } from './chat.js'
import { User } from './user.js'

let _ = {
    is_logged: false,
    socket_id: undefined,
    user: undefined
}

let socket

class Account {

    constructor(s) {

        socket = s

        _.user = new User('Invitado', socket)
    }

    getSocketId() {
        return _.socket_id
    }

    setSocketId(socket_id) {
        _.socket_id = socket_id

        Chat.showMySocketId(_.socket_id)
    }

    getName() {

        return _.user.getName()
    }

    setName(name) {
        _.user.setName(name)
    }
}

export { Account }
