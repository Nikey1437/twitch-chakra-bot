const { privilegedUsers, checked } = require('../permissions')
const { FileDB } = require("../filedb");
const { splitOnce } = require("../utils");

class Note {
    #client

    #db

    register (client, handlers) {
        this.#client = client
        this.#db = new FileDB("note_list.txt")
        handlers['!сегодня'] = this.show.bind(this)
        handlers['!заметка'] = this.show.bind(this)
        handlers['!добавитьзаметку'] = checked(privilegedUsers, this.add.bind(this))
        handlers['!очиститьзаметку'] = checked(privilegedUsers, this.rm.bind(this))
    }

    async show (target, username, msg, data) {
        const [note] = await this.#db.load()
        await this.#client.say(target, note)
    }

    async add (target, username, msg, data) {
        const cmd = splitOnce(msg, ' ')
        cmd.shift()
        await this.#db.save(cmd)

        await this.#client.say(target, 'Заметка изменена')
    }

    async rm (target, username, msg, data) {
        await this.#db.clear()

        await this.#client.say(target, 'Заметка очищена')
    }
}

module.exports = Note
