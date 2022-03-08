const { privilegedUsers, checked } = require('../permissions')
const { FileDB } = require("../filedb");
const { splitOnce } = require("../utils");

class Players {
    #client

    #db

    register (client, handlers) {
        this.#client = client
        this.#db = new FileDB("player_list.txt")
        handlers['!игроки'] = this.show.bind(this)
        handlers['!бункерсегодня'] = this.show.bind(this)
        handlers['!добавитьигроков'] = checked(privilegedUsers, this.add.bind(this))
        handlers['!очиститьигроков'] = checked(privilegedUsers, this.clear.bind(this))
    }

    async show (target, username, msg, data) {
        const list = await this.#db.load()
        await this.#client.say(target, list.join(', '))
    }

    async add (target, username, msg, data) {
        const [, targetName] = splitOnce(msg, ' ')

        await this.#db.append(targetName)

        await this.#client.say(target, 'Список игроков изменен')
    }

    async clear (target, username, msg, data) {
        await this.#db.clear()

        await this.#client.say(target, 'Список игроков очищен')
    }
}

module.exports = Players
