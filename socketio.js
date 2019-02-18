
module.exports = (server) => {
    
    const io = require('socket.io')(server)

    let users = []

    io.on('connection', (socket) => {

        users.push({
            socket_id: socket.id,
            name: '',
            avatar: '',
            status: 'online'
        })

        io.emit('users_list', users)

        socket.on('user_name', name => {

            const _users = users.map(user => {

                if (user.socket_id === socket.id) {

                    user.name = name
                }

                return user
            })

            users = _users

            io.emit('users_list', users)
        })

        socket.on('users_list', () => {
            socket.emit('users_list', users)
        })

        socket.broadcast.emit('Bienvenid@')

        socket.emit('socket_id', socket.id)

        socket.on('chat_message', message => {

            const msg = {
                socket_id: socket.id,
                message
            }

            io.emit('chat_message', msg)
        })
    
        socket.on('disconnect', () => {

            const _users = users.filter(user => {

                if (user.socket_id !== socket.id) {

                    return user
                }
            })

            users = _users
 
            io.emit('users_list', users)
       })
    })

    return io
}