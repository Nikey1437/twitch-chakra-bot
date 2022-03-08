const { pickRandomChatterExceptInitiator, chatters } = require('../utils')

class Named {
    #client

    register (client, handlers) {
        this.#client = client
        handlers['!кротко'] = this.kpotko.bind(this)
        handlers['!nikey'] = this.nikey.bind(this)
        handlers['!никей'] = this.nikey.bind(this)
        handlers['!puh'] = this.puh.bind(this)
        handlers['!пух'] = this.puh.bind(this)
        handlers['!ангел'] = this.angel.bind(this)
        handlers['!angel'] = this.angel.bind(this)
        handlers['!moo'] = this.moo.bind(this)
        handlers['!му'] = this.moo.bind(this)
        handlers['!ромчик'] = this.romchik.bind(this)
    }

    async kpotko (target, username, msg, data) {
        await this.#client.say(target, '/me призывает своего хозяина')
    }

    async nikey (target, username, msg, data) {
        const users = await chatters(target)
        const randomChatter = pickRandomChatterExceptInitiator(users, username)
        if (randomChatter != null) {
            await this.#client.say(target, `@nikey1437 <3 ${randomChatter}`)
        }
    }

    async puh (target, username, msg, data) {
        try {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('Task failed successfully')
        } catch (e) {
            const errorMsg = `Command ${msg} failed:\n${e.stack}`
            await this.#client.say(target, `${errorMsg.substr(0, 450)}...`)
        }
    }

    async angel (target, username, msg, data) {
        if (username === 'ang3lmafia') {
            await this.#client.say(target, `${username} выдает бан @chakralounge`)
            return
        }

        await this.#client.say(target, 'Ангел, не бань!')
    }

    async moo (target, username, msg, data) {
        await this.#client.say(target, 'Слишком короткий')
    }

    async romchik (target, username, msg, data) {
        const romList = [
            'Ромчик', 'не Ромчик', 'ямыромчик', 'призываешь Ромчика!', 'сделал что-то не так, попробуй команду !пакет',
            'почти как ромчик, но не Ромчик', 'Ромчикообразный неромчик']
        const romNumber = Math.floor(Math.random() * romList.length)
        await this.#client.say(target, `${username} ты ${romList[romNumber]}`)
    }
}

module.exports = Named
