const polemica = require('../polemica')

class Polemica {
    #client

    #user_id

    // Like nonce for cache invalidation. Break last if there were no games in last 10 days
    #cache_killer

    constructor (userId) {
        this.#user_id = userId
        this.#cache_killer = 10
    }

    register (client, handlers) {
        this.#client = client
        handlers['!last'] = this.last.bind(this)
        handlers['!ласт'] = this.last.bind(this)
        handlers['!pmp'] = this.pmp.bind(this)
        handlers['!рейтинг'] = this.pmp.bind(this)
    }

    async last (target, username, msg, data) {
        const game = await polemica.getLastGame(this.#user_id, this.#cache_killer)
        this.#cache_killer += 1

        const nameFormat = (player) => `${player.position}. ${player.nickname}`

        const mafia = game.roles.mafia.map(nameFormat).join(', ')

        await this.#client.say(target, `В последней игре роль стримера - ${game.role}. 
Результат - ${game.result}. 
Роли: Мафия - ${mafia}; 
Дон - ${nameFormat(game.roles.godfather)}; 
Шериф - ${nameFormat(game.roles.sheriff)}`)
    }

    async pmp (target, context, msg, _self) {
        const data = await polemica.getUserData(this.#user_id)
        await this.#client.say(target, `У стримера ${data.pmp} балловв`)
    }
}

module.exports = Polemica
