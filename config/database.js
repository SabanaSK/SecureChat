import { Low } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbFile = join(__dirname, 'db.json')
const authConfigFile = join(__dirname, 'auth_config.json')

const dbAdapter = new JSONFile(dbFile)
const authConfigAdapter = new JSONFile(authConfigFile)

const db = new Low(dbAdapter)
const authConfig = new Low(authConfigAdapter)




await db.read()
await authConfig.read()
console.log(`the database is providing ${db.data}`)
console.log(`the authConfig is providing ${authConfig.data}`)


await db.write()
await authConfig.write()

export default {
  db,
  authConfig
}


