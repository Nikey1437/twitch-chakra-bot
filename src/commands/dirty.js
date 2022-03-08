const { privilegedUsers, checked } = require('../permissions')
const { FileDB } = require("../filedb");
const { splitOnce } = require("../utils");

class Dirty {
    #client

    #db

    register (client, handlers) {
        this.#client = client
        this.#db = new FileDB("chakra_list.txt")
        handlers['!грязюка'] = this.show.bind(this)
        handlers['!добавить'] = checked(privilegedUsers, this.add.bind(this))
        handlers['!удалить'] = checked(privilegedUsers, this.rm.bind(this))
    }

    async show (target, username, msg, data) {
        const list = await this.#db.load()
        await this.#client.say(target, list.join(', '))
    }

    async add (target, username, msg, data) {
        const [, targetName] = splitOnce(msg, ' ')

        await this.#db.append(targetName)

        await this.#client.say(target, `${targetName} добавлен в список грязных игроков`)
    }

    async rm (target, username, msg, data) {
        const [, targetName] = splitOnce(msg, ' ')

        await this.#db.rm(targetName)

        await this.#client.say(target, `${targetName} удален из списка грязных игроков`)
    }
}

module.exports = Dirty
