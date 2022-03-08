const Dirty = require('./commands/dirty')
const Players = require('./commands/players')
const Note = require('./commands/note')
const Polemica = require('./commands/polemica')
const Named = require('./commands/named')
const Admin = require('./commands/admin')
const Magic = require('./commands/magic')
const Nonsleep = require('./commands/nonsleep')
const Shared = require('./shared')
const { discord, tg, yt, codenames, music, bunker, whodunit, streams } = require("./messages");

global.duelState = {
    isStarted: false,
    duelantNickname: '',
    duelTimer: null
}

function resetDuel () {
    global.duelState.isStarted = false
    global.duelState.duelantNickname = ''
    clearTimeout(global.duelState.duelTimer)
    global.duelState.duelTimer = null
}

/*

function getMessageAboutAd () {
    return 'Заходи на дискорд сервер наших крутых партнеров! Общение, совместный просмотр фильмов, и просто поиграть в игры https://discord.gg/s2TZM3Tt Ребята из HIPE ZONE ждут вас!'
}

function getRuletkaMessage () {
    return 'Когда суммарно наберется 300 RUB доната, стример крутит рулетку в которой имеется более 20 различных вариантов его действий во время игры.'
}

*/

class Commands {
    #client

    #handlers

    register (client) {
        this.#client = client
        this.#handlers = {};

        (new Dirty()).register(client, this.#handlers);
        (new Players()).register(client, this.#handlers);
        (new Note()).register(client, this.#handlers);
        (new Polemica(2535)).register(client, this.#handlers);
        (new Named()).register(client, this.#handlers);
        (new Admin()).register(client, this.#handlers);
        (new Magic()).register(client, this.#handlers);
        (new Nonsleep()).register(client, this.#handlers);

        this.#client.onMessage(this.onMessage.bind(this))
    }

    async onMessage (target, username, origMsg, data) {
        // Игнорим сообщения от самого бота (просто на всякий случай)
        if (username === Shared.botName && !process.env.UNSAFE_SELFMSG) {
            return
        }
        // Убираем пробелы спереди и сзади + приводим все в нижний регистр (для регистронезависимых команд)
        const msg = origMsg.trim()
        const commandName = msg.split(' ')[0]

        try {
            const handler = this.#handlers[commandName]
            if (handler != null) {
                await handler(target, username, origMsg, data)
                return
            }

            switch (commandName) {
                case '!hrew':
                case '!хрю':
                    if (username === 'staaasy') {
                        await this.#client.say(target, 'Сегодня стример Svin')
                    } else {
                        await this.#client.say(target, `Сегодня ${username} Svin`)
                    }
                    break

                case '!дно':
                    await this.#client.say(target, `/me определяет глубину погружения ${username} в болото...`)
                    let additionalString = ''
                    const bolotoDepth = Math.round(Math.random() * 150)

                    if (bolotoDepth < 10) {
                        additionalString = 'немного наступил в болото'
                    }
                    if (bolotoDepth >= 10 && bolotoDepth < 40) {
                        additionalString = 'почти не в болоте'
                    }
                    if (bolotoDepth >= 40 && bolotoDepth < 80) {
                        additionalString = 'придется менять плавки на сухие'
                    }
                    if (bolotoDepth >= 80 && bolotoDepth < 140) {
                        additionalString = 'ты уже по пояс в болоте, осторожно!'
                    }
                    if (bolotoDepth >= 140) {
                        additionalString = 'ты болотный житель!'
                    }
                    if (bolotoDepth === 0) {
                        await this.#client.say(target, 'Зачем ты нас обманываешь? Ты не в болоте!')
                    } else {
                        await this.#client.say(target, `Глубина погружения в болото ${bolotoDepth} см ${additionalString} Kappa`)
                    }
                    break

                case '!я':
                    const imList = [
                        'сырнич', 'мирнич', 'лука модрич', 'не стреляешь не договариваешься', 'колхозник', 'проверенный корнишон', 'мафло позорное', 'будешь стоять на коленях', 'идешь нахуй', 'добрыня шерифыч', 'котик я котик, я сыр ты сырочек', 'Ромчик']
                    const imListLength = imList.length
                    const imNumber = Math.floor(Math.random() * imListLength)
                    await this.#client.say(target, `${username} ты ${imList[imNumber]}`)
                    break

                case '!др':
                    const bDayList = [
                        'щастья тебе!', 'здоровья тебе!', 'много денек тебе!', 'не болеть тебе!', 'много зрилов тебе!', 'хороших друзей тебе!', 'любви тебе! <3']
                    const bDayListLength = bDayList.length
                    const bDayNumber = Math.floor(Math.random() * bDayListLength)
                    await this.#client.say(target, `@chakralounge  ${bDayList[bDayNumber]}`)
                    break

                case '!discord':
                case '!дискорд':
                    await this.#client.say(target, discord)
                    break

                case '!telegram':
                case '!телеграм':
                case '!телега':
                    await this.#client.say(target, tg)
                    break
                case '!ютуб':
                case '!ютюб':
                case '!youtube':
                case '!yt':
                    await this.#client.say(target, yt)
                    break
                case '!d4':
                    if (username === 'chakralounge') {
                        const d4 = Math.round((Math.random() * 3) + 1)
                        await this.#client.say(target, `В РОЛЛЕ НА 4 ВЫПАЛО ЧИСЛО ${d4}`)
                        return
                    }
                    break
                case '!d20':
                    if (username === 'chakralounge') {
                        const d20 = Math.round((Math.random() * 19) + 1)
                        await this.#client.say(target, `В РОЛЛЕ НА 20 ВЫПАЛО ЧИСЛО ${d20}`)
                        return
                    }
                    break
                case '!дуэль':
                case '!дуель':
                case '!duel':
                case '!драться':
                    console.log(username === 'kpotko')
                    console.log(global.duelState)
                    if (username === 'kpotko') {
                        console.log('entered to kpotko duel')
                        if (global.duelState.isStarted) {
                            console.log('duel is started')
                            await this.#client.say(target, 'Дуэль уже объявлена! Ожидаем решение оппонента!')
                        } else {
                            console.log('duel is not started')
                            const duelSplittedCommand = msg.split(' ')
                            let duelTarget = duelSplittedCommand[1]

                            if (duelTarget.indexOf('@') > -1) {
                                duelTarget = duelTarget.substring(1)
                            }

                            await this.#client.say(target, `${duelTarget}, Вам бросили вызов на дуэль! Для того, чтобы принять вызов напишите !принять, или !отказаться чтобы трусливо сбежать с поля боя`)
                            global.duelState.isStarted = true
                            global.duelState.duelantNickname = duelTarget.toLowerCase()

                            global.duelState.duelTimer = setTimeout(async () => {
                                global.duelState.isStarted = false
                                global.duelState.duelantNickname = ''
                                // noinspection JSPotentiallyInvalidUsageOfClassThis
                                await this.#client.say(target, `${global.duelState.duelantNickname} проигнорировал вызов на дуэль!`)
                            }, 120000)
                        }
                    } else {
                        await this.#client.say(target, 'Вы не болотный дуэлянт!')
                    }
                    break

                case '!принять':
                    console.log(username)
                    console.log(global.duelState.duelantNickname)
                    if (username.toLowerCase() === global.duelState.duelantNickname.toLowerCase()) {
                        const duelVariants = [`Победил ${username}, сегодня ему повезло чуть больше`,
                            'Победил kpotko! Наш лучший болотный боец!',
                            'Оба бойца падают замертво. Как жаль, что никому из них не удалось победить',
                            'Бойцы наносят друг другу удары (надувными молотками), но никому из них не удаётсяч одолеть друг друга! Похоже, сегодня победила дружба!']

                        const duelResult = duelVariants[Math.round(Math.random() * (duelVariants.length - 1))]
                        await this.#client.say(target, `${duelResult}`)
                        resetDuel()
                    }
                    break

                case '!отказаться':
                    if (username.toLowerCase() === global.duelState.duelantNickname.toLowerCase()) {
                        await this.#client.say(target, `${username} испугался и трусливо сбегает с поля боя!`)
                        resetDuel()
                    }
                    break
                /* case "!паста":
                         const pastaList = [
                      "В чат ворвались люди в рыжих париках и с красными носами, на одноколесных велосипедах. :clown: Будьте осторожны - CLOWN SQUAD не щадит никого: ни женщин, ни детей, ни Модель.",
                      ":clown: CLOUWN SQUAD IN MAFPROFi :clown: CharkaHookaN AKA Morj :clown: Lijo AKA SHOT IN THE MOTHER :clown: WhoLikeShadow AKA BEST CLOWN IN THE CITY :clown: Ешь Ягоды :clown: F1L1STER :clown: Senpai :clown: hirurg :clown: Memolog :clown: Azmatur :clown: Judie :clown: CLOUWNS ASSEMBLE :clown:",
                      ":clown: Зачем вступать в коровью лепешку, если можно вступить CLOWN SQUAD ? :clown: JOIN CLOWN SQUAD :clown:",
                      "ЖИТЬ И ЖИТЬ КЛОУНОМ :clown: JOIN CLOWN SQUAD",
                      ":clown: Кто не с нами тот под нами, победа за Клоунами :clown: JOIN CLOWN SQUAD :clown:"
                      ];
                      const pastaListLength = pastaList.length;
                      const pastaNumber = Math.floor(Math.random() * pastaListLength);
                      client.say(target, pastaList[pastaNumber]);
                    break;
                */
                case '!клоун':
                    if (username === 'nikey1437') {
                        await this.#client.say(target, `${username} вы всегда душный клоун!`)
                        return
                    }

                    const variants = ['токсичный', 'грязный', 'умный', 'моржовый', 'чилловый', 'суперзлодей', 'сердцеед', 'не смешной', 'шерифский']

                    const randomVariant = variants[Math.round(Math.random() * (variants.length - 1))]

                    await this.#client.say(target, `${username} сегодня ты ${randomVariant} клоун!`)
                    break

                case '!пакет':
                    if (username === 'azmatur') {
                        await this.#client.say(target, `${username} , идете нахуй вы, а не пакет`)
                        return
                    }
                    if (username === 'paketgod') {
                        await this.#client.say(target, 'Нахуй идут все, кроме пакета!')
                        return
                    }
                    if (username === 'kitikyt') {
                        await this.#client.say(target, `${username} , Вы девочка-кисонька <3 CorgiDerp <3 `)
                        return
                    }

                    const variantsP = ['Иии... Пакет не идет нахуй', 'Пакет никуда не идет, а ты идешь на хуй', 'Пакет, иди нахуй']

                    const randomVariantP = variantsP[Math.round(Math.random() * (variantsP.length - 1))]

                    await this.#client.say(target, ` ${randomVariantP} `)
                    break

                case '!аукцион':
                case '!аук':
                case '!auction':
                    await this.#client.say(target, 'Теперь любая поддержка от 25 руб может идти в зачет одной из игр по вашему выбору. Какая игра наберет большую сумму до окончания аукциона, ту стример и будет  проходить у себя на канале.')
                    break

                case '!инфо':
                    await this.#client.say(target, '!грязюка, !аукцион, !магия, !я, !пакет, !клоун, !ласт, !дискорд')
                    break

                case '!турнир':
                    await this.#client.say(target, codenames)
                    break

                case '!музыка':
                case '!заказтрека':
                case '!трек':
                case '!музон':
                    await this.#client.say(target, music)
                    break
                case '!бункер':
                case '!bunker':
                    await this.#client.say(target, bunker)
                    break
                case '!Whodunit':
                case '!худанит':
                    await this.#client.say(target, whodunit)
                    break
                case '!стрим':
                case '!расписание':
                    await this.#client.say(target, streams)
                    break

                /*
                    case "!dnd":
                    case "!днд":
                        client.say(target, "D&D или Подземелья и Драконы – это настольная RPG игра, которая окунет вас в мир фэнтази и удивительных приключений. В этом мире, лишь тебе решать кем ты хочешь быть. Орк-маг, эльф-следопыт, человек-плут и много других персонажей и возможностей ждет тебя в удивительном мире Dungeons & Dragons. 5,7,12 и 14 июня тебя ждут захватывающие приключения, эпические битвы, коварные заговоры и бесконечные путешествия! Нажми сердечко, чтоб не пропустить следующий стрим🧡");
                    break;

                    case "!игроки":
                        client.say(target, "!иорвит эльф-краснолюд https://www.twitch.tv/makar_leo");
                        client.say(target, "!аргумерт  инфернал    https://www.twitch.tv/aliot_ei3");
                        client.say(target, "!пим  лесной эльф    https://www.twitch.tv/pimonyasha");
                        client.say(target, "!моржевиль человек   https://www.twitch.tv/chakralounge");
                    break;

                    case "!иорвит":
                        client.say(target, "https://drive.google.com/file/d/1aBiQX0xnD1zPDKkyMNy6J8ozbjkR5kKY/view?usp=sharing");
                    break;

                    case "!аргумерт":
                        client.say(target, "https://drive.google.com/file/d/16A__uP7YEY-TtedqNzVoSH36o_VDlQin/view?usp=sharing");
                    break;

                    case "!моржевиль":
                        client.say(target, "https://drive.google.com/file/d/14jPI1my7pvmfIML4jH4Hl-4KQuKX-fut/view?usp=sharing");
                    break;

                    case "!пим":
                        client.say(target, "https://drive.google.com/file/d/1CU0f_nzmbi-16RpdW1Fo1aoQpGNIaL-K/view?usp=sharing");
                    break;

                    case "!бонусы":
                        client.say(target, "Каждый из вас может повлиять на путешествие авантюристов, запустив рулетку бонусов. Что для этого нужно: Задонанить на сумму от 100руб по ссылке https://www.donationalerts.com/r/mafiaguild и указать имя игрока для запуска рулетки с бонусом. Самое важное, что вы можете и отменить последний бонус! Для отмены бонуса вам нужно, задонанить 300руб и указать имя игрока, у которого вы хотите отменить последний бонус. Список бонусов !обычные !необычные !редкие !легендарные !эпические !артефактные");
                    break;

                    case "!обычные":
                        client.say(target, "1. +5 медных монет, 2. +10 стрел/болтов, 3. +3 отмычки, 4. Сухой паёк, 5. Факел 6. -5 медных монет, 7. Несварение желудка, 8. -1 к КБ на 1 день, 9. Пинта эля, 10. Сглаз на час");
                    break;

                    case "!необычные":
                        client.say(target,"11. +5 серебряных монет, 12. Благословение +1ХП, 13. Верёвка, 14. Простуда, 15.+1 зелье невидимости, 16. -1 к основной характеристике на 1 день, 17. Толкнуть своего сопартийца, 18. Божья кара -1ХП, 19. Убрать бонус мастерства на 2 часа");
                    break;

                    case "!редкие":
                        client.say(target,"0. +1 к КБ на 1 день, 21. +5 электрумовая монета, 22. +5 к инициативе на 1 день, 23. Шкатулка сокровищ, 24. +1 зелье исцеления, 25. Эффект усталости");

                    break;

                    case "!легендарные":
                        client.say(target,"28.+10 к КБ на 1 день, 29. Усиление характеристики");

                    break;

                    case "!эпические":
                        client.say(target,"26. +5 золотых монет, 27. +3 платиновые монеты");

                    break;

                    case "!артефактные":
                        client.say(target,"30. Случайный артефакт, 31. Новый талант");

                    break;

                    case "!команды_dnd":
                    case "!команды_днд":
                        client.say(target,"!dnd !игроки !бонусы !обычные !необычные !редкие !легендарные !эпические !артефактные !штрафы");

                    break;

                    case "!штрафы":
                        client.say(target,"Путешествие проходит как по маслу? Проводят легкие бои? Или же накопили слишком много денег? Повлияй на ход истории! Для этого нужно задонатить на сумму от 300 руб и указать в донате ШТРАФЫ, и в любой момент игры группе путешественников придаться не сладко! Более подробно узнать о штрафа - !списокштрафов");

                    break;

                    case "!списокштрафов":
                        client.say(target,"1. критический неуспех (на первые d4-6 бросков), 2. потеря части снаряжения (мгновенно), 3. изменение погоды (мгновенно), 4. внезапное нападение (мгновенно), 5. подкрепление (во время любого боя), 6. порча (мгновенно), 7. скрытая напасть (во время любого боя), 8. разделение отряда (в любой момент), 9. блокировка заклинаний/умений (в ближайшем бою)");

                    break;
                */
                default:
            }
        } catch (e) {
            const info = (typeof e === 'string' || e instanceof String) ? e : e.stack
            const errorMsg = `Command ${msg} failed:\n${info}`
            if (Shared.bot != null) {
                await Shared.bot.sendMessage(-709829228, errorMsg)
            }
            console.error(errorMsg)
        }
    }
}

module.exports = Commands
