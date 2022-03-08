const axios = require('axios')

async function chatters (channelName) {
    if (channelName.startsWith('#')) {
        channelName = channelName.substring(1)
    }
    const { data } = await axios.get(`https://tmi.twitch.tv/group/user/${channelName}/chatters`)

    const broadcastersList = data.chatters.broadcaster
    const vipsList = data.chatters.vips
    const { moderators } = data.chatters
    const { staff } = data.chatters
    const { admins } = data.chatters
    const globalMods = data.chatters.global_mods
    const { viewers } = data.chatters

    return broadcastersList
        .concat(vipsList)
        .concat(moderators)
        .concat(staff)
        .concat(admins)
        .concat(globalMods)
        .concat(viewers)
}

function pickRandomChatterExceptInitiator (chattersList, initiator) {
    const filteredChatters = chattersList.filter((e) => (e !== initiator))

    if (filteredChatters.length > 0) {
        return filteredChatters[Math.floor(Math.random() * filteredChatters.length)]
    }
    return null

}

function toInt (value) {
    const x = parseInt(value, 10)
    return Number.isNaN(x) ? 1 : x
}

function splitOnce (str, delim) {
    const start = str.split(delim, 1);
    if (start.length === 0) {
        return ["", ""]
    }

    return [start[0], str.substr(start[0].length + 1)]
}

module.exports = {
    splitOnce,
    chatters,
    pickRandomChatterExceptInitiator,
    toInt
}
