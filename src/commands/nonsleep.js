const { privilegedUsers } = require('../permissions')
const Shared = require('../shared')
const { checkedOrMod } = require('../permissions')

class NonSleep {
    #client

    register (client, handlers) {
        this.#client = client
        handlers['!продление'] = this.info.bind(this)
        handlers['!продлить'] = checkedOrMod(privilegedUsers, this.extend.bind(this))
        handlers['!сброситьчасы'] = checkedOrMod(privilegedUsers, this.reset.bind(this))
    }

    async extend (target, username, msg, data) {
        await this.#client.say(target, 'Продлёнt стрим на 1 час!')
        Shared.dopHours += 1
        await this.info(target, username, msg, data)
    }

    async info (target, username, msg, data) {
        await this.#client.say(target, `Теперь отправив донат в 1500 RUB, вы можете увеличить продолжительность трансляции на 1ч, невозможно увеличить время стрима больше чем на 4ч с момента запуска продления. УЖЕ ПРОДЛЕНО НА ${Shared.dopHours}/4`)
    }

    async reset (target, username, msg, data) {
        await this.#client.say(target, 'Часы продления сброшены')
        Shared.dopHours = 0
        await this.info(target, username, msg, data)
    }
}

module.exports = NonSleep
