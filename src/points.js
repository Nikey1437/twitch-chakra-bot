const Shared = require('./shared')

class Points {
    #chat

    #api

    #last

    register (chat, api) {
        this.#chat = chat
        this.#api = api
        this.#last = []

        setInterval(this.checkUsers.bind(this), 60 * 1000)
    }

    async checkUsers () {
        const chatters = (await this.#api.unsupported.getChatters(Shared.channelName)).allChatters
        const prevViewers = this.#last.filter((n) => chatters.indexOf(n) !== -1)
        prevViewers.forEach(v => {
            Shared.database.incPoints(v, 100)
        })
        this.#last = chatters
    }
}

module.exports = Points
