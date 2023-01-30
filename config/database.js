import { Low } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
/* 
const authConfigFile = join(__dirname, 'auth_config.json')
const authConfigAdapter = new JSONFile(authConfigFile)
const authConfig = new Low(authConfigAdapter)

 */



await db.read()

console.log(`the database is providing ${db.data}`)
/* await authConfig.read()
console.log(`the authConfig is providing ${authConfig.data}`) */


await db.write()
/* await authConfig.write() 
export default {
  db,
  authConfig
} */

export default db


