const axios = require('axios')

async function getLastGame (userId, days) {
    const resp = await axios.get(`https://polemicagame.com/cabinet/get?userId=${userId}&days=${days}&offset=0&limit=1`)
    const gameInfo = resp.data.rows[0]

    const lastGameId = gameInfo.id
    const lastGameRole = gameInfo.role.title
    const lastGameResult = gameInfo.result.title
    const gameStatHtml = await axios.get(`https://polemicagame.com/game-statistics/${lastGameId}`)

    const regex = /game-data='([\s\S]+?)'/

    const { players } = JSON.parse(regex.exec(gameStatHtml.data)[1])

    const roles = {
        godfather: { position: '', nickname: '' },
        mafia: [],
        sheriff: { position: '', nickname: '' }
    }
    players.forEach(({ role, tablePosition, username }) => {
        if (role.type === 'mafia') {
            roles.mafia.push({ position: tablePosition, nickname: username })
        } else if (role.type === 'godfather') {
            roles.godfather.position = tablePosition
            roles.godfather.nickname = username
        } else if (role.type === 'sheriff') {
            roles.sheriff.position = tablePosition
            roles.sheriff.nickname = username
        }
    })

    return {
        result: lastGameResult,
        role: lastGameRole,
        id: lastGameId,
        roles
    }
}

async function getUserData (userId) {
    const resp = await axios.get(`https://polemicagame.com/cabinet/${userId}`)
    const regex = /profile-user='([\s\S]+?)'/

    return JSON.parse(regex.exec(resp.data)[1])
}

module.exports = {
    getUserData,
    getLastGame
}
