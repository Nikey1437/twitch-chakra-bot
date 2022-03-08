const privilegedUsers = new Set([
    'chakralounge',
    'nikey1437',
    'indaster',
    'pony_v_popone',
    'kitikyt',
    'puuuuhhhh',
    'vunria'
])

const bezdarUsers = new Set([
    'yasheritza_',
    'ang3lpolemica'
])

function checked (users, handler) {
    return async (target, username, msg, data) => {
        if (users.has(username)) {
            await handler(target, username, msg, data)
        }
    }
}

function checkedOrMod (users, handler) {
    return async (target, username, msg, data) => {
        if (users.has(username) || data.userInfo.isMod === true) {
            await handler(target, username, msg, data)
        }
    }
}

module.exports = {
    privilegedUsers,
    bezdarUsers,
    checked,
    checkedOrMod
}
