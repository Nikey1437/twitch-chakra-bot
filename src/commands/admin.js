const { privilegedUsers, bezdarUsers, checkedOrMod } = require('../permissions')
const { toInt } = require('../utils')

class Admin {
    #client

    register (client, handlers) {
        this.#client = client
        handlers['!kill'] = checkedOrMod(new Set([...privilegedUsers, ...bezdarUsers]), this.kill.bind(this))
        handlers['!perma'] = checkedOrMod(privilegedUsers, this.ban.bind(this))
        handlers['!пермач'] = checkedOrMod(privilegedUsers, this.ban.bind(this))
        handlers['!unban'] = checkedOrMod(privilegedUsers, this.unban.bind(this))
        handlers['!poof'] = this.poof.bind(this)
        handlers['!пуф'] = this.poof.bind(this)
        handlers['!ваниш'] = this.poof.bind(this)
    }

    async kill (target, username, msg, data) {
        const split = msg.split(' ')
        const filtered = split.filter((el) => el != null && el !== '')
        const killTarget = filtered[1]

        let timeoutDuration = toInt(filtered[2])

        if (bezdarUsers.has(username)) {
            if (timeoutDuration > 10) {
                timeoutDuration = 10
            }
        }
        if (timeoutDuration < 1) {
            timeoutDuration = 1
        }
        if (timeoutDuration > 1209600) {
            timeoutDuration = 1209600
        }

        await this.#client.timeout(target, killTarget, timeoutDuration, `${killTarget} был жестоко убит коварным ботом`)
        await this.#client.say(target, `наказал ${killTarget} банхаммером на ${timeoutDuration} секунд!`)
    }

    async ban (target, username, msg, data) {
        const splittedCommand = msg.split(' ')
        const targetName = splittedCommand[1]

        await this.#client.say(target, `/ban ${targetName}`)
        await this.#client.say(target, `осуждает ${targetName} и даёт ему перманентный бан`)
    }

    async unban (target, username, msg, data) {
        const split = msg.split(' ')
        const targetName = split[1]

        await this.#client.say(target, `/unban ${targetName}`)
        await this.#client.say(target, `${targetName} разбанен`)
    }

    async poof (target, username, msg, data) {
        await this.#client.timeout(target, username, 1, 'Он испарился')
    }
}

module.exports = Admin
