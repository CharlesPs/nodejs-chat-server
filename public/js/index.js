
import { Account } from './account.js'
import { User } from './user.js'
import { Chat } from './chat.js'

const socket = io()

Chat.initialize(socket)

const account = new Account(socket)

const app = {

    initialize() {

        Chat.setAccount(account)

        socket.on('reconnect', Chat.reconnect)

        socket.on('socket_id', account.setSocketId)

        socket.on('users_list', Chat.setUsersList)

        socket.on('chat_message', Chat.addMessage)
    }
}

app.initialize()
