import { Low } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()
console.log(`the database is providing ${db.data}`)

// if (db.data === null) {
//   // vi använder namnet som id i det här exemplet
//   db.data = [


//   ]
await db.write()
// }

/*  await db.data.set('user.name', 'typicode').write()
// Set some defaults (required if your JSON file is empty)
db.data ||= { users: [] }
db.data ||= { messages: [] }

Write
await db.write() 
// Read
console.log(db.data.users)
console.log(db.data.messages) */

export default db
// Path: config/database.js
// Compare this snippet from src/server.js:
