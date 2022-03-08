const Shared = require("./shared");

class MsgLoop {
    #client

    #currentMsg

    #msgList

    constructor (msgList) {
        this.#msgList = msgList
        this.#currentMsg = 0
    }

    register (client) {
        this.#client = client
        setInterval(this.sendNext.bind(this), 600000)
    }

    async sendNext () {
        const current = this.#msgList[this.#currentMsg]
        const msg = current instanceof Function ? current() : current
        await this.#client.say(Shared.target, msg)
        this.#currentMsg += 1
        if (this.#currentMsg >= (this.#msgList.length)) {
            this.#currentMsg = 0
        }
    }

}

module.exports = MsgLoop