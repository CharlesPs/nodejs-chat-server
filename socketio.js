
module.exports = (server) => {
    
    const io = require('socket.io')(server)

    io.on('connection', (socket) => {

        console.log('new connection', socket.id)

        socket.broadcast.emit('Bienvenid@')

        socket.emit('socket_id', socket.id)

        socket.on('chat_message', msg => {

            console.log('Chat message:', msg)

            io.emit('chat_message', msg)
        })
    
        socket.on('disconnect', () => {

            console.log(socket.id, 'disconected')
        })
    })

    return io
}