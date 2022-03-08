class SubGreeter {
    #client

    register (client) {
        this.#client = client
        client.onResub(this.onResubHandler.bind(this))
        client.onSub(this.onSubHandler.bind(this))
    }


    async onSubHandler (target, username) {
        await this.#client.say(target, `На льдине пополнение! Приветствуем нового моржика - ${username}!`)
    }

    async onResubHandler (target, username, subInfo, _nsg) {
        await this.#client.say(target, `Моржик ${username} пережил еще один месяц в антарктиде! Поздравляем! Это уже его ${subInfo.months} месяц на льдине!`)
    }
}

module.exports = SubGreeter