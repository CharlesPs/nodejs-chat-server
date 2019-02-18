
import { User } from './user.js'

let socket

let account

class Chat {

    static socket

    static users

    static are_we_bottom = true

    static initialize(s) {
        socket = s

        $('.btn-toggle-my-profile').on('click', (e) => {
            $('.my-profile').toggleClass('active')
        })

        $('.btn-send-message').on('click', this.sendMessage)
        $('#message').on('keyup', e => {

            if (e.keyCode === 13) {

                this.sendMessage(e)
            }
        })

        $('.editable.nick_name').on('click', this.setNickNameEditable)

        $('#nick_name').on('keyup', e => {

            if (e.keyCode === 13) {

                this.setNickName(e)
            }
        })
        $('#nick_name').on('blur', this.setNickName)

        $('.messages').on('scroll', Chat.checkHeight)

        $(window).on('resize', () => {

            if (Chat.are_we_bottom) {

                Chat.chatScroll()
            }
        })
    }

    static setAccount(acc) {
        account = acc

        this.setMyName(account.getName())
    }

    static setNickName(e) {

        account.setName($('#nick_name').val())

        Chat.setMyName(account.getName())

        Chat.unSetNickNameEditable()
    }

    static reconnect() {

        socket.emit('users_list', true)

        Chat.setMyName(account.getName())
    }

    static setNickNameEditable(e) {

        $('.editable.nick_name').addClass('hide')
        $('#nick_name').removeClass('hide')
        $('#nick_name').select()
    }

    static unSetNickNameEditable() {

        $('.editable.nick_name').removeClass('hide')
        $('#nick_name').addClass('hide')
    }

    static setMyName(name) {

        $('.header .account .name').text(name)
        $('.my-profile .nick_name').text(name)
        $('#nick_name').val(name)

        socket.emit('user_name', name)
    }

    static setUsersList(users) {

        $('.chat-interface .left .users').html('')

        const users_list = []

        console.log('----------------------------')

        this.users = users.map(_user => {

            console.log('User socket_id:', _user.socket_id, account.getSocketId() !== _user.socket_id)

            const user = new User(_user.name)
            user.setSocketId(_user.socket_id)

            if (account.getSocketId() !== user.getSocketId()) {

                const user_li = $('<li class="user" />')
                user_li.append($('<div class="avatar" />').append('<img src="uploads/avatars/no_avatar.jpg" />'))
                user_li.append($('<div class="name" />').text(user.getName()))
                user_li.append($('<div class="socket_id" />').text(user.getSocketId()))

                users_list.push(user_li)
            }

            return user
        })

        $('.chat-interface .left .users').append(users_list)
    }

    static sendMessage() {

        const msg = $('#message').val()

        if (msg.length > 0) {

            socket.emit('chat_message', msg)
            $('#message').val('')
        }

        $('#message').focus()
    }

    static addMessage(msg) {

        const _clase = (msg.socket_id === account.getSocketId()) ? 'msg-row msg-right' : 'msg-row'

        let user

        this.users.map(_user => {

            if (_user.getSocketId() === msg.socket_id) {

                user = _user
            }
        })

        if (user) {

            const _row = $(`<li class="${_clase}" />`)
            const bubble = $('<div class="msg-bubble" />')
            bubble.append($('<div class="msg-name" />').text(user.getName()))
            bubble.append($('<div class="msg-content" />').text(msg.message))

            _row.append(bubble)

            $('#messages').append(_row)

            if (Chat.are_we_bottom) {

                Chat.chatScroll()
            }
        }
    }

    static chatScroll() {

        $('.messages').animate({scrollTop: $('#messages').height()}, 100)
    }

    static checkHeight() {

        const div_h = parseInt($('.messages').height(), 10)
        const div_s = parseInt($('.messages').scrollTop(), 10)
        const ul_h = parseInt($('#messages').height(), 10)

        Chat.are_we_bottom = (div_h + div_s) >= ul_h

        $('.chat-title').text(div_h + "+" + div_s + '=' + (div_h + div_s) + ":" + ul_h + " [" + Chat.are_we_bottom + "]")
    }

    static areWeAtBottom() {

        const scroll = $('.messages').scrollTop()

        const div_h = $('.messages').height()
        const ul_h = $('#messages').height()

        if ((scroll + div_h) >= ul_h) {

            return true
        }

        return false
    }

    static showMySocketId(socket_id) {

        $('.my-profile .socket_id').text(socket_id)
    }
}

export { Chat }
