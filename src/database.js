const pgp = require('pg-promise')(/* options */)

class Database {
    #db

    constructor (databaseUrl) {
        this.#db = pgp(databaseUrl)
    }

    async incPoints (username, count) {
        await this.#db.none(`INSERT INTO "public"."points" ("username", "points") 
VALUES ($1, $2)
ON CONFLICT ("username") DO UPDATE 
  SET points = points.points + EXCLUDED.points;`,
            [username, count])
    }

    async decPoints (username, count) {
        const result = await this.#db.result(`UPDATE "public"."points" 
SET points = points - $2
WHERE username = $1 AND points >= $2;`,
            [username, count])
        return result.rowCount === 1
    }
}

module.exports = { Database }
