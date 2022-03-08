class Greeter {
    #client

    #messages

    register (client) {
        this.#client = client
        this.#messages = {
            puuuuhhhh: 'A wild puh appears!',
            makemevision: 'Король сабок @makemevision уже в чате, поприветствуем его!',
            y0u0rMe: 'Целясь, но не в шерифа, а в ансаба, в чат влетает @y0u0rMe.',
            Goblak333: 'Пробегая мимо, Артур увидел знакомую фиссуру и решил остаться тут. Окажем ему теплый прием.'
        }

        this.#client.onJoin(this.onJoin.bind(this))
    }

    async onJoin (target, name) {
        const msg = this.#messages[name]
        if (msg != null) {
            await this.#client.say(target, msg)
        }
    }
}

module.exports = Greeter
