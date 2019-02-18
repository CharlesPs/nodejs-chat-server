
let _ = {
    socket_id: undefined,
    name: '',
    age: undefined,
    avatar: 'no_avatar.jpg'
}

class User {

    constructor(name) {

        this.setName(name)
    }

    getSocketId(socket_id) {
        return this.socket_id
    }

    setSocketId(socket_id) {
        this.socket_id = socket_id
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    getAge() {
        return this.age
    }

    getAvatar() {
        return this.avatar
    }
}

export { User }
