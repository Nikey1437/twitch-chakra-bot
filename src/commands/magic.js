const { pickRandomChatterExceptInitiator, toInt, chatters } = require('../utils')

let ponyMagicAvailable = true
let ponyNickname = null
let ponyTimeout = null

class Magic {
    #client

    #magics

    register (client, handlers) {
        this.#client = client
        this.#magics = {
            pony_v_popone: this.pony_v_popone.bind(this),
            febfora: this.febfora.bind(this),
            prapzad: this.prapzad.bind(this),
            chakralounge: this.chakralounge.bind(this),
            hareman8: this.hareman8.bind(this),
            nikey1437: this.nikey1437.bind(this)
        }

        handlers['!magic'] = this.magic.bind(this)
        handlers['!магия'] = this.magic.bind(this)

        handlers['!лягнуть'] = this.pony_kick.bind(this)
        handlers['!разжаловать'] = this.unpony.bind(this)
        handlers['!пони'] = this.pony.bind(this)
    }

    async magic (target, username, msg, data) {
        const handler = this.#magics[username]

        if (handler != null) {
            await handler(target, username, msg, data)
        } else {
            await this.#client.say(target, 'Магия вне Хогвартса запрещена! Хочешь стать волшебником? Читай в описании под стримом как!')
        }
    }

    async pony_v_popone (target, username, msg, data) {
        if (!ponyMagicAvailable) {
            return
        }
        const split = msg.split(' ')
        const targetName = split[1]

        if (targetName == null) {
            const ponyMovesList1 = ['горцует', 'гогочет', 'радостно скачет', 'кушает морковку']
            const selectedPonyMove1 = ponyMovesList1[Math.round(Math.random() * (ponyMovesList1.length - 1))]
            await this.#client.say(target, `${username} ${selectedPonyMove1}`)
            return
        }

        await this.#client.say(target, `${targetName} превращается в пони! Новоиспеченный пони может использовать !пони и !лягнуть`)

        ponyMagicAvailable = false
        ponyNickname = targetName
        if (ponyNickname.indexOf('@') > -1) {
            ponyNickname = ponyNickname.substring(1)
        }

        ponyTimeout = setTimeout(async () => {
            await this.#client.say(target, `${ponyNickname} больше не пони`)

            ponyMagicAvailable = true
            ponyNickname = ''
        }, 300000)
    }

    async pony_kick (target, username, msg, data) {
        if (!(username === 'pony_v_popone' || username === 'kpotko' || username === ponyNickname)) {
            return
        }

        const split = msg.split(' ')

        let kickTarget

        if (split.length !== 1) {
            kickTarget = split[1].toLowerCase()
        } else {
            const users = await chatters(target)
            kickTarget = pickRandomChatterExceptInitiator(users, username)
        }

        if (kickTarget == null) {
            return
        }

        const kickRoll = Math.round(Math.random() * 10)

        const isKnockdown = kickRoll >= 7

        const kickList = ['по жёпке', 'в лоб', 'в пузико']
        const kickListLength = kickList.length
        const kickNumber = Math.floor(Math.random() * kickListLength)

        await this.#client.say(target, `Пони лягает копытцем ${kickList[kickNumber]} ${kickTarget} ^_^`)
        if (isKnockdown) {
            await this.#client.say(target, `${kickTarget} падает в нокдаун`)
            await this.#client.timeout(target, kickTarget, 2, 'упал в нокдаун от удара копытцем пони ^_^')
        }
    }

    async unpony (target, username, msg, data) {
        if (!(username === 'pony_v_popone' || username === 'kpotko' || username === 'nikey1437')) {
            return
        }

        if (ponyNickname === '') {
            await this.#client.say(target, 'Некого разжаловать, дурик')
            return
        }

        await this.#client.say(target, `${ponyNickname} больше не пони`)
        ponyMagicAvailable = true
        ponyNickname = null
        clearTimeout(ponyTimeout)
    }

    async pony (target, username, msg, data) {
        if (username.toLowerCase() === ponyNickname.toLowerCase()) {
            const ponyMovesList = ['горцует', 'гогочет', 'радостно скачет', 'кушает морковку']

            const selectedPonyMove = ponyMovesList[Math.round(Math.random() * (ponyMovesList.length - 1))]

            await this.#client.say(target, `${username} ${selectedPonyMove}`)
        }
    }

    async febfora (target, username, msg, data) {
        const febforaMagicList = ['Здешние пески холодные, но когда ты здесь, каджиту становится теплее',
            'Жил без страха и умер без страха.',
            'Раньше меня тоже вела дорога приключений, а потом мне прострелили колено.',
            'Дай-ка угадаю: кто-то украл твой сладкий рулет?']
        const febforaMagicPhraseChoose = [Math.round(Math.random() * (febforaMagicList.length - 1))]

        const split = msg.split(' ')
        const targetCount = split[1]

        if (targetCount !== null) {
            const i = toInt(targetCount)
            await this.#client.say(target, febforaMagicList[(i - 1) % febforaMagicList.length])
        } else {
            await this.#client.say(target, febforaMagicPhraseChoose)
        }
    }

    async prapzad (target, username, msg, data) {
        const enemyType = Math.round(Math.random() * 3)

        let enemyName = ''
        let resultText

        switch (enemyType) {
            case 0:
                enemyName = 'бесов'
                break

            case 1:
                enemyName = 'феечек'
                break

            case 2:
                enemyName = 'черных драконов'
                break

            case 3:
                enemyName = 'клонов Кротко'
                break
            default:
        }

        const enemyCount = Math.round(Math.random() * 20)

        const resultChanse = Math.round(Math.random())
        if (resultChanse === 1) {
            resultText = 'ГО успешно пробито'
        } else {
            resultText = 'Пробитие не удалось BibleThump'
        }

        await this.#client.say(target, `${username} пытается пробить ГО на 117`)
        await this.#client.say(target, `${enemyCount} ${enemyName}`)
        await this.#client.say(target, `${resultText}`)
    }

    async nikey1437 (target, username, msg, data) {
        await this.#client.say(target, 'Распространяет любовь среди чата VirtualHug')
        const users = await chatters(target)

        for (let i = 0; i < 4; i += 1) {
            const randomChatter = pickRandomChatterExceptInitiator(users, username)
            const randomChatter2 = pickRandomChatterExceptInitiator(users, username)

            if (randomChatter && randomChatter2) {
                // eslint-disable-next-line no-await-in-loop
                await this.#client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`)
            }
        }
    }

    async chakralounge (target, username, msg, data) {
        const raceList = ['сосущих настроение вампиров', 'слепых Эльфов-снайперов', 'карликовых орков SMOrc ', 'двуглазых циклопов KEKW ', 'подвальных гоблинов-школьников ', 'злобных болотных хомяков ', 'элитных поней в попонах', 'энтов-пеньков', 'могучих драконов, но без прожига', 'пасисов-пососов', 'безумных зеленокожих дренеев', 'душных жаб с мечиком', 'занудных кроткообразных алкашей', 'оборотней-крыс', 'жрецов-атеистов', 'безрогих единорогов', 'теплолюбивых клыккаров-кочевников', 'призраков-однодневок', 'честных воров-сердцекрадов <3 ', ' грустных клоунов BibleThump  ', 'бездарных прогеров ', 'щейхов без средств к существованию ']
        await this.#client.say(target, 'Распределяет пользователей чата по расам!')
        const users = await chatters(target)
        for (let i = 0; i < 3; i += 1) {
            const randomChatter = pickRandomChatterExceptInitiator(users, username)
            const selectedRace = raceList[Math.round(Math.random() * (raceList.length - 1))]
            if (randomChatter) {
                // eslint-disable-next-line no-await-in-loop
                await this.#client.say(target, `@${randomChatter} присоединяется к расе ${selectedRace}`)
            }
        }
    }

    async hareman8 (target, username, msg, data) {
        await this.#client.say(target, 'Произносит самое секретное заклинание из всех существующих')
        await this.#client.say(target, 'Лера кидает фотографию ножек ему в лс')
    }

    async kitikyt (target, username, msg, data) {
        const split = msg.split(' ')
        const targetName = split[1]
        if (targetName == null) {
            await this.#client.say(target, `Госпожа ${username} наливает себе чай в кружечку и достаёт печеньки`)
        } else {
            await this.#client.say(target, `Госпожа ${username} приглашает ${targetName} на чаепитие, и разливает чаёчек в чашечки`)
        }
    }
}

module.exports = Magic
