import fs from "fs"

// Config

const DB_SAVE_INTERVAL_SEC = 30

// State
let _db: any

function getDb() {
  if (!_db) {
    try {
      const persisted = fs.readFileSync('db.json', 'utf8')
      _db = JSON.parse(persisted)
      console.log('loaded db.json')
    }
    catch (err) {
      console.log('err reading db.json')
      console.log(err)
      _db = {}
      saveDb()
    }
  }

  return _db
}

function saveDb() {
  console.log('writing to db.json')
  fs.writeFileSync('db.json',
                   JSON.stringify(getDb()),
                   'utf-8')
  console.log('writing done to db.json')
}

function enableDbSyncToDisk() {
  setInterval(saveDb, DB_SAVE_INTERVAL_SEC * 1000)
}


enableDbSyncToDisk()

getDb()

export { getDb }