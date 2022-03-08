const TelegramBot = require('node-telegram-bot-api')
const Greeter = require('./src/greeter')
const SubGreeter = require('./src/sub_greeter')
const Commands = require('./src/commands')
const Shared = require('./src/shared')
const Points = require('./src/points')
const MsgLoop = require('./src/msg_loop')
const { magic, hours, discord, yt, tg } = require("./src/messages");


if (process.env.TELEGRAM_TOKEN != null && process.env.TELEGRAM_CHAT_ID != null) {
    Shared.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })

    Shared.bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `Bot ${process.env.CHANNEL} started`).then()

    process.on('uncaughtException', async error => {
        await Shared.bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `Fatal error: ${error.stack}`)
        process.exit(1)
    })
} else {
    console.error('Telegram monitoring disabled')
}

/*
function checkRuletkaPermission(username) {
    return (username === "kpotko" || username === "chakralounge" || username === "nikey1437");
}
 */



// Метод вызывается каждый раз, когда бот коннектится к чату
async function onConnectedHandler () {
    console.log('* Connected')
}

async function prepareClient (client) {
    client.onConnect(onConnectedHandler)

    await client.connect()
}


(new Greeter()).register(Shared.client);
(new SubGreeter()).register(Shared.client);
(new Commands()).register(Shared.client);
(new Points()).register(Shared.client, Shared.api);
(new MsgLoop([magic, hours, discord, yt, tg])).register(Shared.client, Shared.api)

prepareClient(Shared.client).then(r => {
});
