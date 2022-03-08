const fs = require("fs").promises;

class FileDB {
    #filename

    constructor (filename) {
        this.#filename = filename
    }

    async load () {
        try {
            const content = await fs.readFile(process.env.FILEDB_ROOT + this.#filename, 'utf8')

            return JSON.parse(content)
        } catch (e) {
            return []
        }

    }

    async save (data) {
        await fs.writeFile(process.env.FILEDB_ROOT + this.#filename, JSON.stringify(data), 'utf8')
    }

    async append (data) {
        const old = await this.load()
        old.push(data)
        await this.save(old)
    }

    // noinspection JSUnusedGlobalSymbols
    async appendAll (data) {
        const old = await this.load()
        await this.save(old.concat(data))
    }

    async rm (item) {
        const old = await this.load()
        await this.save(old.filter((val) => val !== item))
    }

    async clear () {
        await this.save([])
    }
}

module.exports = { FileDB }
