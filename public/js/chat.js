
const socket = io()

const chat = {

    initialize() {

        $('#message').on('keyup', e => {

            const msg = $('#message').val()
        
            if (e.keyCode === 13 && msg.length > 0) {
        
                this.send(msg)
                $('#message').val('')
            }
        })

        socket.on('socket_id', (socket_id) => {

            $('#socket_id').text(socket_id)
        })

        socket.on('chat_message', msg => {

            $('#messages').append($('<li>').text(msg))
        })
    },
    send(msg) {

        socket.emit('chat_message', msg)
    }
}

chat.initialize()

