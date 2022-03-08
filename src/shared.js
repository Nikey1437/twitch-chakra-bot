const { StaticAuthProvider } = require('@twurple/auth')
const { ChatClient } = require('@twurple/chat')
const { ApiClient } = require('@twurple/api')
const { Database } = require('./database')

function getTargetFromChannelName (channelName) {
    return `#${channelName}`
}

function clearChannelName (channelName) {
    if (channelName.startsWith('#')) {
        return channelName.substring(1)
    }
    return channelName
}

const clientId = process.env.CLIENT_ID
const accessToken = process.env.BOT_TOKEN

const authProvider = new StaticAuthProvider(clientId, accessToken)

const botName = process.env.BOT_NAME
const channelName = clearChannelName(process.env.CHANNEL)
const target = getTargetFromChannelName(channelName)
const client = new ChatClient({ authProvider, channels: [process.env.CHANNEL] })
const api = new ApiClient({ authProvider })
const database = new Database(process.env.DATABASE_URL)

module.exports = {
    client,
    api,
    target,
    channelName,
    botName,
    bot: null,
    dopHours: 0,
    database
}
